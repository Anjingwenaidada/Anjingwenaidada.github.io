"use client";

import { useEffect, useMemo, useState } from "react";
import {
  materialCategories,
  materialLibrary,
  materialSources,
  type LibraryMaterial,
  type MaterialSource,
} from "./data/material-library";

type MyMaterialsProps = {
  onAddToCraft: (material: LibraryMaterial) => void;
  notify: (message: string) => void;
};

export default function MyMaterials({ onAddToCraft, notify }: MyMaterialsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof materialCategories)[number]>("全部");
  const [source, setSource] = useState<MaterialSource | "全部来源">("全部来源");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<LibraryMaterial | null>(null);
  const [favoriteIds, setFavoriteIds] = useState(() => new Set(materialLibrary.filter((item) => item.favorite).map((item) => item.id)));

  const visibleMaterials = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");
    return materialLibrary.filter((item) => {
      const matchesQuery = !normalizedQuery || item.name.toLocaleLowerCase("zh-CN").includes(normalizedQuery);
      const matchesCategory = category === "全部" || item.category === category;
      const matchesSource = source === "全部来源" || item.source === source;
      return matchesQuery && matchesCategory && matchesSource;
    });
  }, [category, query, source]);

  useEffect(() => {
    if (!selectedMaterial) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedMaterial(null);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [selectedMaterial]);

  const toggleFavorite = (material: LibraryMaterial) => {
    setFavoriteIds((current) => {
      const next = new Set(current);
      if (next.has(material.id)) {
        next.delete(material.id);
        notify(`已取消收藏「${material.name}」`);
      } else {
        next.add(material.id);
        notify(`已收藏「${material.name}」`);
      }
      return next;
    });
  };

  return (
    <section className="materials-library-view" aria-labelledby="materials-library-title">
      <header className="materials-library-header paper-panel">
        <div>
          <h1 id="materials-library-title">我的素材</h1>
          <p>把喜欢、收藏和使用过的小物，收进属于你的素材匣。</p>
        </div>
        <div className="materials-library-tools">
          <label className="materials-library-search">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索素材名称" aria-label="搜索素材名称" />
          </label>
          <div className="materials-library-filter-wrap">
            <button className={`secondary-button materials-library-filter${filterOpen ? " active" : ""}`} onClick={() => setFilterOpen((open) => !open)} aria-expanded={filterOpen}>
              <span aria-hidden="true">⌁</span> 筛选
            </button>
            {filterOpen && (
              <div className="materials-library-filter-menu paper-panel" role="group" aria-label="按素材来源筛选">
                {["全部来源", ...materialSources].map((item) => (
                  <button key={item} className={source === item ? "selected" : ""} onClick={() => { setSource(item as MaterialSource | "全部来源"); setFilterOpen(false); }}>
                    <i aria-hidden="true" />{item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="materials-library-content paper-panel">
        <div className="materials-category-bar" aria-label="素材分类">
          {materialCategories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <div className="materials-library-summary">
          <span>共 {visibleMaterials.length} 件素材</span>
          <span>{source === "全部来源" ? "全部来源" : source}</span>
        </div>

        {visibleMaterials.length > 0 ? (
          <div className="materials-library-grid">
            {visibleMaterials.map((material) => {
              const favorite = favoriteIds.has(material.id);
              return (
                <article className="library-material-card" key={material.id}>
                  <button className="library-material-main" onClick={() => setSelectedMaterial(material)} aria-label={`查看${material.name}详情`}>
                    <span className="library-material-image"><img src={material.image} alt={material.name} /></span>
                    <span className="library-material-copy">
                      <strong>{material.name}</strong>
                      <small>{material.category}</small>
                    </span>
                  </button>
                  <button className={`library-favorite${favorite ? " active" : ""}`} onClick={() => toggleFavorite(material)} aria-label={favorite ? `取消收藏${material.name}` : `收藏${material.name}`} aria-pressed={favorite}>
                    {favorite ? "♥" : "♡"}
                  </button>
                  <span className="library-source-label">{material.source.replace("素材", "")}</span>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="materials-library-empty">
            <span aria-hidden="true">✿</span>
            <h2>暂时没有找到这个素材</h2>
            <p>试试换一个关键词或分类吧。</p>
            <button className="secondary-button" onClick={() => { setQuery(""); setCategory("全部"); setSource("全部来源"); }}>查看全部素材</button>
          </div>
        )}
      </section>

      {selectedMaterial && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="material-detail-title" onClick={() => setSelectedMaterial(null)}>
          <div className="preview-stage material-detail-modal" onClick={(event) => event.stopPropagation()}>
            <button className="preview-close" onClick={() => setSelectedMaterial(null)} aria-label="关闭素材详情">×</button>
            <div className="material-detail-preview"><img src={selectedMaterial.image} alt={selectedMaterial.name} /></div>
            <div className="material-detail-copy">
              <span className="material-detail-category">{selectedMaterial.category}</span>
              <h2 id="material-detail-title">{selectedMaterial.name}</h2>
              <p>{selectedMaterial.source} · 已使用 {selectedMaterial.usageCount} 次</p>
              <dl>
                <div><dt>材质</dt><dd>{selectedMaterial.material}</dd></div>
                <div><dt>分类</dt><dd>{selectedMaterial.category}</dd></div>
                <div><dt>使用次数</dt><dd>{selectedMaterial.usageCount} 次</dd></div>
              </dl>
              <div className="material-detail-actions">
                <button className="primary-button" onClick={() => onAddToCraft(selectedMaterial)}>加入创作</button>
                <button className={`secondary-button${favoriteIds.has(selectedMaterial.id) ? " favorite-active" : ""}`} onClick={() => toggleFavorite(selectedMaterial)}>
                  {favoriteIds.has(selectedMaterial.id) ? "♥ 已收藏" : "♡ 收藏"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
