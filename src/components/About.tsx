import { useState } from 'react'
import { ArrowUpRight, BookOpen, Check, GraduationCap, Mail, Phone } from 'lucide-react'
import { capabilityTags, profile, projects } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import { ProfilePortrait } from './ProfilePortrait'
import { ProjectOverview } from './ProjectOverview'
import './About.css'

export function About() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <section id="about" className="section page-panel about-resume">
      <div className="container">
        <SectionHeading number="01" english="A LITTLE ABOUT ME" title="个人介绍" />

        <div className="bio-layout">
          <aside className="bio-portrait-column">
            <ProfilePortrait />
          </aside>

          <div className="bio-content">
            <div className="bio-identity">
              <h3>{profile.name}</h3>
              <p><span>3年AI产品经理</span><span>产品设计背景</span><span>4+AI项目落地</span><span>聚焦AIGC内容生产领域</span><span>AIGC内容深度创作者</span></p>
            </div>

            <div className="bio-facts-grid">
              <div className="bio-facts-block">
                <h4>基本信息</h4>
                <dl className="bio-facts">
                  <div><dt><Phone size={15} aria-hidden="true" />电话</dt><dd><a href={`tel:${profile.phoneLink}`}>{profile.phone}</a></dd></div>
                  <div><dt><Mail size={15} aria-hidden="true" />邮箱</dt><dd><a href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
                </dl>
              </div>
              <div className="bio-facts-block">
                <h4>教育背景</h4>
                <dl className="bio-facts">
                  <div><dt><GraduationCap size={16} aria-hidden="true" />学校</dt><dd>{profile.school}<span className="bio-degree">（{profile.degree}）</span></dd></div>
                  <div><dt><BookOpen size={15} aria-hidden="true" />专业</dt><dd>{profile.major}</dd></div>
                </dl>
              </div>
            </div>

            <div className="bio-projects-block">
              <h4>代表项目</h4>
              <ul className="bio-projects">
                {projects.map(project => <li key={project.id}>
                  <button type="button" className={`bio-project-strip bio-project-${project.theme}${project.coverImage ? ' has-cover' : ''}`} data-selected={selectedProject?.id === project.id} onClick={() => setSelectedProject(project)} aria-haspopup="dialog" aria-label={`查看${project.name}项目摘要`}>
                    <span className="bio-project-art" aria-hidden="true">
                      {project.coverImage && <img src={project.coverImage} alt="" loading="lazy" />}
                    </span>
                    <span className="bio-project-copy"><span className="bio-project-category">{project.number} / {project.category}</span><span className="bio-project-name">{project.name}</span></span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </button>
                </li>)}
              </ul>
            </div>

            <div className="bio-capabilities">
              <h4>能力标签</h4>
              <ul className="bio-capability-tags" aria-label="能力标签">
                {capabilityTags.map(tag => <li key={tag}>
                  <button type="button" aria-pressed={selectedTag === tag} onClick={() => setSelectedTag(current => current === tag ? null : tag)}>
                    <span>{tag}</span><Check className="bio-tag-check" size={12} aria-hidden="true" />
                  </button>
                </li>)}
              </ul>
            </div>
          </div>
        </div>

        {selectedProject && <ProjectOverview project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </div>
    </section>
  )
}
