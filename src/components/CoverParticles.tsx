import { useEffect, useRef } from 'react'

type CoverParticlesProps = { pulseKey?: number; paused?: boolean }
type Pulse = { x: number; y: number; startedAt: number }

/** A procedural point-cloud ribbon. No image assets or rendering dependencies. */
export function CoverParticles({ pulseKey = 0, paused = false }: CoverParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pulseRef = useRef<(() => void) | null>(null)
  const pauseControlRef = useRef<((paused: boolean) => void) | null>(null)
  const pausedRef = useRef(paused)
  const previousPulseKey = useRef(pulseKey)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    if (!canvas || !context) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionPreference.matches
    let visible = true
    let disposed = false
    let width = 1
    let height = 1
    let time = 0
    let frame = 0
    let lastTime = 0
    let lastPaint = 0
    let pulse: Pulse | null = null
    let grid = new Float32Array(0)
    let atmosphere = new Float32Array(0)
    const pointer = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, strength: 0, active: false }
    const palette = ['#143867', '#1a4c91', '#2368bc', '#3489e8', '#66b4ff', '#a9d9ff', '#d5efff']
    const buckets: number[][] = palette.map(() => [])

    // Stable sample positions keep the mesh calm when the component rerenders.
    const randomFactory = (seed: number) => () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) | 0
      return (seed >>> 0) / 4294967296
    }

    const draw = () => {
      if (disposed) return
      context.clearRect(0, 0, width, height)

      const glow = context.createRadialGradient(width * 0.53, height * 0.32, 0, width * 0.53, height * 0.32, width * 0.62)
      glow.addColorStop(0, 'rgba(13, 46, 100, 0.19)')
      glow.addColorStop(0.55, 'rgba(5, 21, 47, 0.08)')
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      context.fillStyle = glow
      context.fillRect(0, 0, width, height)

      // A quiet depth field surrounds the ribbon without competing with the copy.
      for (let band = 0; band < 3; band++) {
        context.beginPath()
        for (let i = band * 4; i < atmosphere.length; i += 12) {
          const x = atmosphere[i] * width + Math.sin(time * 0.12 + atmosphere[i + 2] * 8) * 3
          const y = atmosphere[i + 1] * height
          const radius = atmosphere[i + 3]
          context.moveTo(x + radius, y)
          context.arc(x, y, radius, 0, Math.PI * 2)
        }
        context.fillStyle = ['rgba(47, 94, 156, 0.15)', 'rgba(81, 143, 218, 0.24)', 'rgba(134, 190, 249, 0.3)'][band]
        context.fill()
      }

      pointer.x += (pointer.targetX - pointer.x) * 0.075
      pointer.y += (pointer.targetY - pointer.y) * 0.075
      pointer.strength += ((pointer.active ? 1 : 0) - pointer.strength) * 0.055
      buckets.forEach(bucket => { bucket.length = 0 })

      const amplitude = Math.min(height * 0.158, width * 0.165)
      const sheetWidth = Math.min(height * 0.132, width * 0.12) * 1.22
      const centerY = height * (width < 600 ? 0.325 : 0.345)
      const influence = Math.min(width, height) * 0.235
      const pulseAge = pulse ? time - pulse.startedAt : 10
      const pulseRadius = pulseAge * Math.max(width, height) * 0.65
      const pulseStrength = pulse ? Math.max(0, 1 - pulseAge / 2.1) : 0
      if (pulse && pulseAge > 2.1) pulse = null

      for (let i = 0; i < grid.length; i += 4) {
        const u = grid[i]
        const v = grid[i + 1]
        const phase = u * 4.35 + time * 0.23
        const fold = Math.sin(u * 3.5 - time * 0.185) * 1.35 + 0.38
        const edge = Math.sqrt(Math.max(0, 1 - v * v))
        const depth = v * Math.sin(fold)
        const perspective = 1 + depth * 0.13
        let x = width * 0.5 + u * width * 0.485 * perspective + v * Math.sin(phase) * sheetWidth * 0.28
        let y = centerY + Math.sin(phase) * amplitude * 0.66
          + Math.sin(u * 7.1 - time * 0.15) * amplitude * 0.16
          + v * Math.cos(fold) * sheetWidth
          + Math.sin(v * 3.1 + u * 2.4 + time * 0.25) * sheetWidth * 0.16

        // Tiny, deterministic irregularities make the surface feel like particles,
        // rather than a wireframe with perfectly straight rows.
        x += grid[i + 2] * 1.3
        y += grid[i + 3] * 1.3
        let energy = 0

        if (pointer.strength > 0.01) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < influence) {
            const force = Math.pow(1 - distance / influence, 2) * pointer.strength
            const angle = Math.atan2(dy, dx)
            x += Math.cos(angle + 0.5) * force * 24
            y += Math.sin(angle + 0.5) * force * 24
            energy += force * 2.3
          }
        }

        if (pulse && pulseStrength > 0) {
          const dx = x - pulse.x
          const dy = y - pulse.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const ring = (distance - pulseRadius) / 70
          if (Math.abs(ring) < 3) {
            const force = Math.exp(-ring * ring) * pulseStrength
            const angle = Math.atan2(dy, dx)
            x += Math.cos(angle) * force * 27
            y += Math.sin(angle) * force * 27
            energy += force * 3
          }
        }

        const crest = Math.pow(Math.max(0, Math.cos(fold - v * 0.5)), 2)
        const light = 0.7 + edge * 1.5 + crest * 1.8 + (depth + 1) * 0.7 + energy
        const color = Math.max(0, Math.min(palette.length - 1, Math.floor(light + grid[i + 2] * 0.6)))
        const radius = ((width < 600 ? 0.54 : 0.62) + Math.max(0, depth) * 0.2 + edge * 0.18 + energy * 0.075) * 1.28
        buckets[color].push(x, y, radius)
      }

      for (let color = 0; color < buckets.length; color++) {
        const positions = buckets[color]
        context.beginPath()
        for (let i = 0; i < positions.length; i += 3) {
          context.moveTo(positions[i] + positions[i + 2], positions[i + 1])
          context.arc(positions[i], positions[i + 1], positions[i + 2], 0, Math.PI * 2)
        }
        context.fillStyle = palette[color]
        context.fill()
      }
    }

    const animate = (now: number) => {
      frame = 0
      if (disposed || !visible || document.hidden || reducedMotion || pausedRef.current) {
        lastTime = 0
        return
      }
      if (now - lastPaint >= 1000 / 30) {
        time += lastTime ? Math.min((now - lastTime) / 1000, 0.06) : 0
        lastTime = now
        lastPaint = now
        draw()
      }
      frame = requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frame && !disposed && visible && !document.hidden && !reducedMotion && !pausedRef.current) {
        lastTime = 0
        frame = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      lastTime = 0
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const mobile = width < 600
      const columns = mobile ? 142 : Math.min(218, Math.max(172, Math.round(width / 6.5)))
      const rows = mobile ? 34 : 48
      grid = new Float32Array(columns * rows * 4)
      const random = randomFactory(20726)
      let index = 0
      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          grid[index++] = column / (columns - 1) * 2.3 - 1.15
          grid[index++] = row / (rows - 1) * 2 - 1
          grid[index++] = random() * 2 - 1
          grid[index++] = random() * 2 - 1
        }
      }
      atmosphere = new Float32Array((mobile ? 390 : 1140) * 4)
      for (let i = 0; i < atmosphere.length; i += 4) {
        atmosphere[i] = random()
        atmosphere[i + 1] = random() * 0.67
        atmosphere[i + 2] = random()
        atmosphere[i + 3] = 0.3 + random() * 0.52
      }
      draw()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || pausedRef.current || !visible || event.pointerType === 'touch') return
      const bounds = canvas.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      pointer.active = x >= 0 && x <= width && y >= 0 && y <= height
      if (pointer.active) {
        pointer.targetX = x
        pointer.targetY = y
        // Place a newly entering pointer immediately; ease only subsequent motion.
        if (pointer.x < -500) { pointer.x = x; pointer.y = y }
      }
    }

    const onPointerLeave = () => { pointer.active = false }

    const onPointerDown = (event: PointerEvent) => {
      if (reducedMotion || pausedRef.current || !visible) return
      if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]')) return
      const bounds = canvas.getBoundingClientRect()
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      if (x < 0 || x > width || y < 0 || y > height) return
      pulse = { x, y, startedAt: time }
      start()
    }

    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }

    const onMotionChange = () => {
      reducedMotion = motionPreference.matches
      if (reducedMotion) { stop(); pointer.active = false; pointer.strength = 0; pulse = null; draw() }
      else start()
    }

    pulseRef.current = () => {
      if (reducedMotion || pausedRef.current) return
      pulse = { x: width * 0.5, y: height * 0.34, startedAt: time }
      start()
    }

    pauseControlRef.current = isPaused => {
      if (isPaused) {
        stop()
        pointer.active = false
        pointer.strength = 0
        pulse = null
      } else start()
    }

    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false
      if (visible) start()
      else { stop(); pointer.active = false }
    }, { threshold: 0 })

    resize()
    resizeObserver.observe(canvas)
    visibilityObserver.observe(canvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    window.addEventListener('blur', onPointerLeave)
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    document.addEventListener('visibilitychange', onVisibilityChange)
    motionPreference.addEventListener('change', onMotionChange)
    start()

    return () => {
      disposed = true
      stop()
      pulseRef.current = null
      pauseControlRef.current = null
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('blur', onPointerLeave)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      motionPreference.removeEventListener('change', onMotionChange)
    }
  }, [])

  useEffect(() => {
    pausedRef.current = paused
    pauseControlRef.current?.(paused)
  }, [paused])

  useEffect(() => {
    if (previousPulseKey.current !== pulseKey) pulseRef.current?.()
    previousPulseKey.current = pulseKey
  }, [pulseKey])

  return <canvas ref={canvasRef} className="cover-particles" aria-hidden="true" />
}
