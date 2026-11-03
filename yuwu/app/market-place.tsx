"use client";

import { useEffect, useMemo, useState } from "react";
import { works } from "./data/works";
import {
  initialBlindBoxes,
  initialExchanges,
  marketArtworks,
  marketCategories,
  type BlindBox,
  type Exchange,
  type MarketArtwork,
} from "./data/market";

type MarketPlaceProps = {
  notify: (message: string) => void;
  onUseMaterials: (artwork: MarketArtwork) => void;
  onAddToDesktop: (artwork: MarketArtwork) => void;
};

type MarketView = "作品交流" | "盲盒交换" | "我的市集";

export function MarketArtworkCard({ artwork, favorite, onOpen, onFavorite }: {
  artwork: MarketArtwork;
  favorite: boolean;
  onOpen: (artwork: MarketArtwork) => void;
  onFavorite: (artwork: MarketArtwork) => void;
}) {
  return (
    <article className="market-artwork-card market-paper-card" onClick={() => onOpen(artwork)}>
      <div className={`market-card-image category-${artwork.category}`}>
        <span className={`market-exchange-state state-${artwork.exchangeStatus}`}>{artwork.exchangeStatus}</span>
        <img src={artwork.image} alt={artwork.name} />
        <button className={`market-heart${favorite ? " active" : ""}`} aria-label={favorite ? "取消收藏" : "收藏作品"} onClick={(event) => { event.stopPropagation(); onFavorite(artwork); }}>{favorite ? "♥" : "♡"}</button>
      </div>
      <div className="market-card-copy">
        <h2>{artwork.name}</h2>
        <p><span className="market-mini-avatar">{artwork.authorAvatar}</span> {artwork.author}</p>
        <div className="market-tags">{artwork.tags.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)}</div>
        <div className="market-card-meta"><span>{artwork.category} · {artwork.style}</span><span>♥ {artwork.favoriteCount + (favorite ? 1 : 0)}</span></div>
      </div>
    </article>
  );
}

