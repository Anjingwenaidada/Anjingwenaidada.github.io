import { useState } from 'react'
import { ChevronUp, Layers3, Plus } from 'lucide-react'
import { strengths } from '../data/portfolio'
import './Strengths.css'

const cardDetails = [
  { tags: ['AI 图像', 'AI 视频', 'Vibe Coding'] },
  { tags: ['ComfyUI', 'RAG', 'Agent'] },
  { tags: ['数字营销', '创作工具', '影视 AI'] },
  { tags: ['测试集', 'Bad Case', '模型评测'] },
  { tags: ['产品设计', '交互体验', '视觉评测'] },
]

export function Strengths() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="strengths" className="section page-panel strengths-page" aria-labelledby="strengths-title">
      <div className="container">
        <div className="bio-strengths-block strengths-showcase">
          <div className="strengths-intro">
            <p className="strengths-eyebrow" lang="en">02 / STRENGTHS</p>
            <h2 id="strengths-title">个人<span>优势</span></h2>
            <p className="strengths-subtitle" lang="en">WHAT I BRING</p>
            <span className="strengths-rule" aria-hidden="true" />
            <p className="strengths-introduction">从产品设计到 AI 应用，<br />以创作者视角理解需求，<br />用产品方法推动落地。</p>
            <blockquote className="strengths-quote">
              <span aria-hidden="true">“</span>
              <p>最懂内容生产者痛点的AI产品经理</p>
            </blockquote>
            <p className="strengths-signature" lang="en">TURN AI IDEAS<br />INTO REAL IMPACT.</p>
            <div className="strengths-planet" aria-hidden="true" />
          </div>

          <div className="strengths-cards-column">
            <p className="strengths-caption" lang="en">AI × PRODUCT × DESIGN × IMPACT</p>
            <ol className="strengths-cards">
              {strengths.map((strength, index) => {
                const number = String(index + 1).padStart(2, '0')
                const isExpanded = expandedIndex === index
                const details = cardDetails[index]
                return (
                  <li className={`strength-card${isExpanded ? ' is-expanded' : ''}`} key={strength.title}>
                    <h4 className="strength-card-heading">
                      <button
                        className="strength-card-trigger"
                        type="button"
                        id={`strength-trigger-${number}`}
                        aria-expanded={isExpanded}
                        aria-controls={`strength-panel-${number}`}
                        aria-label={strength.title}
                        onClick={() => setExpandedIndex(current => current === index ? null : index)}
                      >
                        <span className="strength-card-number" aria-hidden="true"><span>{number}</span></span>
                        <span className="strength-card-copy">
                          <span className="strength-card-title">{strength.title}</span>
                        </span>
                        <span className="strength-card-tags" aria-hidden="true">
                          {details.tags.map(tag => <span key={tag}>{tag}</span>)}
                        </span>
                        <span className="strength-card-toggle" aria-hidden="true">
                          {isExpanded ? <ChevronUp size={17} /> : <Plus size={17} />}
                        </span>
                      </button>
                    </h4>
                    <div
                      className="strength-card-panel"
                      id={`strength-panel-${number}`}
                      role="region"
                      aria-labelledby={`strength-trigger-${number}`}
                      hidden={!isExpanded}
                    >
                      <p className="strength-card-detail">{strength.text}</p>
                      <div className="strength-card-art" aria-hidden="true">
                        <span className="strength-art-window strength-art-window--back" />
                        <span className="strength-art-window strength-art-window--middle" />
                        <span className="strength-art-window strength-art-window--front">
                          <span className="strength-art-toolbar"><i /><i /><i /></span>
                          <Layers3 size={28} strokeWidth={1.2} />
                          <span>Ideas<br />into Creation</span>
                        </span>
                        <span className="strength-art-orbit" />
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

