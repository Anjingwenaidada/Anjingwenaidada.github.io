import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Pause, Play, RotateCw } from 'lucide-react'
import { CoverParticles } from './CoverParticles'
import './cover.css'

export function Cover({ onVisibilityChange }: { onVisibilityChange: (visible: boolean) => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [pulseKey, setPulseKey] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let observer: IntersectionObserver
    const observe = () => {
      observer?.disconnect()
      const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 91
      // The existing navigation returns exactly when its reading area reaches the homepage.
      observer = new IntersectionObserver(([entry]) => onVisibilityChange(entry.isIntersecting), {
        rootMargin: `-${headerHeight + 1}px 0px 0px 0px`, threshold: 0,
      })
      observer.observe(section)
    }
    observe()
    window.addEventListener('resize', observe)
    return () => { observer.disconnect(); window.removeEventListener('resize', observe) }
  }, [onVisibilityChange])

  return <section ref={sectionRef} id="cover" className="entry-cover" aria-labelledby="cover-title">
    <CoverParticles pulseKey={pulseKey} paused={paused} />
    <div className="cover-shade" aria-hidden="true" />
    <div className="cover-header">
      <a className="cover-wordmark" href="#cover" aria-label="安静文，个人网站封面"><strong>AJ.</strong><span>安静文<small>PERSONAL PORTFOLIO</small></span></a>
    </div>
    <div className="cover-main">
      <div className="cover-copy">
        <h1 id="cover-title"><span className="cover-statement">懂创作流程</span><span className="cover-statement">也懂如何把 <em>AI</em> 做进流程</span></h1>
        <ul className="cover-lede" aria-label="个人背景标签"><li>3年AI产品经理</li><li>设计背景</li><li>AIGC内容深度创作者</li></ul>
        <div className="cover-actions">
          <a className="cover-primary" href="#about">进入我的主页 <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </div>
    <div className="cover-bottom">
      <span className="cover-edition">PORTFOLIO <span>/</span> 2026</span>
      <div className="cover-particle-tools">
        <button className="cover-particle-control" type="button" disabled={paused} onClick={() => setPulseKey(key => key + 1)} aria-label="拨动蓝色粒子"><RotateCw size={13} /><span>拨动粒子</span><span className="cover-control-dot" aria-hidden="true" /></button>
        <button className="cover-motion-toggle" type="button" aria-label={paused ? '播放粒子动画' : '暂停粒子动画'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={13} /> : <Pause size={13} />}</button>
      </div>
    </div>
  </section>
}
