import { ArrowUpRight } from 'lucide-react'
import { articles } from '../data/articles'
import { SectionHeading } from './SectionHeading'
import './Articles.css'

export function Articles() {
  return <section id="articles" className="section page-panel articles-section">
    <div className="container">
      <SectionHeading number="04" english="MY ARTICLES" title="我的文章" />
      <ol className="articles-list">
        {articles.map((article, index) => <li key={article.id}>
          <a className="article-row" href={article.url} target="_blank" rel="noopener noreferrer" aria-label={`阅读《${article.title}》原文（新窗口）`}>
            <span className="article-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <article className="article-copy">
              <h3>{article.title}</h3>
              <p className="article-summary">{article.summary}</p>
              <div className="article-tags">{article.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <div className="article-meta"><time dateTime={article.date}>{article.date.replaceAll('-', '.')}</time><span>来源：{article.source}</span><span>作者：{article.author}</span></div>
              <span className="article-read">阅读原文 <ArrowUpRight size={17} aria-hidden="true" /></span>
            </article>
          </a>
        </li>)}
      </ol>
    </div>
  </section>
}
