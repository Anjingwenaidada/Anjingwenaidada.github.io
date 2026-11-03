"use client";

import { useEffect, useMemo, useState } from "react";
import {
  initialFavorites,
  inspirationArtworks,
  inspirationCategories,
  inspirationColors,
  inspirationMaterials,
  inspirationSorts,
  inspirationStyles,
  type Favorite,
  type InspirationArtwork,
} from "./data/inspiration";

type InspirationSquareProps = {
  notify: (message: string) => void;
  onUseMaterials: (artwork: InspirationArtwork) => void;
  onAddToDesktop: (artwork: InspirationArtwork) => void;
};

export function SearchBar({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <label className="inspiration-search">
      <span aria-hidden="true">⌕</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="搜索作品、风格或灵感"
        aria-label="搜索作品、风格或灵感"
      />
    </label>
  );
}

export function CategoryTabs({ active, onChange }: { active: string; onChange: (category: string) => void }) {
  return (
    <nav className="inspiration-category-tabs" aria-label="灵感作品分类">
      {inspirationCategories.map((category) => (
        <button key={category} className={active === category ? "active" : ""} onClick={() => onChange(category)}>
          {category}
        </button>
      ))}
    </nav>
  );
}

type FilterPanelProps = {
  style: string;
  material: string;
  color: string;
  sort: string;
  onStyle: (value: string) => void;
  onMaterial: (value: string) => void;
  onColor: (value: string) => void;
  onSort: (value: string) => void;
};

