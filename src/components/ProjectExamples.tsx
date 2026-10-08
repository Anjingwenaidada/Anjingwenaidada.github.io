import { Play } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { Modal } from './Modal'

export function ProjectExamples({ project, onClose }: { project: Project; onClose: () => void }) {
  const examples = project.examples ?? []
  const process = project.exampleProcess

  return <Modal title={process?.title ?? `${project.name} · 项目示例`} eyebrow={process ? `${project.name} · C 端 AI 创作能力` : undefined} onClose={onClose} className="project-examples-modal">
    {process && <p className="example-case-intro">{process.intro}</p>}
    <div className="example-sections">
      <section className="example-section">
        {process && <h3>01 / 效果展示</h3>}
        {examples.length > 0 ? <div className="project-examples-grid">
          {examples.map(example => <figure className="project-example" key={example.src}>
            <video controls playsInline preload="metadata" src={example.src} poster={example.poster} aria-label={example.title} />
            <figcaption>{example.title}</figcaption>
          </figure>)}
        </div> : <div className="project-examples-empty"><Play size={30} aria-hidden="true" /><p>视频示例即将更新。</p></div>}
      </section>
      {process && <>
      <section className="example-section">
        <h3>02 / C 端用户创作流程</h3>
        <ol className="example-steps">{process.steps.map((step, index) => <li key={step.title}>
          <span className="example-step-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <div><h4>{step.title}</h4><p>{step.description}</p></div>
        </li>)}</ol>
      </section>
      <section className="example-section">
        <h3>03 / 风格模板设计</h3>
        <p>{process.templateDescription}</p>
        <figure className="example-style-reference">
          <img src={process.reference} alt="动漫风格素材：角色正面、侧面与背面三视图" />
          <figcaption>风格素材 · 角色三视图</figcaption>
        </figure>
      </section>
      <section className="example-section">
        <h3>04 / AI 生成策略</h3>
        <p>{process.generationStrategy}</p>
      </section>
      <section className="example-section">
        <h3>05 / 我的产品工作</h3>
        <p>{process.productWork}</p>
      </section>
      </>}
    </div>
  </Modal>
}
