"use client";

import { useEffect, useRef, useState } from "react";
import {
  desktopArtworks,
  desktopCategories,
  desktopStyles,
  type DesktopArtwork,
  type DesktopCanvasItem,
  type DesktopCategory,
  type DesktopLayoutData,
  type DesktopStyle,
} from "./data/desktop";

type DesktopLayoutProps = {
  notify: (message: string) => void;
};

type DesktopEditorProps = DesktopLayoutProps & {
  style: DesktopStyle;
  onChangeStyle: () => void;
};

export function DesktopStyleSelector({ onSelect }: { onSelect: (style: DesktopStyle) => void }) {
  return (
    <section className="desktop-style-view" aria-labelledby="desktop-style-title">
      <header className="desktop-style-header paper-panel">
        <div>
          <span className="desktop-eyebrow">我的数字手作房间</span>
          <h1 id="desktop-style-title">选择桌面风格</h1>
          <p>先为作品挑一处温暖空间，再慢慢布置属于你的收藏。</p>
        </div>
        <div className="desktop-step-guide" aria-label="桌面布置流程">
          <span className="active"><b>1</b>选风格</span><i>→</i><span><b>2</b>布置作品</span><i>→</i><span><b>3</b>保存桌面</span>
        </div>
      </header>

      <section className="desktop-style-content paper-panel">
        <div className="desktop-style-heading">
          <div><h2>桌面模板</h2><p>使用真实桌面背景，作品以独立图层自由摆放。</p></div>
          <span>共 {desktopStyles.length} 种风格</span>
        </div>
        <div className="desktop-style-grid">
          {desktopStyles.map((style) => (
            <button className="desktop-style-card" key={style.id} onClick={() => onSelect(style)}>
              <span className="desktop-style-preview"><img src={style.image} alt={`${style.name}桌面背景`} /></span>
              <span className="desktop-style-copy">
                <strong>{style.name}</strong>
                <small>{style.description}</small>
                <em>{style.recommendation}</em>
              </span>
              <span className="desktop-style-enter">选择这个空间 →</span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}

export function ArtworkCategory({ value, onChange }: { value: DesktopCategory; onChange: (category: DesktopCategory) => void }) {
  return (
    <div className="desktop-artwork-categories" aria-label="作品分类">
      {desktopCategories.map((category) => (
        <button key={category} className={value === category ? "active" : ""} onClick={() => onChange(category)}>{category}</button>
      ))}
    </div>
  );
}

export function ArtworkLibrary({ category, onCategoryChange, onAdd }: {
  category: DesktopCategory;
  onCategoryChange: (category: DesktopCategory) => void;
  onAdd: (artwork: DesktopArtwork) => void;
}) {
  const visible = desktopArtworks.filter((artwork) => artwork.category === category);
  return (
    <aside className="desktop-library desktop-editor-card">
      <div className="desktop-panel-title"><div><span>作品库</span><h2>选择喜欢的小物</h2></div><b>{visible.length}</b></div>
      <ArtworkCategory value={category} onChange={onCategoryChange} />
      <div className="desktop-artwork-list">
        {visible.map((artwork) => (
          <button key={artwork.id} className="desktop-artwork-tile" onClick={() => onAdd(artwork)}>
            <span><img src={artwork.image} alt={artwork.name} /></span>
            <strong>{artwork.name}</strong>
            <small>{artwork.source}</small>
            <i aria-hidden="true">＋</i>
          </button>
        ))}
      </div>
      <div className="desktop-library-note"><span aria-hidden="true">✦</span><p>点击作品即可加入画布。作品会保留来源，方便以后继续收藏和交换。</p></div>
    </aside>
  );
}

export function CanvasEditor({ style, items, selectedId, onSelect, onMove }: {
  style: DesktopStyle;
  items: DesktopCanvasItem[];
  selectedId: string | null;
  onSelect: (uid: string | null) => void;
  onMove: (uid: string, x: number, y: number) => void;
}) {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ uid: string; startX: number; startY: number; baseX: number; baseY: number; rect: DOMRect } | null>(null);

  const beginDrag = (event: React.PointerEvent<HTMLButtonElement>, item: DesktopCanvasItem) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { uid: item.uid, startX: event.clientX, startY: event.clientY, baseX: item.x, baseY: item.y, rect };
    onSelect(item.uid);
  };
  const drag = (event: React.PointerEvent<HTMLButtonElement>) => {
    const current = dragRef.current;
    if (!current) return;
    const x = current.baseX + ((event.clientX - current.startX) / current.rect.width) * 100;
    const y = current.baseY + ((event.clientY - current.startY) / current.rect.height) * 100;
    onMove(current.uid, Math.max(3, Math.min(97, x)), Math.max(4, Math.min(96, y)));
  };
  const endDrag = () => { dragRef.current = null; };

  return (
    <section className="desktop-canvas-column desktop-editor-card">
      <div className="desktop-canvas-heading">
        <div><span>桌面画布</span><h2>{style.name}</h2></div>
        <p>拖拽作品调整位置 · 点击空白取消选择</p>
      </div>
      <div className="desktop-canvas" ref={canvasRef} onPointerDown={() => onSelect(null)}>
        <img className="desktop-canvas-background" src={style.image} alt={`${style.name}背景`} draggable={false} />
        <div className="desktop-canvas-safe" aria-hidden="true" />
        {items.slice().sort((a, b) => a.zIndex - b.zIndex).map((item) => {
          const artwork = desktopArtworks.find((entry) => entry.id === item.productId);
          const selected = item.uid === selectedId;
          return (
            <button
              key={item.uid}
              className={`desktop-canvas-item${selected ? " selected" : ""}`}
              style={{ left: `${item.x}%`, top: `${item.y}%`, zIndex: item.zIndex, transform: `translate(-50%,-50%) rotate(${item.rotation}deg) scale(${item.scale})` }}
              onPointerDown={(event) => beginDrag(event, item)}
              onPointerMove={drag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              aria-label={`移动${artwork?.name ?? "作品"}`}
            >
              <img src={item.image} alt={artwork?.name ?? "桌面作品"} draggable={false} />
              {selected && <><i className="desktop-selection-corner corner-a" /><i className="desktop-selection-corner corner-b" /><i className="desktop-selection-corner corner-c" /><i className="desktop-selection-corner corner-d" /></>}
            </button>
          );
        })}
        {items.length === 0 && <div className="desktop-canvas-empty"><span>✦</span><strong>从左侧挑选一件作品</strong><small>把喜欢的小物留在这间房间里</small></div>}
      </div>
      <div className="desktop-canvas-footer"><span>16:9 桌面壁纸画布</span><span>已摆放 {items.length} 件作品</span></div>
    </section>
  );
}

export function PropertyPanel({ selected, artwork, onPatch, onLayer, onDelete, onReplace, onAiArrange }: {
  selected: DesktopCanvasItem | null;
  artwork: DesktopArtwork | null;
  onPatch: (patch: Partial<DesktopCanvasItem>) => void;
  onLayer: (action: "up" | "down" | "top" | "bottom") => void;
  onDelete: () => void;
  onReplace: () => void;
  onAiArrange: () => void;
}) {
  return (
    <aside className="desktop-properties desktop-editor-card">
      <div className="desktop-panel-title"><div><span>编辑工具</span><h2>作品属性</h2></div></div>
      {selected && artwork ? (
        <>
          <div className="desktop-selected-work">
            <span><img src={selected.image} alt={artwork.name} /></span>
            <div><strong>{artwork.name}</strong><small>{artwork.source} · {artwork.category}</small></div>
          </div>
          <div className="desktop-coordinate-grid">
            <label>X 位置<input type="number" min="3" max="97" value={Math.round(selected.x)} onChange={(event) => onPatch({ x: Number(event.target.value) })} /></label>
            <label>Y 位置<input type="number" min="4" max="96" value={Math.round(selected.y)} onChange={(event) => onPatch({ y: Number(event.target.value) })} /></label>
          </div>
          <label className="desktop-range-row"><span>缩放比例 <b>{Math.round(selected.scale * 100)}%</b></span><input type="range" min="0.35" max="2.4" step="0.05" value={selected.scale} onChange={(event) => onPatch({ scale: Number(event.target.value) })} /></label>
          <label className="desktop-range-row"><span>旋转角度 <b>{selected.rotation}°</b></span><input type="range" min="-180" max="180" step="1" value={selected.rotation} onChange={(event) => onPatch({ rotation: Number(event.target.value) })} /></label>
          <div className="desktop-layer-tools"><span>图层调整</span><div><button onClick={() => onLayer("up")}>上移一层</button><button onClick={() => onLayer("down")}>下移一层</button><button onClick={() => onLayer("top")}>置顶</button><button onClick={() => onLayer("bottom")}>置底</button></div></div>
          <div className="desktop-property-actions"><button className="secondary-button" onClick={onReplace}>替换作品</button><button className="danger-button" onClick={onDelete}>删除</button></div>
        </>
      ) : (
        <div className="desktop-no-selection"><span>◇</span><strong>还没有选中作品</strong><p>点击画布中的小物，就可以调整它的位置、大小、角度和图层。</p></div>
      )}
      <button className="desktop-ai-button" onClick={onAiArrange}><span>✦</span><div><strong>AI 智能布置</strong><small>根据风格和作品推荐摆放方案</small></div><i>→</i></button>
    </aside>
  );
}

export function DesktopSavePanel({ onSave, onExport, onChangeStyle }: { onSave: () => void; onExport: () => void; onChangeStyle: () => void }) {
  return (
    <div className="desktop-save-panel">
      <button className="secondary-button" onClick={onChangeStyle}>更换桌面</button>
      <button className="secondary-button" onClick={onSave}>保存桌面</button>
      <button className="primary-button" onClick={onExport}>设为桌面壁纸</button>
    </div>
  );
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

export function DesktopEditor({ style, onChangeStyle, notify }: DesktopEditorProps) {
  const [category, setCategory] = useState<DesktopCategory>("耳饰");
  const [items, setItems] = useState<DesktopCanvasItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const selected = items.find((item) => item.uid === selectedId) ?? null;
  const selectedArtwork = desktopArtworks.find((artwork) => artwork.id === selected?.productId) ?? null;

  useEffect(() => {
    const stored = window.localStorage.getItem(`yuwu-desktop-${style.id}`);
    if (!stored) return;
    let timer = 0;
    try {
      const layout = JSON.parse(stored) as DesktopLayoutData;
      timer = window.setTimeout(() => {
        setItems(layout.items);
        setSaved(true);
      }, 0);
    } catch {
      window.localStorage.removeItem(`yuwu-desktop-${style.id}`);
    }
    return () => window.clearTimeout(timer);
  }, [style.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!selectedId) return;
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        setItems((current) => current.filter((item) => item.uid !== selectedId));
        setSelectedId(null);
        return;
      }
      const delta = event.shiftKey ? 2 : .5;
      const movement: Partial<DesktopCanvasItem> = {};
      if (event.key === "ArrowLeft") movement.x = Math.max(3, (selected?.x ?? 0) - delta);
      if (event.key === "ArrowRight") movement.x = Math.min(97, (selected?.x ?? 0) + delta);
      if (event.key === "ArrowUp") movement.y = Math.max(4, (selected?.y ?? 0) - delta);
      if (event.key === "ArrowDown") movement.y = Math.min(96, (selected?.y ?? 0) + delta);
      if (Object.keys(movement).length) {
        event.preventDefault();
        setItems((current) => current.map((item) => item.uid === selectedId ? { ...item, ...movement } : item));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, selectedId]);

  const addArtwork = (artwork: DesktopArtwork) => {
    const uid = `${artwork.id}-${Date.now()}`;
    const offset = (items.length % 5) * 4;
    const item: DesktopCanvasItem = {
      uid,
      productId: artwork.id,
      source: artwork.source,
      image: artwork.image,
      x: 48 + offset,
      y: 50 + (items.length % 2) * 7,
      scale: 1,
      rotation: 0,
      zIndex: Math.max(0, ...items.map((entry) => entry.zIndex)) + 1,
    };
    setItems((current) => [...current, item]);
    setSelectedId(uid);
    setSaved(false);
  };
  const patchSelected = (patch: Partial<DesktopCanvasItem>) => {
    if (!selectedId) return;
    setItems((current) => current.map((item) => item.uid === selectedId ? { ...item, ...patch } : item));
    setSaved(false);
  };
  const moveItem = (uid: string, x: number, y: number) => {
    setItems((current) => current.map((item) => item.uid === uid ? { ...item, x, y } : item));
    setSaved(false);
  };
  const adjustLayer = (action: "up" | "down" | "top" | "bottom") => {
    if (!selected) return;
    const values = items.map((item) => item.zIndex);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const next = action === "up" ? selected.zIndex + 1 : action === "down" ? selected.zIndex - 1 : action === "top" ? max + 1 : min - 1;
    patchSelected({ zIndex: next });
  };
  const deleteSelected = () => {
    if (!selectedId) return;
    setItems((current) => current.filter((item) => item.uid !== selectedId));
    setSelectedId(null);
    setSaved(false);
  };
  const replaceSelected = () => {
    if (!selectedArtwork || !selected) return;
    const sameCategory = desktopArtworks.filter((artwork) => artwork.category === selectedArtwork.category);
    const currentIndex = sameCategory.findIndex((artwork) => artwork.id === selectedArtwork.id);
    const replacement = sameCategory[(currentIndex + 1) % sameCategory.length];
    patchSelected({ productId: replacement.id, source: replacement.source, image: replacement.image });
    notify(`已替换为「${replacement.name}」`);
  };
  const saveLayout = () => {
    const layout: DesktopLayoutData = { id: `desktop-${style.id}`, style: style.name, background: style.image, items, updatedAt: new Date().toISOString() };
    window.localStorage.setItem(`yuwu-desktop-${style.id}`, JSON.stringify(layout));
    setSaved(true);
    notify("桌面布局已保存到我的桌面空间。");
  };
  const exportWallpaper = async () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1920;
      canvas.height = 1080;
      const context = canvas.getContext("2d");
      if (!context) return;
      const background = await loadImage(style.image);
      const coverScale = Math.max(canvas.width / background.naturalWidth, canvas.height / background.naturalHeight);
      const backgroundWidth = background.naturalWidth * coverScale;
      const backgroundHeight = background.naturalHeight * coverScale;
      context.drawImage(background, (canvas.width - backgroundWidth) / 2, (canvas.height - backgroundHeight) / 2, backgroundWidth, backgroundHeight);
      for (const item of items.slice().sort((a, b) => a.zIndex - b.zIndex)) {
        const image = await loadImage(item.image);
        const size = 150 * item.scale;
        context.save();
        context.translate((item.x / 100) * canvas.width, (item.y / 100) * canvas.height);
        context.rotate((item.rotation * Math.PI) / 180);
        const ratio = image.naturalWidth / image.naturalHeight;
        const width = ratio >= 1 ? size : size * ratio;
        const height = ratio >= 1 ? size / ratio : size;
        context.drawImage(image, -width / 2, -height / 2, width, height);
        context.restore();
      }
      const link = document.createElement("a");
      link.download = `与物-${style.name}-桌面壁纸.png`;
      link.href = canvas.toDataURL("image/png", 1);
      link.click();
      notify("16:9 高清桌面壁纸已生成并开始下载。");
    } catch {
      notify("壁纸生成暂时失败，请稍后再试。");
    }
  };
  const aiArrange = () => {
    if (!items.length) { notify("先从左侧挑选作品，AI 才能为你推荐布置方案。"); return; }
    setItems((current) => current.map((item, index) => ({ ...item, x: 24 + (index % 4) * 18, y: index % 2 === 0 ? 47 : 66, rotation: index % 2 === 0 ? -3 : 3, scale: Math.min(item.scale, 1.1) })));
    notify(`已根据「${style.name}」生成一版留白布置方案。`);
    setSaved(false);
  };

  return (
    <section className="desktop-editor-view">
      <header className="desktop-editor-header">
        <div><button onClick={onChangeStyle}>← 返回模板</button><span>桌面布置</span><h1>{style.name}</h1><small>{saved ? "● 已保存" : "○ 有未保存的调整"}</small></div>
        <DesktopSavePanel onSave={saveLayout} onExport={exportWallpaper} onChangeStyle={onChangeStyle} />
      </header>
      <div className="desktop-editor-grid">
        <ArtworkLibrary category={category} onCategoryChange={setCategory} onAdd={addArtwork} />
        <CanvasEditor style={style} items={items} selectedId={selectedId} onSelect={setSelectedId} onMove={moveItem} />
        <PropertyPanel selected={selected} artwork={selectedArtwork} onPatch={patchSelected} onLayer={adjustLayer} onDelete={deleteSelected} onReplace={replaceSelected} onAiArrange={aiArrange} />
      </div>
    </section>
  );
}

export default function DesktopLayout({ notify }: DesktopLayoutProps) {
  const [selectedStyle, setSelectedStyle] = useState<DesktopStyle | null>(null);
  return selectedStyle
    ? <DesktopEditor style={selectedStyle} onChangeStyle={() => setSelectedStyle(null)} notify={notify} />
    : <DesktopStyleSelector onSelect={setSelectedStyle} />;
}