export function FilterPanel(props: FilterPanelProps) {
  const rows = [
    { label: "风格", values: inspirationStyles, active: props.style, change: props.onStyle },
    { label: "材质", values: inspirationMaterials, active: props.material, change: props.onMaterial },
    { label: "颜色", values: inspirationColors, active: props.color, change: props.onColor },
  ];
  return (
    <section className="inspiration-filter-panel inspiration-paper-card" aria-label="作品筛选">
      <div className="inspiration-filter-main">
        {rows.map((row) => (
          <div className="inspiration-filter-row" key={row.label}>
            <strong>{row.label}</strong>
            <div>
              {row.values.map((value) => (
                <button key={value} className={row.active === value ? "active" : ""} onClick={() => row.change(value)}>{value}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <label className="inspiration-sort">
        <span>排序</span>
        <select value={props.sort} onChange={(event) => props.onSort(event.target.value)}>
          {inspirationSorts.map((value) => <option key={value}>{value}</option>)}
        </select>
      </label>
    </section>
  );
}

type ArtworkCardProps = {
  artwork: InspirationArtwork;
  favorite: boolean;
  onOpen: (artwork: InspirationArtwork) => void;
  onFavorite: (artwork: InspirationArtwork) => void;
};

export function ArtworkCard({ artwork, favorite, onOpen, onFavorite }: ArtworkCardProps) {
  return (
    <article className="inspiration-artwork-card inspiration-paper-card" onClick={() => onOpen(artwork)}>
      <div className={`inspiration-card-image category-${artwork.category}`}>
        <span className="inspiration-card-source">{artwork.source}</span>
        <img src={artwork.image} alt={artwork.name} />
        <button
          className={`inspiration-favorite-button${favorite ? " active" : ""}`}
          aria-label={favorite ? `取消收藏${artwork.name}` : `收藏${artwork.name}`}
          onClick={(event) => { event.stopPropagation(); onFavorite(artwork); }}
        >
          {favorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="inspiration-card-copy">
        <h2>{artwork.name}</h2>
        <p>作者：{artwork.author}</p>
        <div className="inspiration-tags">{artwork.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}</div>
        <div className="inspiration-card-meta"><span>{artwork.category} · {artwork.style}</span><span>♥ {artwork.favoriteCount + (favorite ? 1 : 0)}</span></div>
      </div>
    </article>
  );
}

export function ArtworkGrid(props: Omit<ArtworkCardProps, "artwork" | "favorite"> & { artworks: InspirationArtwork[]; favoriteIds: Set<string> }) {
  if (!props.artworks.length) {
    return (
      <div className="inspiration-empty inspiration-paper-card">
        <span aria-hidden="true">✦</span>
        <h2>暂时没有找到这类灵感</h2>
        <p>试试更换关键词、材质或颜色，让新的小物出现吧。</p>
      </div>
    );
  }
  return (
    <div className="inspiration-artwork-grid">
      {props.artworks.map((artwork) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          favorite={props.favoriteIds.has(artwork.id)}
          onOpen={props.onOpen}
          onFavorite={props.onFavorite}
        />
      ))}
    </div>
  );
}

type ArtworkDetailProps = {
  artwork: InspirationArtwork;
  favorite: boolean;
  aiAnalysis: boolean;
  onClose: () => void;
  onFavorite: (artwork: InspirationArtwork) => void;
  onUseMaterials: (artwork: InspirationArtwork) => void;
  onAddToDesktop: (artwork: InspirationArtwork) => void;
  onAnalyze: () => void;
};

export function ArtworkDetail(props: ArtworkDetailProps) {
  const { artwork } = props;
  return (
    <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="inspiration-detail-title" onClick={props.onClose}>
      <div className="preview-stage inspiration-detail-modal" onClick={(event) => event.stopPropagation()}>
        <button className="preview-close" onClick={props.onClose} aria-label="关闭作品详情">×</button>
        <div className="inspiration-detail-heading">
          <div>
            <span>与物 · 手作灵感社区</span>
            <h2 id="inspiration-detail-title">{artwork.name}</h2>
            <p>作者：{artwork.author}</p>
          </div>
          <button className="inspiration-ai-analyze" onClick={props.onAnalyze}>✦ AI分析作品</button>
        </div>
        <div className="inspiration-detail-layout">
          <div className="inspiration-detail-preview inspiration-paper-card"><img src={artwork.image} alt={artwork.name} /></div>
          <div className="inspiration-detail-copy">
            <p className="inspiration-detail-description">{artwork.description}</p>
            <dl>
              <div><dt>作品类型</dt><dd>{artwork.category}</dd></div>
              <div><dt>创作风格</dt><dd>{artwork.style}</dd></div>
              <div><dt>收藏数量</dt><dd>{artwork.favoriteCount + (props.favorite ? 1 : 0)}</dd></div>
              <div><dt>发布来源</dt><dd>{artwork.source}</dd></div>
            </dl>
            <section>
              <h3>使用素材</h3>
              <div className="inspiration-material-list">{artwork.materials.map((material) => <span key={material}>{material}</span>)}</div>
            </section>
            <section>
              <h3>风格标签</h3>
              <div className="inspiration-tags">{artwork.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
            </section>
            {props.aiAnalysis && (
              <section className="inspiration-ai-result inspiration-paper-card">
                <strong>AI作品观察</strong>
                <p>这是一件{artwork.style}的{artwork.category}作品，以{artwork.colors.join("、")}为主色。{artwork.materials.slice(0, 3).join("、")}形成了温柔的层次，适合放在留白较多的桌面场景中。</p>
              </section>
            )}
          </div>
        </div>
        <div className="inspiration-detail-actions">
          <button className={props.favorite ? "primary-button" : "secondary-button"} onClick={() => props.onFavorite(artwork)}>{props.favorite ? "♥ 已收藏" : "♡ 收藏"}</button>
          <button className="primary-button" onClick={() => props.onUseMaterials(artwork)}>使用同款素材创作</button>
          <button className="secondary-button" onClick={() => props.onAddToDesktop(artwork)}>添加到桌面</button>
        </div>
      </div>
    </div>
  );
}

export function InspirationHome({ notify, onUseMaterials, onAddToDesktop }: InspirationSquareProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [style, setStyle] = useState("全部");
  const [material, setMaterial] = useState("全部");
  const [color, setColor] = useState("全部");
  const [sort, setSort] = useState("热门推荐");
  const [selectedArtwork, setSelectedArtwork] = useState<InspirationArtwork | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("蓝色系新中式耳饰");
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    if (typeof window === "undefined") return initialFavorites;
    try { return JSON.parse(window.localStorage.getItem("yuwu-inspiration-favorites") ?? "[]") as Favorite[]; }
    catch { return initialFavorites; }
  });

  const favoriteIds = useMemo(() => new Set(favorites.map((item) => item.artworkId)), [favorites]);

  const visibleArtworks = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    const result = inspirationArtworks.filter((artwork) => {
      const searchable = [artwork.name, artwork.author, artwork.style, ...artwork.tags, ...artwork.materials, ...artwork.colors].join(" ").toLocaleLowerCase("zh-CN");
      return (!normalized || searchable.includes(normalized))
        && (category === "全部" || artwork.category === category)
        && (style === "全部" || artwork.style === style)
        && (material === "全部" || artwork.materialTypes.includes(material as never))
        && (color === "全部" || artwork.colors.includes(color as never));
    });
    return [...result].sort((a, b) => sort === "最新发布"
      ? b.publishedAt.localeCompare(a.publishedAt)
      : sort === "收藏最多"
        ? b.favoriteCount - a.favoriteCount
        : (b.favoriteCount + (b.source === "灵感广场" ? 30 : 0)) - (a.favoriteCount + (a.source === "灵感广场" ? 30 : 0)));
  }, [category, color, material, query, sort, style]);

  useEffect(() => {
    window.localStorage.setItem("yuwu-inspiration-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setSelectedArtwork(null); setAiOpen(false); setAiAnalysis(false); }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const toggleFavorite = (artwork: InspirationArtwork) => {
    const exists = favoriteIds.has(artwork.id);
    setFavorites((current) => exists
      ? current.filter((item) => item.artworkId !== artwork.id)
      : [...current, { userId: "mock-user", artworkId: artwork.id, createTime: new Date().toISOString(), source: "灵感收藏" }]);
    notify(exists ? `已取消收藏「${artwork.name}」` : `已收藏「${artwork.name}」`);
  };

  const changeCategory = (value: string) => {
    setCategory(value);
    setStyle("全部");
    setMaterial("全部");
    setColor("全部");
  };

  const runAiSearch = () => {
    setQuery(aiPrompt);
    if (aiPrompt.includes("耳饰")) setCategory("耳饰");
    if (aiPrompt.includes("新中式")) setStyle("新中式");
    if (aiPrompt.includes("蓝色")) setColor("蓝色");
    setAiOpen(false);
    notify("AI已根据描述整理灵感作品");
  };

  return (
    <section className="inspiration-view" aria-labelledby="inspiration-title">
      <header className="inspiration-header inspiration-paper-card">
        <div>
          <span className="inspiration-eyebrow">与物 · 手作灵感社区</span>
          <h1 id="inspiration-title">灵感广场</h1>
          <p>发现喜欢的小物，寻找创作灵感。</p>
        </div>
        <div className="inspiration-header-actions">
          <SearchBar value={query} onChange={setQuery} />
          <button className="secondary-button inspiration-ai-button" onClick={() => setAiOpen(true)}>✦ AI寻找灵感</button>
        </div>
      </header>

      <section className="inspiration-content inspiration-paper-card">
        <CategoryTabs active={category} onChange={changeCategory} />
        {category !== "全部" && (
          <FilterPanel style={style} material={material} color={color} sort={sort} onStyle={setStyle} onMaterial={setMaterial} onColor={setColor} onSort={setSort} />
        )}
        {category === "全部" && (
          <div className="inspiration-community-note">
            <div><span>今日灵感</span><strong>把喜欢的小物，慢慢收藏成自己的生活。</strong></div>
            <label>排序<select value={sort} onChange={(event) => setSort(event.target.value)}>{inspirationSorts.map((value) => <option key={value}>{value}</option>)}</select></label>
          </div>
        )}
        <div className="inspiration-summary"><span>共 {visibleArtworks.length} 件手作灵感</span><span>{category === "全部" ? "为你推荐" : `${category}灵感`}</span></div>
        <ArtworkGrid artworks={visibleArtworks} favoriteIds={favoriteIds} onOpen={(artwork) => { setSelectedArtwork(artwork); setAiAnalysis(false); }} onFavorite={toggleFavorite} />
      </section>

      {selectedArtwork && (
        <ArtworkDetail
          artwork={selectedArtwork}
          favorite={favoriteIds.has(selectedArtwork.id)}
          aiAnalysis={aiAnalysis}
          onClose={() => setSelectedArtwork(null)}
          onFavorite={toggleFavorite}
          onUseMaterials={onUseMaterials}
          onAddToDesktop={onAddToDesktop}
          onAnalyze={() => setAiAnalysis((current) => !current)}
        />
      )}

      {aiOpen && (
        <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="ai-inspiration-title" onClick={() => setAiOpen(false)}>
          <div className="preview-stage inspiration-ai-modal" onClick={(event) => event.stopPropagation()}>
            <button className="preview-close" onClick={() => setAiOpen(false)} aria-label="关闭AI寻找灵感">×</button>
            <span className="inspiration-ai-spark">✦</span>
            <h2 id="ai-inspiration-title">AI寻找灵感</h2>
            <p>告诉我你想找的颜色、风格或作品类型。</p>
            <label><span>我的灵感描述</span><textarea value={aiPrompt} onChange={(event) => setAiPrompt(event.target.value)} rows={3} /></label>
            <div className="inspiration-ai-examples">
              {['蓝色系新中式耳饰', '奶油色日系插花', '木质复古风铃'].map((example) => <button key={example} onClick={() => setAiPrompt(example)}>{example}</button>)}
            </div>
            <button className="primary-button" onClick={runAiSearch}>开始寻找灵感</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default function InspirationSquare(props: InspirationSquareProps) {
  return <InspirationHome {...props} />;
}
