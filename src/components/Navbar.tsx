import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navigation } from '../data/portfolio'

export function Navbar({ coverVisible = false }: { coverVisible?: boolean }) {
  const [active, setActive] = useState('cover')
  const [open, setOpen] = useState(false)
  useEffect(() => {
    let observer: IntersectionObserver
    const observeSections = () => {
      observer?.disconnect()
      // Pixel margins keep the reading band below the header at every aspect ratio.
      // IntersectionObserver percentage margins are relative to the viewport width.
      const bandTop = Math.min(140, window.innerHeight * .3)
      const bottomMargin = Math.max(0, window.innerHeight - bandTop - 60)
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      }, { rootMargin: `-${bandTop}px 0px -${bottomMargin}px 0px`, threshold: 0 })
      navigation.forEach(item => { const el = document.getElementById(item.id); if (el) observer.observe(el) })
    }
    observeSections()
    window.addEventListener('resize', observeSections)
    return () => { observer.disconnect(); window.removeEventListener('resize', observeSections) }
  }, [])
  return <header className={`site-header${coverVisible ? ' is-cover-hidden' : ''}`} inert={coverVisible} aria-hidden={coverVisible || undefined}><div className="nav-shell">
    <a className="wordmark" href="#cover" onClick={() => setOpen(false)} aria-label="安静文，返回首页"><span className="monogram">AJ.</span><span>安静文<span className="wordmark-sub">AI PRODUCT MANAGER</span></span></a>
    <button className="menu-toggle" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? '关闭导航' : '打开导航'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="main-navigation" aria-label="主导航" className={open ? 'navigation is-open' : 'navigation'}>{navigation.map((item) => <a key={item.id} href={`#${item.id}`} className={`${active === item.id ? 'active ' : ''}${item.id === 'contact' ? 'nav-contact' : ''}`} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}>{item.label}{item.id === 'contact' && <ArrowUpRight size={16} />}</a>)}</nav>
  </div></header>
}