export function ArtworkDetail({ artwork, favorite, onClose, onFavorite, onUseMaterials, onAddToDesktop, onCreateBlindBox }: {
  artwork: MarketArtwork;
  favorite: boolean;
  onClose: () => void;
  onFavorite: (artwork: MarketArtwork) => void;
  onUseMaterials: (artwork: MarketArtwork) => void;
  onAddToDesktop: (artwork: MarketArtwork) => void;
  onCreateBlindBox: () => void;
}) {
  return (
    <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="market-detail-title" onClick={onClose}>
      <div className="preview-stage market-detail-modal" onClick={(event) => event.stopPropagation()}>
        <button className="preview-close" onClick={onClose} aria-label="关闭作品详情">×</button>
        <div className="market-detail-heading">
          <div><span>与物市集 · 数字手作交流</span><h2 id="market-detail-title">{artwork.name}</h2></div>
          <span className={`market-detail-state state-${artwork.exchangeStatus}`}>{artwork.exchangeStatus}</span>
        </div>
        <div className="market-detail-layout">
          <div className="market-detail-preview market-paper-card"><img src={artwork.image} alt={artwork.name} /></div>
          <div className="market-detail-copy">
            <section className="market-author-card market-paper-card">
              <span>{artwork.authorAvatar}</span>
              <div><small>创作者</small><strong>{artwork.author}</strong><p>已分享 {artwork.authorWorkCount} 件数字手作</p></div>
              <button className="secondary-button">看看主页</button>
            </section>
            <p className="market-description">{artwork.description}</p>
            <dl>
              <div><dt>作品分类</dt><dd>{artwork.category}</dd></div>
              <div><dt>创作风格</dt><dd>{artwork.style}</dd></div>
              <div><dt>收藏数量</dt><dd>{artwork.favoriteCount + (favorite ? 1 : 0)}</dd></div>
              <div><dt>交流状态</dt><dd>{artwork.exchangeStatus}</dd></div>
            </dl>
            <h3>制作素材</h3>
            <div className="market-material-list">{artwork.materials.map((material) => <span key={material}>{material}</span>)}</div>
            <div className="market-tags market-detail-tags">{artwork.tags.map((tag) => <span key={tag}>#{tag}</span>)}</div>
          </div>
        </div>
        <div className="market-detail-actions">
          <button className={favorite ? "primary-button" : "secondary-button"} onClick={() => onFavorite(artwork)}>{favorite ? "♥ 已收藏" : "♡ 收藏"}</button>
          <button className="primary-button" onClick={() => onUseMaterials(artwork)}>使用同款素材创作</button>
          <button className="secondary-button" onClick={() => onAddToDesktop(artwork)}>添加到桌面</button>
          {artwork.exchangeStatus !== "仅展示" && <button className="secondary-button" onClick={onCreateBlindBox}>创建盲盒交换</button>}
        </div>
      </div>
    </div>
  );
}

export function PublishArtwork({ onClose, onPublish, initialWorkId }: { onClose: () => void; onPublish: (artwork: MarketArtwork) => void; initialWorkId?: number }) {
  const [workId, setWorkId] = useState(initialWorkId ?? works[0].id);
  const selected = works.find((work) => work.id === workId) ?? works[0];
  const [name, setName] = useState(selected.name);
  const [description, setDescription] = useState("这件小物来自一次安静的创作，希望把这份温柔分享给大家。");
  const [styleTags, setStyleTags] = useState("清新,手作,治愈");
  const publish = () => {
    onPublish({
      id: `mine-${Date.now()}`, userId: "mock-user", name: name.trim() || selected.name,
      category: (selected.type === "布艺" ? "纽扣布艺" : selected.type) as MarketArtwork["category"],
      author: "安安", authorAvatar: "安", authorWorkCount: works.length + 1, image: selected.image,
      tags: styleTags.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean).slice(0, 4),
      materials: selected.materials, materialTypes: ["金属"], style: "清新自然", colors: ["白色"],
      favoriteCount: 0, source: "与物市集", publishedAt: new Date().toISOString().slice(0, 10),
      description, exchangeStatus: "可交换", marketStatus: "已发布",
    });
  };
  return (
    <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="publish-market-title" onClick={onClose}>
      <div className="preview-stage market-flow-modal" onClick={(event) => event.stopPropagation()}>
        <button className="preview-close" onClick={onClose}>×</button>
        <span className="market-step">1　选择作品　→　2　填写信息　→　3　发布</span>
        <h2 id="publish-market-title">把作品带到与物市集</h2>
        <p className="market-flow-intro">分享作品和故事，让更多人发现你的数字手作。</p>
        <div className="market-publish-layout">
          <div className="market-own-work-list">
            {works.slice(0, 6).map((work) => <button key={work.id} className={workId === work.id ? "active" : ""} onClick={() => { setWorkId(work.id); setName(work.name); }}><img src={work.image} alt="" /><span>{work.name}</span></button>)}
          </div>
          <div className="market-form">
            <label>作品名称<input value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>作品分类<input value={selected.type} readOnly /></label>
            <label>风格标签<input value={styleTags} onChange={(event) => setStyleTags(event.target.value)} placeholder="用逗号分隔" /></label>
            <label>作品介绍<textarea rows={4} value={description} onChange={(event) => setDescription(event.target.value)} /></label>
          </div>
        </div>
        <div className="market-flow-actions"><button className="secondary-button" onClick={onClose}>暂不发布</button><button className="primary-button" onClick={publish}>发布到市集</button></div>
      </div>
    </div>
  );
}

export function BlindBoxCreate({ onClose, onCreate }: { onClose: () => void; onCreate: (box: BlindBox) => void }) {
  const [selectedIds, setSelectedIds] = useState<number[]>(works.slice(0, 2).map((work) => work.id));
  const [name, setName] = useState("我的春日小物盲盒");
  const [rule, setRule] = useState("请选择一件同类型数字手作参与交换，双方确认后随机交换。");
  const toggle = (id: number) => setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length < 4 ? [...current, id] : current);
  const selected = works.filter((work) => selectedIds.includes(work.id));
  return (
    <div className="preview-overlay" role="dialog" aria-modal="true" aria-labelledby="blind-create-title" onClick={onClose}>
      <div className="preview-stage market-flow-modal blind-create-modal" onClick={(event) => event.stopPropagation()}>
        <button className="preview-close" onClick={onClose}>×</button>
        <span className="market-step">选择 2—4 件作品，装进一份未知的美好</span>
        <h2 id="blind-create-title">创建数字手作盲盒</h2>
        <div className="blind-create-grid">
          <div className="market-own-work-list blind-own-works">{works.slice(0, 8).map((work) => <button key={work.id} className={selectedIds.includes(work.id) ? "active" : ""} onClick={() => toggle(work.id)}><img src={work.image} alt="" /><span>{work.name}</span><i>{selectedIds.includes(work.id) ? "✓" : "+"}</i></button>)}</div>
          <div className="market-form">
            <label>盲盒名称<input value={name} onChange={(event) => setName(event.target.value)} /></label>
            <label>包含作品数量<input value={`${selected.length} 件`} readOnly /></label>
            <label>交换规则<textarea rows={5} value={rule} onChange={(event) => setRule(event.target.value)} /></label>
            <div className="blind-box-preview market-paper-card"><span>?</span><div><strong>{name}</strong><small>{selected.map((work) => work.type).join(" · ") || "等待放入作品"}</small></div></div>
          </div>
        </div>
        <div className="market-flow-actions"><button className="secondary-button" onClick={onClose}>取消</button><button className="primary-button" disabled={selected.length < 2} onClick={() => onCreate({ id: `mine-box-${Date.now()}`, creatorId: "mock-user", creator: "安安", name, cover: selected[0]?.image ?? "/yuwu/ui/craft-earrings.png", artworks: selected.map((work) => work.name), artworkTypes: [...new Set(selected.map((work) => work.type))], rule, status: "等待交换", applicants: 0 })}>发布盲盒</button></div>
      </div>
    </div>
  );
}

