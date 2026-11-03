"use client";

import { useEffect, useMemo, useState } from "react";
import {
  creationTypes,
  works as initialWorks,
  workStatuses,
  workTypes,
  type Work,
} from "./data/works";

type MyWorksProps = {
  onContinueEdit: (work?: Work, creationType?: string) => void;
  onPlaceDesktop: (work: Work) => void;
  onPublishToMarket?: (work: Work) => void;
  notify: (message: string) => void;
};

export default function MyWorks({ onContinueEdit, onPlaceDesktop, onPublishToMarket, notify }: MyWorksProps) {
  const [workList, setWorkList] = useState(initialWorks);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<(typeof workTypes)[number]>("全部");
  const [status, setStatus] = useState<(typeof workStatuses)[number]>("全部作品");
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [menuWorkId, setMenuWorkId] = useState<number | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [shareWork, setShareWork] = useState<Work | null>(null);
  const [renameWork, setRenameWork] = useState<Work | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const visibleWorks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");
    return workList.filter((work) => {
      const matchesQuery = !normalizedQuery || work.name.toLocaleLowerCase("zh-CN").includes(normalizedQuery);
      const matchesType = type === "全部" || work.type === type;
      const matchesStatus = status === "全部作品" || work.status === status;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [query, status, type, workList]);

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setSelectedWork(null);
      setCreateOpen(false);
      setShareWork(null);
      setRenameWork(null);
      setMenuWorkId(null);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, []);

  const openRename = (work: Work) => {
    setRenameWork(work);
    setRenameValue(work.name);
    setMenuWorkId(null);
  };

  const confirmRename = () => {
    if (!renameWork || !renameValue.trim()) return;
    setWorkList((current) => current.map((work) => work.id === renameWork.id ? { ...work, name: renameValue.trim() } : work));
    notify(`作品已重命名为「${renameValue.trim()}」`);
    setRenameWork(null);
  };

  const duplicateWork = (work: Work) => {
    const copy: Work = {
      ...work,
      id: Math.max(...workList.map((item) => item.id), 0) + 1,
      name: `${work.name} 副本`,
      status: "制作中",
      createTime: "2026-08-04",
    };
    setWorkList((current) => [copy, ...current]);
    setMenuWorkId(null);
    notify(`已复制「${work.name}」`);
  };

  const deleteWork = (work: Work) => {
    setWorkList((current) => current.filter((item) => item.id !== work.id));
    setMenuWorkId(null);
    if (selectedWork?.id === work.id) setSelectedWork(null);
    notify(`已删除「${work.name}」`);
  };

  const openShare = (work: Work) => {
    setSelectedWork(null);
    setMenuWorkId(null);
    setShareWork(work);
  };

  return (
    <section className="works-library-view" aria-labelledby="works-library-title" onClick={() => setMenuWorkId(null)}>
      <header className="works-library-header works-paper-card paper-panel">
        <div>
          <h1 id="works-library-title">我的作品</h1>
          <p>收藏自己创造的小物，让作品陪伴生活。</p>
        </div>
        <div className="works-library-tools">
          <label className="works-library-search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索作品名称" aria-label="搜索作品名称" />
          </label>
          <button className="primary-button works-create-button" onClick={() => setCreateOpen(true)}>＋ 创建作品</button>
        </div>
      </header>

      <section className="works-library-content works-paper-card paper-panel">
        <div className="works-filter-group">
          <strong>作品类型</strong>
          <div className="works-filter-row" aria-label="作品类型筛选">
            {workTypes.map((item) => (
              <button key={item} className={type === item ? "active" : ""} onClick={() => setType(item)}>{item}</button>
            ))}
          </div>
        </div>
        <div className="works-filter-group">
          <strong>作品状态</strong>
          <div className="works-filter-row" aria-label="作品状态筛选">
            {workStatuses.map((item) => (
              <button key={item} className={status === item ? "active" : ""} onClick={() => setStatus(item)}>{item}</button>
            ))}
          </div>
        </div>

        <div className="works-library-summary">
          <span>共 {visibleWorks.length} 件作品</span>
          <span>{type === "全部" ? "全部类型" : type} · {status}</span>
        </div>

        {visibleWorks.length > 0 ? (
          <div className="works-library-grid">
            {visibleWorks.map((work) => (
              <article className="work-library-card works-paper-card" key={work.id} onClick={() => setSelectedWork(work)}>
                <span className={`work-status-badge status-${work.status}`}>{work.status}</span>
                <div className="work-more-wrap" onClick={(event) => event.stopPropagation()}>
                  <button className="work-more-button" aria-label={`${work.name}更多操作`} onClick={() => setMenuWorkId((current) => current === work.id ? null : work.id)}>•••</button>
                  {menuWorkId === work.id && (
                    <div className="work-more-menu works-paper-card">
                      <button onClick={() => openRename(work)}>重命名</button>
                      <button onClick={() => duplicateWork(work)}>复制作品</button>
                      <button className="danger" onClick={() => deleteWork(work)}>删除作品</button>
                    </div>
                  )}
                </div>
                <div className="work-preview-image"><img src={work.image} alt={work.name} /></div>
                <div className="work-card-copy">
                  <h2>{work.name}</h2>
                  <dl>
                    <div><dt>类型</dt><dd>{work.type}</dd></div>
                    <div><dt>素材数量</dt><dd>{work.materials.length} 个素材</dd></div>
                    <div><dt>创建时间</dt><dd>{work.createTime.replaceAll("-", ".")}</dd></div>
                  </dl>
                </div>
                <div className="work-hover-actions" onClick={(event) => event.stopPropagation()}>
                  <button className="primary-button" onClick={() => onContinueEdit(work)}>继续编辑</button>
                  <button className="secondary-button" onClick={() => onPlaceDesktop(work)}>放入桌面</button>
                  <button className="secondary-button" onClick={() => openShare(work)}>分享作品</button>
                  {onPublishToMarket && <button className="secondary-button" onClick={() => onPublishToMarket(work)}>发布到市集</button>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="works-library-empty">
            <span aria-hidden="true">✿</span>
            <h2>暂时没有找到这个作品</h2>
            <p>试试换一个关键词、类型或状态吧。</p>
            <button className="secondary-button" onClick={() => { setQuery(""); setType("全部"); setStatus("全部作品"); }}>查看全部作品</button>
          </div>
        )}
      </section>

      {selectedWork && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="work-detail-title" onClick={() => setSelectedWork(null)}>
          <div className="preview-stage work-detail-modal" onClick={(event) => event.stopPropagation()}>
            <button className="preview-close" onClick={() => setSelectedWork(null)} aria-label="关闭作品详情">×</button>
            <h2 id="work-detail-title">{selectedWork.name}</h2>
            <div className="work-detail-layout">
              <div className="work-detail-preview works-paper-card"><img src={selectedWork.image} alt={selectedWork.name} /></div>
              <div className="work-detail-copy">
                <span className={`work-status-badge status-${selectedWork.status}`}>{selectedWork.status}</span>
                <dl>
                  <div><dt>作品类型</dt><dd>{selectedWork.type}</dd></div>
                  <div><dt>创建时间</dt><dd>{selectedWork.createTime}</dd></div>
                  <div><dt>使用素材数量</dt><dd>{selectedWork.materials.length} 个</dd></div>
                </dl>
                <h3>使用的素材</h3>
                <div className="work-material-list">
                  {selectedWork.materials.map((material) => <span className="works-paper-card" key={material}>{material}</span>)}
                </div>
              </div>
            </div>
            <div className="work-detail-actions">
              <button className="primary-button" onClick={() => onContinueEdit(selectedWork)}>继续编辑</button>
              <button className="secondary-button" onClick={() => onPlaceDesktop(selectedWork)}>放入桌面</button>
              <button className="secondary-button" onClick={() => openShare(selectedWork)}>分享作品</button>
            </div>
          </div>
        </div>
      )}

      {createOpen && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="create-work-title" onClick={() => setCreateOpen(false)}>
          <div className="preview-stage create-work-modal" onClick={(event) => event.stopPropagation()}>
            <button className="preview-close" onClick={() => setCreateOpen(false)} aria-label="关闭创建作品弹窗">×</button>
            <span className="create-step">1　选择创作类型</span>
            <h2 id="create-work-title">今天想做什么？</h2>
            <p>选择一种手作类型，进入创作工坊开始制作。</p>
            <div className="create-work-grid">
              {creationTypes.map((item) => (
                <button className="works-paper-card" key={item.name} onClick={() => { setCreateOpen(false); onContinueEdit(undefined, item.name); }}>
                  <img src={item.image} alt="" /><strong>{item.name}</strong><small>开始创作</small>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {shareWork && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="share-work-title" onClick={() => setShareWork(null)}>
          <div className="preview-stage share-work-modal" onClick={(event) => event.stopPropagation()}>
            <button className="preview-close" onClick={() => setShareWork(null)} aria-label="关闭分享作品弹窗">×</button>
            <h2 id="share-work-title">作品分享卡片</h2>
            <div className="share-work-card works-paper-card">
              <span>与物 · 手作日记</span>
              <img src={shareWork.image} alt={shareWork.name} />
              <h3>{shareWork.name}</h3>
              <p>亲手造物，与物相伴。</p>
              <small>{shareWork.type} · {shareWork.createTime}</small>
            </div>
            <div className="share-work-actions">
              <button className="secondary-button" onClick={() => notify("分享链接已复制")}>复制分享链接</button>
              <button className="primary-button" onClick={() => { notify("作品分享卡片已保存"); setShareWork(null); }}>保存分享卡片</button>
            </div>
          </div>
        </div>
      )}

      {renameWork && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="rename-work-title" onClick={() => setRenameWork(null)}>
          <div className="preview-stage rename-work-modal" onClick={(event) => event.stopPropagation()}>
            <button className="preview-close" onClick={() => setRenameWork(null)} aria-label="关闭重命名弹窗">×</button>
            <h2 id="rename-work-title">重命名作品</h2>
            <label><span>作品名称</span><input autoFocus value={renameValue} onChange={(event) => setRenameValue(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") confirmRename(); }} /></label>
            <div><button className="secondary-button" onClick={() => setRenameWork(null)}>取消</button><button className="primary-button" onClick={confirmRename}>保存名称</button></div>
          </div>
        </div>
      )}
    </section>
  );
}
