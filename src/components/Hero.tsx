import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../data/portfolio'
import './Hero.css'

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="intro" className="hero hero-editorial page-panel" aria-labelledby="hero-name">
      <div className="container hero-inner">
        <motion.div
          className="hero-copy"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <p className="hero-edition" lang="en">PERSONAL WEBSITE <span>/</span> 2026</p>
          <h1 id="hero-name" className="hero-name">
            <span className="hero-name-cn">安静文</span>
            <span className="hero-name-en" lang="en">AI PRODUCT MANAGE</span>
          </h1>
          <div className="hero-profession">
            <p>AI 产品经理 <span>&</span> 创意实践者</p>
            <span lang="en">AI PRODUCT MANAGER & CREATIVE THINKER</span>
          </div>
          <div className="hero-positioning">
            <h2 className="hero-description">深耕AIGC 内容生产全链路的产品经理</h2>
            <ul className="hero-profile-tags" aria-label="个人优势">
              <li>10年绘画经验</li>
              <li>产品设计出身</li>
              <li>AIGC内容深度创作者</li>
              <li>落地企业 Agent 应用</li>
            </ul>
          </div>
          <div className="hero-actions">
            <a className="hero-work-link" href="#projects">探索我的项目 <ArrowUpRight size={21} /></a>
            <a className="hero-resume-link" href={profile.resume} download="安静文-AI产品经理-简历.pdf">下载简历 <Download size={16} /></a>
          </div>
        </motion.div>

        <motion.div
          className="hero-portrait-stage"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.9 }}
        >
          <div className="hero-portrait-halo" aria-hidden="true" />
          <div className="hero-orbit" aria-hidden="true"><span /><span /></div>
          <div className="hero-portrait-light">
            <img className="hero-portrait" src={profile.heroPortrait} alt="安静文的职业肖像" width="1023" height="1537" fetchPriority="high" />
          </div>
          <span className="hero-image-caption" aria-hidden="true">PRODUCT / DESIGN / AI</span>
        </motion.div>
      </div>
    </section>
  )
}