export function BlindBoxExchange({ boxes, onApply }: { boxes: BlindBox[]; onApply: (box: BlindBox) => void }) {
  return (
    <section className="market-blind-grid">
      {boxes.map((box) => (
        <article className="market-blind-card market-paper-card" key={box.id}>
          <div className="market-blind-cover"><div className="market-box-ribbon">与物盲盒</div><img src={box.cover} alt="" /><span>?</span></div>
          <div className="market-blind-copy"><div className="market-blind-heading"><h2>{box.name}</h2><span className={`blind-status status-${box.status}`}>{box.status}</span></div><p>创建者：{box.creator}</p><div className="market-blind-types">{box.artworkTypes.map((type) => <span key={type}>{type}</span>)}</div><small>包含 {box.artworks.length} 件作品 · {box.applicants} 人期待交换</small><p className="market-blind-rule">{box.rule}</p><button className={box.status === "交换完成" ? "secondary-button" : "primary-button"} disabled={box.status === "交换完成"} onClick={() => onApply(box)}>{box.status === "交换完成" ? "交换已完成" : "申请交换"}</button></div>
        </article>
      ))}
    </section>
  );
}

export function MyMarket({ artworks, boxes, exchanges }: { artworks: MarketArtwork[]; boxes: BlindBox[]; exchanges: Exchange[] }) {
  const myArtworks = artworks.filter((artwork) => artwork.userId === "mock-user");
  const myBoxes = boxes.filter((box) => box.creatorId === "mock-user");
  return (
    <div className="my-market-view">
      <section className="my-market-summary market-paper-card"><div><span>已发布</span><strong>{myArtworks.length}</strong><small>件作品</small></div><div><span>我的盲盒</span><strong>{myBoxes.length}</strong><small>份等待美好</small></div><div><span>交换记录</span><strong>{exchanges.length}</strong><small>次小物相遇</small></div></section>
      <section className="my-market-section market-paper-card"><div className="my-market-heading"><div><span>01</span><h2>我的发布</h2></div><small>管理我分享在市集里的作品</small></div>{myArtworks.length ? <div className="my-market-row">{myArtworks.map((artwork) => <article key={artwork.id}><img src={artwork.image} alt="" /><div><strong>{artwork.name}</strong><span>{artwork.marketStatus}</span></div></article>)}</div> : <div className="my-market-empty">还没有发布作品，试试把第一件小物带到市集吧。</div>}</section>
      <section className="my-market-section market-paper-card"><div className="my-market-heading"><div><span>02</span><h2>我的盲盒</h2></div><small>等待交换或查看已经完成的盲盒</small></div>{myBoxes.length ? <div className="my-market-row">{myBoxes.map((box) => <article key={box.id}><img src={box.cover} alt="" /><div><strong>{box.name}</strong><span>{box.status}</span></div></article>)}</div> : <div className="my-market-empty">还没有创建盲盒，把喜欢的作品装进一份惊喜吧。</div>}</section>
      <section className="my-market-section market-paper-card"><div className="my-market-heading"><div><span>03</span><h2>我的交换记录</h2></div><small>记录送出与收到的小物</small></div><div className="market-exchange-records">{exchanges.map((exchange) => <article key={exchange.id}><span className={exchange.status === "completed" ? "done" : "waiting"}>{exchange.status === "completed" ? "已完成" : "申请中"}</span><div><strong>送出「{exchange.sentWork}」</strong><small>{exchange.blindBoxA}</small></div><b>⇄</b><div><strong>收到「{exchange.receivedWork}」</strong><small>来自 {exchange.userB}</small></div><time>{exchange.createTime}</time></article>)}</div></section>
    </div>
  );
}

