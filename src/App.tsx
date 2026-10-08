import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Copy, Download, Phone, ScanLine } from 'lucide-react'
import { Navbar } from './components/Navbar'
import { SectionHeading } from './components/SectionHeading'
import { Projects } from './components/Projects'
import { Modal } from './components/Modal'
import { profile } from './data/portfolio'
import { About } from './components/About'
import { Cover } from './components/Cover'
import { Strengths } from './components/Strengths'
import { Articles } from './components/Articles'

function Contact() {
  const [wechatOpen, setWechatOpen] = useState(false)
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null)
  const [copyMessage, setCopyMessage] = useState('')

  async function copyContact(kind: 'email' | 'phone') {
    try {
      await navigator.clipboard.writeText(kind === 'email' ? profile.email : profile.phoneLink)
      setCopied(kind)
      setCopyMessage(kind === 'email' ? '邮箱已复制' : '电话号码已复制')
    } catch {
      setCopied(null)
      setCopyMessage('复制未成功，请选中文字手动复制。')
    }
  }

  return <section id="contact" className="contact-section page-panel"><div className="container"><SectionHeading number="05" english="LET’S CONNECT" title="联系我" /><div className="contact-layout"><div><p>正在寻找 AI 产品经理机会，期待与你交流。</p><button type="button" className="contact-email" onClick={() => copyContact('email')} aria-label={`复制邮箱 ${profile.email}`} title="点击复制邮箱">{profile.email}{copied === 'email' ? <Check size={24} aria-hidden="true" /> : <Copy size={24} aria-hidden="true" />}</button><div className="contact-phone-row"><a className="contact-phone" href={`tel:${profile.phoneLink}`}><Phone size={17} aria-hidden="true" /><span>电话联系：{profile.phoneLink}</span></a><button type="button" className="contact-copy-button" onClick={() => copyContact('phone')} aria-label="复制电话号码">{copied === 'phone' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}{copied === 'phone' ? '已复制' : '复制'}</button></div><p className="contact-copy-status" role="status">{copyMessage}</p><div className="contact-actions"><button className="button button-secondary" onClick={() => setWechatOpen(true)}><ScanLine size={18} />微信联系</button><a className="text-link" href={profile.resume} download="安静文-AI产品经理-简历.pdf">下载简历 <Download size={16} /></a></div></div><button className="qr-card" onClick={() => setWechatOpen(true)} aria-label="放大安静文的微信二维码"><img src={profile.wechat} alt="微信二维码，点击放大" width="820" height="1212" loading="lazy" /><span>微信扫一扫，保持联系 <ArrowUpRight size={15} /></span></button></div><footer><span>© {new Date().getFullYear()} 安静文</span><span>AI PRODUCT MANAGER</span><a href="#cover">回到顶部 <ArrowRight size={15} /></a></footer></div>{wechatOpen && <Modal title="微信联系" className="wechat-modal" onClose={() => setWechatOpen(false)}><p className="modal-subtitle">使用微信扫描二维码，或保存图片后在微信中识别。</p><img className="wechat-image" src={profile.wechat} alt="安静文的微信二维码" /><a className="button button-secondary" href={profile.wechat} download="安静文-微信二维码.jpg">保存二维码 <Download size={16} /></a></Modal>}</section>
}

export default function App() {
  const [coverVisible, setCoverVisible] = useState(() => !window.location.hash || window.location.hash === '#cover')
  return <><a className="skip-link" href="#about">跳转到主要内容</a><Navbar coverVisible={coverVisible} /><main id="main"><Cover onVisibilityChange={setCoverVisible} /><About /><Strengths /><Projects /><Articles /><Contact /></main></>
}


