import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react'
import { projects } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import { ProjectOverview } from './ProjectOverview'
import { ProjectExamples } from './ProjectExamples'
import './Projects.css'

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [exampleProject, setExampleProject] = useState<Project | null>(null)
  return <section id="projects" className="section section-tinted page-panel"><div className="container">
    <SectionHeading number="03" english="SELECTED WORK" title="精选项目" />
    <div className="projects-grid">{projects.map(project => <article key={project.id} id={`project-${project.id}`} className={`project-card ${project.theme}`} aria-labelledby={`project-title-${project.id}`}>
      <div className="project-intro"><div className="project-title-row"><div className="project-title-group"><h3 id={`project-title-${project.id}`}>{project.name}</h3><span className="project-category">{project.category}</span></div><span className="project-index">{project.number}</span></div><p className="project-summary">{project.summary}</p></div>
      <div className={`project-cover${project.coverImage ? ' has-cover' : ''}`}>
        {project.coverImage && <div className="project-cover-art" aria-hidden="true"><img src={project.coverImage} alt="" loading="lazy" /></div>}
        <div className="cover-headline">{project.coverTitle}</div><div className="cover-flow">{project.flow.map((step, index) => <div key={step} className="flow-step"><span>{step}</span>{index < project.flow.length - 1 && <ArrowRight size={16} />}</div>)}</div><span className="cover-number">{project.number}</span>
      </div>
      <div className="project-content"><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-bottom"><span>{project.role}</span><div className="project-actions"><button type="button" className="project-overview-button" onClick={() => setSelected(project)} aria-label={`查看${project.name}项目介绍`}>项目介绍 <ArrowRight size={15} /></button>{project.examples && <button type="button" className="project-visit-link" onClick={() => setExampleProject(project)} aria-haspopup="dialog" aria-label={`查看${project.name}项目示例`}>项目示例 <Play size={16} /></button>}{project.url && <a className="project-visit-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}项目链接（新窗口）`}>项目链接 <ArrowUpRight size={16} /></a>}</div></div></div>
    </article>)}</div>
    {selected && <ProjectOverview project={selected} onClose={() => setSelected(null)} />}
    {exampleProject && <ProjectExamples project={exampleProject} onClose={() => setExampleProject(null)} />}
  </div></section>
}