export function MarketHome({ notify, onUseMaterials, onAddToDesktop }: MarketPlaceProps) {
  const [pendingPublishWorkId] = useState<number | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    try {
      const raw = window.sessionStorage.getItem("yuwu-market-publish-work");
      window.sessionStorage.removeItem("yuwu-market-publish-work");
      return raw ? (JSON.parse(raw) as { id?: number }).id : undefined;
    } catch { return undefined; }
  });
  const [view, setView] = useState<MarketView>("作品交流");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("全部");
  const [artworks, setArtworks] = useState<MarketArtwork[]>(marketArtworks);
  const [boxes, setBoxes] = useState<BlindBox[]>(initialBlindBoxes);
  const [exchanges, setExchanges] = useState<Exchange[]>(initialExchanges);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("yuwu-market-favorites") ?? "[]"); } catch { return []; }
  });
  const [selected, setSelected] = useState<MarketArtwork | null>(null);
  const [publishOpen, setPublishOpen] = useState(Boolean(pendingPublishWorkId));
  const [blindOpen, setBlindOpen] = useState(false);
  const [exchangeBox, setExchangeBox] = useState<BlindBox | null>(null);
  const visible = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("zh-CN");
    return artworks.filter((artwork) => {
      const searchable = [artwork.name, artwork.author, artwork.style, artwork.category, ...artwork.tags].join(" ").toLocaleLowerCase("zh-CN");
      return (!normalized || searchable.includes(normalized)) && (category === "全部" || artwork.category === category);
    });
  }, [artworks, category, query]);
  useEffect(() => window.localStorage.setItem("yuwu-market-favorites", JSON.stringify(favorites)), [favorites]);
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setSelected(null); setPublishOpen(false); setBlindOpen(false); setExchangeBox(null); } }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const toggleFavorite = (artwork: MarketArtwork) => {
    const exists = favorites.includes(artwork.id);
    setFavorites((current) => exists ? current.filter((id) => id !== artwork.id) : [...current, artwork.id]);
    notify(exists ? `已取消收藏「${artwork.name}」` : `已收藏「${artwork.name}」，已加入我的收藏`);
  };
  const publishArtwork = (artwork: MarketArtwork) => { setArtworks((current) => [artwork, ...current]); setPublishOpen(false); setView("作品交流"); notify(`「${artwork.name}」已发布到与物市集`); };
  const createBox = (box: BlindBox) => { setBoxes((current) => [box, ...current]); setBlindOpen(false); setView("盲盒交换"); notify(`「${box.name}」已发布，正在等待交换`); };
  const applyExchange = (box: BlindBox) => setExchangeBox(box);
  const confirmExchange = () => {
    if (!exchangeBox) return;
    const exchange: Exchange = { id: `exchange-${Date.now()}`, userA: "安安", userB: exchangeBox.creator, blindBoxA: "我的春日小物盲盒", blindBoxB: exchangeBox.name, receivedWork: exchangeBox.artworks[0], sentWork: works[0].name, status: "申请中", createTime: new Date().toISOString().slice(0, 10) };
    setExchanges((current) => [exchange, ...current]); setBoxes((current) => current.map((box) => box.id === exchangeBox.id ? { ...box, status: "交换中", applicants: box.applicants + 1 } : box)); notify(`已向「${exchangeBox.name}」发出交换申请`); setExchangeBox(null);
  };
  return (
    <section className="market-view">
      <header className="market-header market-paper-card paper-panel">
        <div><span className="market-eyebrow">作品分享 · 数字收藏 · 盲盒交换</span><h1>与物市集</h1><p>交换喜欢的小物，遇见不同的创作灵感。</p></div>
        <div className="market-header-actions"><label className="market-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索作品、作者、风格或分类" /></label><button className="secondary-button" onClick={() => setBlindOpen(true)}>创建盲盒</button><button className="primary-button" onClick={() => setPublishOpen(true)}>＋ 发布作品</button></div>
      </header>
      <section className="market-content market-paper-card paper-panel">
        <div className="market-view-tabs">{(["作品交流", "盲盒交换", "我的市集"] as MarketView[]).map((item) => <button key={item} className={view === item ? "active" : ""} onClick={() => setView(item)}><span>{item === "作品交流" ? "✿" : item === "盲盒交换" ? "?" : "⌂"}</span>{item}</button>)}</div>
        {view === "作品交流" && <><nav className="market-category-tabs">{marketCategories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</nav><div className="market-community-note"><div><span>◌</span><p><strong>这里没有价格标签</strong><small>每件作品都在等待被发现、收藏，或者遇见一场温柔交换。</small></p></div><span>共 {visible.length} 件作品</span></div>{visible.length ? <div className="market-artwork-grid">{visible.map((artwork) => <MarketArtworkCard key={artwork.id} artwork={artwork} favorite={favorites.includes(artwork.id)} onOpen={setSelected} onFavorite={toggleFavorite} />)}</div> : <div className="market-empty market-paper-card"><span>✿</span><h2>暂时没有找到这件小物</h2><p>换一个关键词或分类，再逛逛市集吧。</p></div>}</>}
        {view === "盲盒交换" && <><div className="market-section-heading"><div><span>未知的小物，也可能成为新的陪伴</span><h2>盲盒交换</h2><p>选择一份喜欢的盲盒，用自己的作品发起交换。</p></div><button className="primary-button" onClick={() => setBlindOpen(true)}>＋ 创建我的盲盒</button></div><BlindBoxExchange boxes={boxes} onApply={applyExchange} /></>}
        {view === "我的市集" && <MyMarket artworks={artworks} boxes={boxes} exchanges={exchanges} />}
      </section>
      {selected && <ArtworkDetail artwork={selected} favorite={favorites.includes(selected.id)} onClose={() => setSelected(null)} onFavorite={toggleFavorite} onUseMaterials={(artwork) => { setSelected(null); onUseMaterials(artwork); }} onAddToDesktop={(artwork) => { setSelected(null); onAddToDesktop(artwork); }} onCreateBlindBox={() => { setSelected(null); setBlindOpen(true); }} />}
      {publishOpen && <PublishArtwork initialWorkId={pendingPublishWorkId} onClose={() => setPublishOpen(false)} onPublish={publishArtwork} />}
      {blindOpen && <BlindBoxCreate onClose={() => setBlindOpen(false)} onCreate={createBox} />}
      {exchangeBox && <div className="preview-overlay" role="dialog" aria-modal="true" onClick={() => setExchangeBox(null)}><div className="preview-stage market-exchange-confirm" onClick={(event) => event.stopPropagation()}><button className="preview-close" onClick={() => setExchangeBox(null)}>×</button><span className="market-exchange-symbol">⇄</span><h2>申请交换「{exchangeBox.name}」</h2><p>你将用「我的春日小物盲盒」参与交换。申请后由双方确认，系统再随机交换其中一件数字作品。</p><div className="market-swap-preview"><div><img src={works[0].image} alt="" /><strong>我的盲盒</strong><small>送出未知小物</small></div><b>遇见</b><div><img src={exchangeBox.cover} alt="" /><strong>{exchangeBox.name}</strong><small>{exchangeBox.creator}</small></div></div><div className="market-flow-actions"><button className="secondary-button" onClick={() => setExchangeBox(null)}>再想想</button><button className="primary-button" onClick={confirmExchange}>确认申请交换</button></div></div></div>}
    </section>
  );
}

export default function MarketPlace(props: MarketPlaceProps) { return <MarketHome {...props} />; }
