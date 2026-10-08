import type { Project } from '../data/portfolio'
import { ArrowUpRight } from 'lucide-react'
import { Modal } from './Modal'

export function ProjectOverview({ project, onClose }: { project: Project; onClose: () => void }) {
  return <Modal title={project.name} onClose={onClose}>
    <p className="project-summary">{project.summary}</p>
    {!project.hideOverviewSubtitle && <p className="modal-subtitle">{project.category} · {project.role}</p>}
    <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <div className="case-body">
      <div><h3>{project.overviewLabels?.problem ?? '用户与问题'}</h3><p>{project.problem}</p></div>
      <div><h3>我的工作</h3><p>{project.solution}</p></div>
      {project.focus && <div><h3>{project.overviewLabels?.focus ?? '关键关注'}</h3><p>{project.focus}</p></div>}
      {project.outcome && <div><h3>项目成果</h3><p>{project.outcome}</p></div>}
    </div>
    {project.url && <div className="project-overview-footer"><a className="project-visit-link" href={project.url} target="_blank" rel="noopener noreferrer">项目链接 <ArrowUpRight size={16} /></a></div>}
  </Modal>
}

