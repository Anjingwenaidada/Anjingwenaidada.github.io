"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MyMaterials from "./my-materials";
import MyWorks from "./my-works";
import DesktopLayout from "./desktop-layout";
import InspirationSquare from "./inspiration-square";
import MarketPlace from "./market-place";

type PageName = "首页" | "创作工坊" | "我的素材" | "我的作品" | "桌面布置" | "灵感广场" | "与物市集";

const navItems = [
  { name: "首页", image: "/yuwu/ui/nav-home.png", ready: true },
  { name: "创作工坊", image: "/yuwu/ui/nav-workshop.png", ready: true },
  { name: "我的素材", image: "/yuwu/ui/nav-materials.png", ready: true },
  { name: "我的作品", image: "/yuwu/ui/nav-works.png", ready: true },
  { name: "桌面布置", image: "/yuwu/ui/nav-desktop.png", ready: true },
  { name: "灵感广场", image: "/yuwu/ui/nav-inspiration.png", ready: true },
  { name: "与物市集", image: "/yuwu/ui/nav-market.png", ready: true },
] as const;

const craftEntries = [
  { key: "earrings", name: "耳饰", image: "/yuwu/ui/craft-earrings.png", ready: true },
  { key: "bracelet", name: "手串项链", image: "/yuwu/ui/craft-bracelet.png", ready: false },
  { key: "flowers", name: "插花", image: "/yuwu/ui/craft-flowers.png", ready: false },
  { key: "pea", name: "豆荚娃娃", image: "/yuwu/ui/craft-pea.png", ready: false },
  { key: "wind", name: "风铃", image: "/yuwu/ui/craft-wind.png", ready: false },
  { key: "creature", name: "幻想生物", image: "/yuwu/ui/craft-creature.png", ready: false },
  { key: "fabric", name: "纽扣布艺", image: "/yuwu/ui/craft-fabric.png", ready: false },
  { key: "frame", name: "画作相框", image: "/yuwu/ui/craft-frame.png", ready: false },
] as const;

const materials = [
  { id: "gold-stud", name: "复古耳钩", type: "耳钩", image: "/yuwu/materials/earrings/gold-stud.png" },
  { id: "jump-ring", name: "连接环", type: "连接件", image: "/yuwu/materials/earrings/gold-jump-ring.png" },
  { id: "flower-connector", name: "贝壳花片", type: "连接件", image: "/yuwu/materials/earrings/gold-flower-connector.png" },
  { id: "aqua-crystal", name: "烟青琉璃珠", type: "珠子", image: "/yuwu/materials/earrings/aqua-crystal.png" },
  { id: "clear-crystal", name: "透明水晶", type: "珠子", image: "/yuwu/materials/earrings/clear-crystal.png" },
  { id: "green-crystal", name: "浅绿裂纹珠", type: "珠子", image: "/yuwu/materials/earrings/green-crackle-crystal.png" },
  { id: "cream-pearl", name: "奶油珍珠", type: "珠子", image: "/yuwu/materials/earrings/cream-pearl.png" },
  { id: "blue-pearl", name: "蓝色巴洛克珠", type: "珠子", image: "/yuwu/materials/earrings/blue-baroque-pearl.png" },
  { id: "jade-bead", name: "青玉圆珠", type: "珠子", image: "/yuwu/materials/earrings/green-jade-bead.png" },
  { id: "wood-drop", name: "原木水滴", type: "吊坠", image: "/yuwu/materials/earrings/wood-teardrop.png" },
  { id: "chain-tassel", name: "镀金流苏", type: "流苏", image: "/yuwu/materials/earrings/gold-chain-tassel.png" },
] as const;

const modelTemplates = {
  "东方雅韵": [
    "/yuwu/ui/model-east-1.png", "/yuwu/ui/model-east-2.png", "/yuwu/ui/model-east-3.png", "/yuwu/ui/model-east-4.png", "/yuwu/ui/model-east-5.png",
  ],
  "现代极简": [
    "/yuwu/ui/model-modern-1.png", "/yuwu/ui/model-modern-2.png", "/yuwu/ui/model-modern-3.png", "/yuwu/ui/model-modern-4.png",
  ],
  "田园森系": [
    "/yuwu/ui/model-pastoral-1.png", "/yuwu/ui/model-pastoral-2.png",
  ],
  "民族风情": [
    "/yuwu/ui/model-ethnic-1.png", "/yuwu/ui/model-ethnic-2.png", "/yuwu/ui/model-ethnic-3.png",
  ],
} as const;

type ModelStyle = keyof typeof modelTemplates;

type CanvasItem = {
  uid: string;
  materialId: (typeof materials)[number]["id"];
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  hue: number;
  flipX: boolean;
  flipY: boolean;
  locked: boolean;
  z: number;
};

const initialCanvasItems: CanvasItem[] = [
  { uid: "left-hook", materialId: "gold-stud", x: 25, y: 17, rotation: 0, scale: 1, opacity: 1, hue: 0, flipX: false, flipY: false, locked: false, z: 1 },
  { uid: "left-bead", materialId: "aqua-crystal", x: 25, y: 34, rotation: 0, scale: 1, opacity: 1, hue: 0, flipX: false, flipY: false, locked: false, z: 2 },
  { uid: "right-hook", materialId: "gold-stud", x: 75, y: 17, rotation: 0, scale: 1, opacity: 1, hue: 0, flipX: true, flipY: false, locked: false, z: 1 },
  { uid: "right-bead", materialId: "aqua-crystal", x: 75, y: 34, rotation: 0, scale: 1, opacity: 1, hue: 0, flipX: true, flipY: false, locked: false, z: 2 },
];

function CraftIllustration({ image, name }: { image: string; name: string }) {
  return <span className="craft-illustration asset-illustration"><img src={image} alt="" aria-hidden="true" /><span className="sr-only">{name}</span></span>;
}

function DesktopScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`desktop-scene${compact ? " compact" : ""}`} aria-label="桌面陈列预览">
      <img src="/yuwu/ui/desktop-scene.png" alt="六对耳饰陈列在温暖的桌面背景中" />
    </div>
  );
}

function Sidebar({ active, onNavigate }: { active: PageName; onNavigate: (name: string, ready: boolean) => void }) {
  return (
    <aside className="sidebar paper-panel">
      <span className="paper-fold" aria-hidden="true" />
      <nav aria-label="主导航">
        {navItems.map((item) => (
          <button key={item.name} className={active === item.name ? "active" : ""} onClick={() => onNavigate(item.name, item.ready)}>
            <span className="nav-symbol" aria-hidden="true"><img src={item.image} alt="" /></span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function Topbar({ onHome }: { onHome: () => void }) {
  return (
    <header className="topbar">
      <button className="brand" onClick={onHome} aria-label="返回首页">
        <img src="/yuwu/ui/logo.png" alt="与物" />
      </button>
      <label className="search-box"><span>⌕</span><input aria-label="搜索" placeholder="搜索素材、作品和灵感" /></label>
      <div className="top-actions">
        <button className="quiet-icon" aria-label="通知"><img src="/yuwu/ui/notification.png" alt="" /><i /></button>
        <button className="avatar" aria-label="个人中心">安</button>
        <button className="desktop-status"><img src="/yuwu/ui/desktop-status.png" alt="" /> 桌面展示中 <i /></button>
      </div>
      <div className="window-marks" aria-hidden="true">—　□　×</div>
    </header>
  );
}

function Hero({ onStart, onDesktop }: { onStart: () => void; onDesktop: () => void }) {
  return (
    <section className="hero paper-panel folder-panel">
      <div className="hero-copy">
        <h1>亲手造物，与物相伴</h1>
        <p>亲手制作数字小物，让它留在你的电脑桌面。</p>
        <div className="button-row">
          <button className="primary-button" onClick={onStart}>开始制作耳饰</button>
          <button className="secondary-button" onClick={onDesktop}>布置我的桌面</button>
        </div>
      </div>
      <div className="hero-flow" aria-label="素材组合成耳饰并摆放到桌面">
        <img className="hero-flow-image hero-process-image" src="/yuwu/ui/hero-process-reference.png" alt="珠子和配件组合成花朵耳饰" />
        <img className="hero-flow-image hero-display-image" src="/yuwu/ui/hero-display-reference.png" alt="耳饰陈列在电脑桌面场景中" />
      </div>
    </section>
  );
}

function CraftChooser({ onChoose }: { onChoose: (name: string, ready: boolean) => void }) {
  return (
    <section className="craft-card paper-panel">
      <h2>今天想做什么？</h2>
      <div className="craft-list">
        {craftEntries.map((item) => (
          <button key={item.key} className={item.ready ? "available" : ""} onClick={() => onChoose(item.name, item.ready)}>
            {item.ready && <span className="open-badge">首饰开放</span>}
            <CraftIllustration image={item.image} name={item.name} /><span>{item.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function MyDesktop({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="desktop-card paper-panel">
      <h2>我的桌面</h2><DesktopScene />
      <button className="secondary-button small-action" onClick={onOpen}>进入布置模式</button>
    </section>
  );
}

function ContinueWork({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="continue-card paper-panel">
      <h2>继续创作</h2>
      <div className="continue-content">
        <div className="pair-preview"><img src="/yuwu/ui/continue-flow.png" alt="蓝色琉璃耳饰和已使用配件" /></div>
        <div className="continue-info">
          <div className="material-dots"><i /><i /><i /><i>✿</i><i>⌁</i></div>
          <div className="progress-row"><span>进度</span><b><i /></b><strong>68%</strong></div>
          <button className="secondary-button small-action" onClick={onContinue}>继续编辑</button>
        </div>
      </div>
    </section>
  );
}

function Home({ onStart, notify }: { onStart: () => void; notify: (message: string) => void }) {
  return (
    <section className="home-view">
      <Hero onStart={onStart} onDesktop={() => notify("桌面布置将在完成耳饰创作流程后开放。")} />
      <div className="middle-grid">
        <CraftChooser onChoose={(name, ready) => ready ? onStart() : notify(`${name}已列入功能地图，第一版先完成耳饰。`)} />
        <MyDesktop onOpen={() => notify("桌面布置功能正在准备中。")} />
        <ContinueWork onContinue={onStart} />
      </div>
      <div className="bottom-grid">
        <section className="recent-card paper-panel"><div className="card-heading"><h2>最近作品</h2><button>查看全部 ›</button></div><div className="recent-items">{craftEntries.slice(0, 4).map((item) => <span key={item.key}><img src={item.image} alt={item.name} /></span>)}</div></section>
        <section className="inspiration-card paper-panel"><div className="card-heading"><h2>今日灵感</h2><button>换一换 ↻</button></div><div className="inspiration-items">{craftEntries.slice(4, 8).map((item) => <i key={item.key}><img src={item.image} alt={item.name} /></i>)}</div></section>
        <section className="materials-card paper-panel"><div className="card-heading"><h2>东方手作素材</h2><button>更多素材 ›</button></div><div className="home-materials">{materials.slice(4, 9).map((item) => <span key={item.id}><img src={item.image} alt={item.name} /><small>{item.name}</small></span>)}</div></section>
      </div>
    </section>
  );
}

function Workshop({ onBack, notify }: { onBack: () => void; notify: (message: string) => void }) {
  const [style, setStyle] = useState("复古风");
  const [tab, setTab] = useState("全部");
  const [selectedId, setSelectedId] = useState("aqua-crystal");
  const [items, setItems] = useState<CanvasItem[]>(initialCanvasItems);
  const [selectedCanvasIds, setSelectedCanvasIds] = useState<string[]>(["left-bead"]);
  const [selectionBox, setSelectionBox] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [undoStack, setUndoStack] = useState<CanvasItem[][]>([]);
  const [redoStack, setRedoStack] = useState<CanvasItem[][]>([]);
  const [previewing, setPreviewing] = useState(false);
  const [tryOnMethod, setTryOnMethod] = useState<"upload" | "camera" | "model">("upload");
  const [tryOnStep, setTryOnStep] = useState<"choose" | "model-picker" | "result">("choose");
  const [uploadedPhoto, setUploadedPhoto] = useState("");
  const [cameraMessage, setCameraMessage] = useState("");
  const [modelStyle, setModelStyle] = useState<ModelStyle>("东方雅韵");
  const [selectedModelImage, setSelectedModelImage] = useState<string>(modelTemplates["东方雅韵"][0]);
  const [tryOnOffset, setTryOnOffset] = useState({ x: 0, y: 0 });
  const [tryOnPairScale, setTryOnPairScale] = useState(1);
  const [draggingTryOnJewelry, setDraggingTryOnJewelry] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const cameraVideoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const tryOnDragRef = useRef<{ pointerId: number; startX: number; startY: number; baseX: number; baseY: number; rect: DOMRect } | null>(null);
  const clipboardRef = useRef<CanvasItem[]>([]);
  const dragRef = useRef<{ uids: string[]; rect: DOMRect; before: CanvasItem[]; base: CanvasItem[]; startX: number; startY: number } | null>(null);
  const transformRef = useRef<{ mode: "scale" | "rotate"; uids: string[]; before: CanvasItem[]; centerX: number; centerY: number; startDistance: number; startAngle: number } | null>(null);
  const selectionRef = useRef<{ rect: DOMRect; x1: number; y1: number; x2: number; y2: number; additive: boolean } | null>(null);
  const tabs = ["全部", "耳钩", "珠子", "连接件", "吊坠", "流苏"];
  const selectedMaterial = materials.find((item) => item.id === selectedId) ?? materials[0];
  const selectedCanvasItem = items.find((item) => item.uid === selectedCanvasIds[selectedCanvasIds.length - 1]);
  const selectedCanvasMaterial = materials.find((item) => item.id === selectedCanvasItem?.materialId) ?? selectedMaterial;
  const visible = useMemo(() => tab === "全部" ? materials : materials.filter((item) => item.type === tab), [tab]);

  const commit = (next: CanvasItem[]) => {
    setUndoStack((history) => [...history.slice(-19), items]);
    setRedoStack([]);
    setItems(next);
  };
  const patchSelected = (patch: Partial<CanvasItem>) => {
    if (!selectedCanvasItem) return;
    commit(items.map((item) => selectedCanvasIds.includes(item.uid) && !item.locked ? { ...item, ...patch } : item));
  };
  const patchSelectedBeads = (patch: Partial<CanvasItem>) => {
    if (!selectedCanvasItem) return;
    commit(items.map((item) => {
      const material = materials.find((entry) => entry.id === item.materialId);
      return selectedCanvasIds.includes(item.uid) && !item.locked && material?.type === "珠子" ? { ...item, ...patch } : item;
    }));
  };
  const addMaterial = (materialId: CanvasItem["materialId"], x: number, y: number) => {
    const nextItem: CanvasItem = { uid: `piece-${Date.now()}`, materialId, x, y, rotation: 0, scale: 1, opacity: 1, hue: 0, flipX: false, flipY: false, locked: false, z: Math.max(0, ...items.map((item) => item.z)) + 1 };
    commit([...items, nextItem]);
    setSelectedCanvasIds([nextItem.uid]);
  };
  const undo = () => {
    if (!undoStack.length) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((history) => history.slice(0, -1));
    setRedoStack((history) => [items, ...history].slice(0, 20));
    setItems(previous);
    setSelectedCanvasIds((selected) => {
      const remaining = selected.filter((uid) => previous.some((item) => item.uid === uid));
      return remaining.length ? remaining : (previous[0] ? [previous[0].uid] : []);
    });
  };
  const redo = () => {
    if (!redoStack.length) return;
    const next = redoStack[0];
    setRedoStack((history) => history.slice(1));
    setUndoStack((history) => [...history.slice(-19), items]);
    setItems(next);
  };
  const beginMove = (event: React.PointerEvent<HTMLElement>, item: CanvasItem) => {
    event.stopPropagation();
    if (item.locked) return;
    if (event.shiftKey) {
      setSelectedCanvasIds((selected) => selected.includes(item.uid) ? selected.filter((uid) => uid !== item.uid) : [...selected, item.uid]);
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!rect) return;
    const movingIds = (selectedCanvasIds.includes(item.uid) ? selectedCanvasIds : [item.uid]).filter((uid) => !items.find((entry) => entry.uid === uid)?.locked);
    if (!movingIds.length) return;
    if (event.altKey) {
      const stamp = Date.now();
      const topZ = Math.max(0, ...items.map((entry) => entry.z));
      const copies = items.filter((entry) => movingIds.includes(entry.uid)).map((entry, index) => ({ ...entry, uid: `alt-copy-${stamp}-${index}`, z: topZ + index + 1 }));
      const copyIds = copies.map((entry) => entry.uid);
      dragRef.current = { uids: copyIds, rect, before: items, base: [...items, ...copies], startX: event.clientX, startY: event.clientY };
      setItems([...items, ...copies]);
      setSelectedCanvasIds(copyIds);
      return;
    }
    dragRef.current = { uids: movingIds, rect, before: items, base: items, startX: event.clientX, startY: event.clientY };
    setSelectedCanvasIds(movingIds);
  };
  const moveItem = (event: React.PointerEvent<HTMLElement>) => {
    const dragging = dragRef.current;
    if (!dragging) return;
    const dx = ((event.clientX - dragging.startX) / dragging.rect.width) * 100;
    const dy = ((event.clientY - dragging.startY) / dragging.rect.height) * 100;
    setItems(dragging.base.map((item) => dragging.uids.includes(item.uid) ? { ...item, x: Math.max(3, Math.min(97, item.x + dx)), y: Math.max(5, Math.min(95, item.y + dy)) } : item));
  };
  const endMove = () => {
    const dragging = dragRef.current;
    if (!dragging) return;
    setUndoStack((history) => [...history.slice(-19), dragging.before]);
    setRedoStack([]);
    dragRef.current = null;
  };
  const beginTransform = (event: React.PointerEvent<HTMLSpanElement>, mode: "scale" | "rotate", item: CanvasItem) => {
    event.preventDefault();
    event.stopPropagation();
    if (item.locked) return;
    const rect = event.currentTarget.closest(".interactive-canvas")?.getBoundingClientRect();
    if (!rect) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const centerX = rect.left + (item.x / 100) * rect.width;
    const centerY = rect.top + (item.y / 100) * rect.height;
    const startDistance = Math.max(8, Math.hypot(event.clientX - centerX, event.clientY - centerY));
    const startAngle = Math.atan2(event.clientY - centerY, event.clientX - centerX) * 180 / Math.PI;
    const candidateIds = selectedCanvasIds.includes(item.uid) ? selectedCanvasIds : [item.uid];
    const uids = candidateIds.filter((uid) => !items.find((entry) => entry.uid === uid)?.locked);
    setSelectedCanvasIds(candidateIds);
    transformRef.current = { mode, uids, before: items, centerX, centerY, startDistance, startAngle };
  };
  const transformItem = (event: React.PointerEvent<HTMLSpanElement>) => {
    const transforming = transformRef.current;
    if (!transforming) return;
    if (transforming.mode === "scale") {
      const distance = Math.hypot(event.clientX - transforming.centerX, event.clientY - transforming.centerY);
      const ratio = distance / transforming.startDistance;
      setItems(transforming.before.map((item) => transforming.uids.includes(item.uid) ? { ...item, scale: Math.max(.4, Math.min(2, item.scale * ratio)) } : item));
      return;
    }
    const angle = Math.atan2(event.clientY - transforming.centerY, event.clientX - transforming.centerX) * 180 / Math.PI;
    const delta = ((angle - transforming.startAngle + 540) % 360) - 180;
    setItems(transforming.before.map((item) => transforming.uids.includes(item.uid) ? { ...item, rotation: Math.round(item.rotation + delta) } : item));
  };
  const endTransform = (event: React.PointerEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    const transforming = transformRef.current;
    if (!transforming) return;
    setUndoStack((history) => [...history.slice(-19), transforming.before]);
    setRedoStack([]);
    transformRef.current = null;
  };
  const beginSelection = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    selectionRef.current = { rect, x1: x, y1: y, x2: x, y2: y, additive: event.shiftKey };
    setSelectionBox({ x1: x, y1: y, x2: x, y2: y });
  };
  const moveSelection = (event: React.PointerEvent<HTMLDivElement>) => {
    const selecting = selectionRef.current;
    if (!selecting) return;
    selecting.x2 = Math.max(0, Math.min(100, ((event.clientX - selecting.rect.left) / selecting.rect.width) * 100));
    selecting.y2 = Math.max(0, Math.min(100, ((event.clientY - selecting.rect.top) / selecting.rect.height) * 100));
    setSelectionBox({ x1: selecting.x1, y1: selecting.y1, x2: selecting.x2, y2: selecting.y2 });
  };
  const endSelection = () => {
    const selecting = selectionRef.current;
    if (!selecting) return;
    const left = Math.min(selecting.x1, selecting.x2);
    const right = Math.max(selecting.x1, selecting.x2);
    const top = Math.min(selecting.y1, selecting.y2);
    const bottom = Math.max(selecting.y1, selecting.y2);
    const isClick = right - left < 1.2 && bottom - top < 1.2;
    const boxed = isClick ? [] : items.filter((item) => item.x >= left && item.x <= right && item.y >= top && item.y <= bottom).map((item) => item.uid);
    setSelectedCanvasIds((selected) => selecting.additive ? Array.from(new Set([...selected, ...boxed])) : boxed);
    selectionRef.current = null;
    setSelectionBox(null);
  };
  const replaceSelected = () => selectedCanvasItem && patchSelected({ materialId: selectedMaterial.id });
  const copySelected = () => {
    clipboardRef.current = items.filter((item) => selectedCanvasIds.includes(item.uid));
  };
  const pasteClipboard = () => {
    if (!clipboardRef.current.length) return;
    const stamp = Date.now();
    const topZ = Math.max(0, ...items.map((item) => item.z));
    const copies = clipboardRef.current.map((item, index) => ({ ...item, uid: `paste-${stamp}-${index}`, x: Math.min(97, item.x + 4), y: Math.min(95, item.y + 4), locked: false, z: topZ + index + 1 }));
    commit([...items, ...copies]);
    setSelectedCanvasIds(copies.map((item) => item.uid));
    clipboardRef.current = copies;
  };
  const duplicateSelected = () => {
    copySelected();
    const selected = items.filter((item) => selectedCanvasIds.includes(item.uid) && !item.locked);
    if (!selected.length) return;
    const stamp = Date.now();
    const topZ = Math.max(0, ...items.map((item) => item.z));
    const copies = selected.map((item, index) => ({ ...item, uid: `copy-${stamp}-${index}`, x: Math.min(97, item.x + 4), y: Math.min(95, item.y + 4), locked: false, z: topZ + index + 1 }));
    commit([...items, ...copies]);
    setSelectedCanvasIds(copies.map((item) => item.uid));
    clipboardRef.current = copies;
  };
  const deleteSelected = () => {
    if (!selectedCanvasItem) return;
    const next = items.filter((item) => !selectedCanvasIds.includes(item.uid) || item.locked);
    commit(next);
    const remainingSelection = selectedCanvasIds.filter((uid) => next.some((item) => item.uid === uid));
    setSelectedCanvasIds(remainingSelection.length ? remainingSelection : (next[0] ? [next[0].uid] : []));
  };
  const mirrorRightEar = () => {
    const leftItems = items.filter((item) => item.x < 50);
    const mirrored = leftItems.map((item, index) => ({ ...item, uid: `mirror-${Date.now()}-${index}`, x: 100 - item.x, flipX: !item.flipX, z: item.z + 20 }));
    commit([...items.filter((item) => item.x < 50), ...mirrored]);
    setSelectedCanvasIds(mirrored.map((item) => item.uid));
  };
  const saveDraft = () => {
    window.localStorage.setItem("yuwu-workshop-draft", JSON.stringify({ items, style, savedAt: Date.now() }));
    notify("设计已保存到本机草稿。");
  };
  const finishWork = () => {
    window.localStorage.setItem("yuwu-finished-work", JSON.stringify({ items, style, finishedAt: Date.now() }));
    notify("作品已完成，并保存到“我的作品”。");
  };
  const stopCamera = () => {
    cameraStreamRef.current?.getTracks().forEach((track) => track.stop());
    cameraStreamRef.current = null;
  };
  const closePreview = () => {
    stopCamera();
    setPreviewing(false);
    setTryOnStep("choose");
    setCameraMessage("");
  };
  const openPreview = () => {
    setTryOnStep("choose");
    setCameraMessage("");
    setTryOnOffset({ x: 0, y: 0 });
    setTryOnPairScale(1);
    setPreviewing(true);
  };
  const startTryOn = () => {
    if (tryOnMethod === "upload") {
      uploadInputRef.current?.click();
      return;
    }
    if (tryOnMethod === "model") {
      setTryOnStep("model-picker");
      return;
    }
    setTryOnStep("result");
  };
  const uploadTryOnPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (uploadedPhoto) URL.revokeObjectURL(uploadedPhoto);
    setUploadedPhoto(URL.createObjectURL(file));
    setTryOnStep("result");
    event.target.value = "";
  };
  const beginTryOnJewelryDrag = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const stage = event.currentTarget.closest(".tryon-person-stage");
    if (!(stage instanceof HTMLElement)) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    tryOnDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseX: tryOnOffset.x,
      baseY: tryOnOffset.y,
      rect: stage.getBoundingClientRect(),
    };
    setDraggingTryOnJewelry(true);
  };
  const moveTryOnJewelry = (event: React.PointerEvent<HTMLSpanElement>) => {
    const drag = tryOnDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    const x = drag.baseX + ((event.clientX - drag.startX) / drag.rect.width) * 100;
    const y = drag.baseY + ((event.clientY - drag.startY) / drag.rect.height) * 100;
    setTryOnOffset({ x: Math.max(-38, Math.min(38, x)), y: Math.max(-38, Math.min(38, y)) });
  };
  const endTryOnJewelryDrag = (event: React.PointerEvent<HTMLSpanElement>) => {
    if (tryOnDragRef.current?.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    tryOnDragRef.current = null;
    setDraggingTryOnJewelry(false);
  };
  const nudgeSelected = (dxPixels: number, dyPixels: number) => {
    if (!selectedCanvasIds.length) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = (dxPixels / rect.width) * 100;
    const dy = (dyPixels / rect.height) * 100;
    commit(items.map((item) => selectedCanvasIds.includes(item.uid) && !item.locked ? { ...item, x: Math.max(3, Math.min(97, item.x + dx)), y: Math.max(5, Math.min(95, item.y + dy)) } : item));
  };
  const adjustLayer = (mode: "up" | "down" | "top" | "bottom") => {
    if (!selectedCanvasIds.length) return;
    const topZ = Math.max(0, ...items.map((item) => item.z));
    commit(items.map((item) => {
      if (!selectedCanvasIds.includes(item.uid) || item.locked) return item;
      if (mode === "up") return { ...item, z: item.z + 1 };
      if (mode === "down") return { ...item, z: Math.max(0, item.z - 1) };
      if (mode === "top") return { ...item, z: topZ + 1 };
      return { ...item, z: 0 };
    }));
  };
  const setSelectedLock = (locked: boolean) => {
    if (!selectedCanvasIds.length) return;
    commit(items.map((item) => selectedCanvasIds.includes(item.uid) ? { ...item, locked } : item));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.matches("input, textarea, select") || target?.isContentEditable) return;
      const key = event.key.toLowerCase();
      const command = event.ctrlKey || event.metaKey;

      if (event.key === "Escape") {
        if (previewing) closePreview();
        else setSelectedCanvasIds([]);
        return;
      }
      if (event.code === "Space" && !command) {
        event.preventDefault();
        openPreview();
        return;
      }
      if (command && key === "z") {
        event.preventDefault();
        if (event.shiftKey) redo(); else undo();
        return;
      }
      if (command && key === "c") { event.preventDefault(); copySelected(); return; }
      if (command && key === "v") { event.preventDefault(); pasteClipboard(); return; }
      if (command && key === "a") { event.preventDefault(); setSelectedCanvasIds(items.map((item) => item.uid)); return; }
      if (command && key === "s") { event.preventDefault(); saveDraft(); return; }
      if (command && key === "l") { event.preventDefault(); setSelectedLock(!event.shiftKey); return; }
      if (command && event.code === "BracketRight") { event.preventDefault(); adjustLayer(event.shiftKey ? "top" : "up"); return; }
      if (command && event.code === "BracketLeft") { event.preventDefault(); adjustLayer(event.shiftKey ? "bottom" : "down"); return; }
      if (command && (event.key === "+" || event.key === "=")) { event.preventDefault(); patchSelected({ scale: Math.min(2, (selectedCanvasItem?.scale ?? 1) + .1) }); return; }
      if (command && event.key === "-") { event.preventDefault(); patchSelected({ scale: Math.max(.4, (selectedCanvasItem?.scale ?? 1) - .1) }); return; }
      if (command && event.key === "0") { event.preventDefault(); patchSelected({ scale: 1 }); return; }
      if (event.key === "Delete" || event.key === "Backspace") { event.preventDefault(); deleteSelected(); return; }
      if (!command && !event.altKey && key === "h") { event.preventDefault(); patchSelected({ flipX: !selectedCanvasItem?.flipX }); return; }
      if (!command && !event.altKey && key === "v") { event.preventDefault(); patchSelected({ flipY: !selectedCanvasItem?.flipY }); return; }
      if (event.shiftKey && event.key === "ArrowRight") { event.preventDefault(); patchSelected({ rotation: (selectedCanvasItem?.rotation ?? 0) + 15 }); return; }
      if (event.shiftKey && event.key === "ArrowLeft") { event.preventDefault(); patchSelected({ rotation: (selectedCanvasItem?.rotation ?? 0) - 15 }); return; }
      if (event.shiftKey && event.key === "ArrowUp") { event.preventDefault(); nudgeSelected(0, -10); return; }
      if (event.shiftKey && event.key === "ArrowDown") { event.preventDefault(); nudgeSelected(0, 10); return; }
      if (event.key === "ArrowUp") { event.preventDefault(); nudgeSelected(0, -1); return; }
      if (event.key === "ArrowDown") { event.preventDefault(); nudgeSelected(0, 1); return; }
      if (event.key === "ArrowLeft") { event.preventDefault(); nudgeSelected(-1, 0); return; }
      if (event.key === "ArrowRight") { event.preventDefault(); nudgeSelected(1, 0); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [items, selectedCanvasIds, selectedCanvasItem, undoStack, redoStack, previewing, style]);

  useEffect(() => {
    if (!previewing || tryOnStep !== "result" || tryOnMethod !== "camera") {
      stopCamera();
      return;
    }
    let cancelled = false;
    setCameraMessage("正在等待摄像头授权…");
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraMessage("当前浏览器不支持摄像头试戴，请选择上传照片或模特试戴。");
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false }).then((stream) => {
      if (cancelled) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      cameraStreamRef.current = stream;
      if (cameraVideoRef.current) {
        cameraVideoRef.current.srcObject = stream;
        cameraVideoRef.current.play().catch(() => undefined);
      }
      setCameraMessage("");
    }).catch(() => setCameraMessage("无法开启摄像头，请检查浏览器权限后重试。"));
    return () => {
      cancelled = true;
      stopCamera();
    };
  }, [previewing, tryOnStep, tryOnMethod]);

  useEffect(() => () => {
    if (uploadedPhoto) URL.revokeObjectURL(uploadedPhoto);
  }, [uploadedPhoto]);
  return (
    <section className="workshop-view">
      <header className="workshop-heading"><button onClick={onBack}>← 返回首页</button><div><h1>春日琉璃耳饰</h1><p>当前风格：{style}　·　已自动保存</p></div><span>推荐配件：9 件</span></header>
      <div className="workshop-grid">
        <aside className="material-panel paper-panel">
          <h2>按风格选素材</h2><div className="style-row">{["复古风", "多巴胺风", "民族风", "极简风", "布艺风", "新中式"].map((item) => <button key={item} className={style === item ? "selected" : ""} onClick={() => setStyle(item)}>{item}</button>)}</div>
          <h3>推荐配件</h3><div className="material-tabs">{tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}</div>
          <div className="material-grid">{visible.map((item) => <button key={item.id} draggable className={selectedId === item.id ? "selected" : ""} title="拖到中间画布，或双击快速添加" onDragStart={(event) => event.dataTransfer.setData("material/id", item.id)} onClick={() => setSelectedId(item.id)} onDoubleClick={() => addMaterial(item.id, 50, 48)}><img src={item.image} alt={item.name} /><span>{item.name}</span></button>)}</div>
          <button className="inspiration-link">灵感库 · 查看复古风作品</button>
        </aside>
        <main className="canvas-panel paper-panel">
          <div className="ear-labels"><span>左耳</span><span>右耳</span></div>
          <div ref={canvasRef} className="canvas-pair interactive-canvas" onPointerDown={beginSelection} onPointerMove={moveSelection} onPointerUp={endSelection} onPointerCancel={endSelection} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const id = event.dataTransfer.getData("material/id") as CanvasItem["materialId"]; const rect = event.currentTarget.getBoundingClientRect(); if (id) addMaterial(id, ((event.clientX - rect.left) / rect.width) * 100, ((event.clientY - rect.top) / rect.height) * 100); }}>
            {items.map((item) => {
              const material = materials.find((entry) => entry.id === item.materialId) ?? materials[0];
              return <button key={item.uid} className={`canvas-item${selectedCanvasIds.includes(item.uid) ? " selected" : ""}${item.locked ? " locked" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%`, zIndex: item.z, opacity: item.opacity, transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale}) scaleX(${item.flipX ? -1 : 1}) scaleY(${item.flipY ? -1 : 1})` }} onPointerDown={(event) => beginMove(event, item)} onPointerMove={moveItem} onPointerUp={endMove} onPointerCancel={endMove} aria-label={`${material.name}，拖动调整位置`}><img src={material.image} alt={material.name} style={{ filter: `drop-shadow(0 5px 5px rgba(86,58,32,.14)) hue-rotate(${item.hue}deg)` }} /></button>;
            })}
            {selectedCanvasItem && !selectedCanvasItem.locked && <div className="selection-controls" role="group" aria-label="选中配件快捷编辑框" style={{ left: `${selectedCanvasItem.x}%`, top: `${selectedCanvasItem.y}%`, width: `${86 * selectedCanvasItem.scale}px`, height: `${86 * selectedCanvasItem.scale}px`, zIndex: selectedCanvasItem.z + 100, transform: `translate(-50%, -50%) rotate(${selectedCanvasItem.rotation}deg)` }} onPointerDown={(event) => beginMove(event, selectedCanvasItem)} onPointerMove={moveItem} onPointerUp={endMove} onPointerCancel={endMove}>
              <span className="direct-handle rotate-handle" title="拖动旋转" aria-label="拖动旋转" onPointerDown={(event) => beginTransform(event, "rotate", selectedCanvasItem)} onPointerMove={transformItem} onPointerUp={endTransform} onPointerCancel={endTransform}>↻</span>
              <span className="direct-handle scale-handle" title="拖动缩放" aria-label="拖动缩放" onPointerDown={(event) => beginTransform(event, "scale", selectedCanvasItem)} onPointerMove={transformItem} onPointerUp={endTransform} onPointerCancel={endTransform}>↘</span>
            </div>}
            {selectionBox && <span className="selection-marquee" style={{ left: `${Math.min(selectionBox.x1, selectionBox.x2)}%`, top: `${Math.min(selectionBox.y1, selectionBox.y2)}%`, width: `${Math.abs(selectionBox.x2 - selectionBox.x1)}%`, height: `${Math.abs(selectionBox.y2 - selectionBox.y1)}%` }} />}
            <p className="canvas-tip">方向键移动 · Shift+左右旋转 · Ctrl+Z 撤销 · Space 预览</p>
          </div>
          <div className="canvas-footer"><span>画布 75%</span><div>最近使用 {materials.slice(0, 5).map((item) => <img key={item.id} src={item.image} alt={item.name} />)}</div></div>
        </main>
        <aside className="tool-panel paper-panel">
          <h2>编辑工具</h2>
          <div className="undo-row"><button disabled={!undoStack.length} onClick={undo} title="Ctrl + Z">↶ 撤销</button><button disabled={!redoStack.length} onClick={redo} title="Ctrl + Shift + Z">↷ 重做</button></div>
          <div className="tool-buttons"><button className="active">选择</button><button onClick={() => selectedCanvasItem && patchSelected({ y: Math.max(5, selectedCanvasItem.y - 3) })}>上移</button><button onClick={() => selectedCanvasItem && patchSelected({ rotation: selectedCanvasItem.rotation + 15 })}>旋转</button><button onClick={() => selectedCanvasItem && patchSelected({ scale: Math.min(2, selectedCanvasItem.scale + .1) })}>放大</button></div>
          <div className="selected-material">
            <p>当前选中{selectedCanvasIds.length > 1 ? ` · ${selectedCanvasIds.length} 件` : ""}</p>
            <div><img src={selectedCanvasMaterial.image} alt={selectedCanvasMaterial.name} style={{ filter: `hue-rotate(${selectedCanvasItem?.hue ?? 0}deg)` }} /><strong>{selectedCanvasMaterial.name}</strong></div>
            {selectedCanvasItem ? <>
              <button className="replace-button" onClick={replaceSelected}>替换为：{selectedMaterial.name}</button>
              <label>位置 <span>X {Math.round(selectedCanvasItem.x)}　Y {Math.round(selectedCanvasItem.y)}</span></label>
              <label className="range-label">大小 <input type="range" min="40" max="200" value={Math.round(selectedCanvasItem.scale * 100)} onChange={(event) => patchSelected({ scale: Number(event.target.value) / 100 })} /><span>{Math.round(selectedCanvasItem.scale * 100)}%</span></label>
              <label className="range-label">旋转 <input type="range" min="-180" max="180" value={selectedCanvasItem.rotation} onChange={(event) => patchSelected({ rotation: Number(event.target.value) })} /><span>{selectedCanvasItem.rotation}°</span></label>
              <label className="range-label">透明度 <input type="range" min="20" max="100" value={Math.round(selectedCanvasItem.opacity * 100)} onChange={(event) => patchSelected({ opacity: Number(event.target.value) / 100 })} /><span>{Math.round(selectedCanvasItem.opacity * 100)}%</span></label>
              {selectedCanvasMaterial.type === "珠子" && <label className="range-label color-range">颜色 <input aria-label="调整珠子颜色" type="range" min="-180" max="180" value={selectedCanvasItem.hue} onChange={(event) => patchSelectedBeads({ hue: Number(event.target.value) })} /><span>{selectedCanvasItem.hue === 0 ? "原色" : `${selectedCanvasItem.hue}°`}</span></label>}
            </> : <p>请先选择画布上的配件</p>}
          </div>
          <div className="tool-section"><h3>图层调整</h3><div className="tool-buttons"><button onClick={() => adjustLayer("up")} title="Ctrl + ]">上移</button><button onClick={() => adjustLayer("down")} title="Ctrl + [">下移</button><button onClick={() => adjustLayer("top")} title="Ctrl + Shift + ]">置顶</button><button onClick={() => adjustLayer("bottom")} title="Ctrl + Shift + [">置底</button></div></div>
          <div className="tool-section"><h3>操作</h3><div className="tool-buttons"><button onClick={duplicateSelected} title="Ctrl + C / Ctrl + V">复制</button><button onClick={mirrorRightEar} title="镜像生成右耳">镜像</button><button onClick={() => setSelectedLock(!selectedCanvasItem?.locked)} title="Ctrl + L / Ctrl + Shift + L">{selectedCanvasItem?.locked ? "解锁" : "锁定"}</button><button className="danger" onClick={deleteSelected} title="Delete / Backspace">删除</button></div></div>
          <div className="completion-actions"><button className="secondary-button" onClick={saveDraft} title="Ctrl + S">保存草稿</button><button className="primary-button" onClick={finishWork}>完成作品</button></div>
          <button className="secondary-button preview-button" onClick={openPreview} title="Space">试戴预览</button>
        </aside>
      </div>
      {previewing && <div className="preview-overlay" role="dialog" aria-modal="true" aria-label="选择试戴方式" onClick={closePreview}>
        <div className={`preview-stage tryon-stage ${tryOnStep === "choose" ? "tryon-choice-stage" : tryOnStep === "model-picker" ? "tryon-template-stage" : "tryon-result-stage"}`} onClick={(event) => event.stopPropagation()}>
          <button className="preview-close" onClick={closePreview} aria-label="退出预览">×</button>
          <input ref={uploadInputRef} className="tryon-file-input" type="file" accept="image/*" onChange={uploadTryOnPhoto} />
          {tryOnStep === "choose" ? <>
            <div className="tryon-step-label"><b>1</b><span>选择试戴方式</span></div>
            <h2>选择试戴方式</h2>
            <p className="tryon-subtitle">选择你的试戴方式</p>
            <div className="tryon-methods">
              <button className={tryOnMethod === "upload" ? "selected" : ""} onClick={() => setTryOnMethod("upload")}>
                <span className="tryon-method-photo upload-photo" aria-hidden="true" /><strong>上传照片试戴</strong><small>上传清晰正面照片</small><i>图片</i>
              </button>
              <button className={tryOnMethod === "camera" ? "selected" : ""} onClick={() => setTryOnMethod("camera")}>
                <span className="tryon-method-photo camera-photo" aria-hidden="true" /><strong>摄像头实时试戴</strong><small>打开摄像头实时预览</small><i>相机</i>
              </button>
              <button className={tryOnMethod === "model" ? "selected" : ""} onClick={() => setTryOnMethod("model")}>
                <span className="tryon-method-photo model-photo" aria-hidden="true" /><strong>模特效果试戴</strong><small>快速查看佩戴效果</small><i>闪光</i>
              </button>
            </div>
            <button className="primary-button tryon-next" onClick={startTryOn}>下一步</button>
          </> : tryOnStep === "model-picker" ? <>
            <div className="tryon-step-label"><b>2</b><span>选择试戴人物模板</span></div>
            <div className="model-picker-heading"><button onClick={() => setTryOnStep("choose")}>← 返回试戴方式</button><div><h2>选择试戴人物模板</h2><p>选择喜欢的风格和模特照片</p></div><span /></div>
            <div className="model-style-tabs">
              {(Object.keys(modelTemplates) as ModelStyle[]).map((styleName) => <button key={styleName} className={modelStyle === styleName ? "selected" : ""} onClick={() => { setModelStyle(styleName); setSelectedModelImage(modelTemplates[styleName][0]); }}>{styleName}</button>)}
            </div>
            <div className="model-template-grid">
              {modelTemplates[modelStyle].map((image, index) => <button key={image} className={selectedModelImage === image ? "selected" : ""} onClick={() => setSelectedModelImage(image)} aria-label={`选择${modelStyle}人物模板${index + 1}`}>
                <img src={image} alt={`${modelStyle}人物模板 ${index + 1}`} /><span>模板 {index + 1}</span>
              </button>)}
            </div>
            <button className="primary-button model-template-confirm" onClick={() => { setTryOnOffset({ x: 0, y: 0 }); setTryOnPairScale(1); setTryOnStep("result"); }}>使用此模板试戴</button>
          </> : <>
            <div className="tryon-result-heading"><button onClick={() => { stopCamera(); setTryOnStep(tryOnMethod === "model" ? "model-picker" : "choose"); }}>← 返回选择</button><div><h2>{tryOnMethod === "upload" ? "上传照片试戴" : tryOnMethod === "camera" ? "摄像头实时试戴" : "模特效果试戴"}</h2><p>春日琉璃耳饰 · 实时佩戴效果</p></div><span /></div>
            <div className={`tryon-person-stage ${tryOnMethod}`}>
              {tryOnMethod === "upload" && uploadedPhoto && <img className="tryon-person-media" src={uploadedPhoto} alt="上传的试戴照片" />}
              {tryOnMethod === "camera" && <video ref={cameraVideoRef} className="tryon-person-media camera-video" autoPlay muted playsInline />}
              {tryOnMethod === "model" && <>
                <img className="tryon-model-backdrop" src={selectedModelImage} alt="" aria-hidden="true" />
                <img className="tryon-person-media tryon-model-media" src={selectedModelImage} alt={`${modelStyle}试戴模特`} />
              </>}
              {cameraMessage && <p className="camera-message">{cameraMessage}</p>}
              <div className={`tryon-jewelry-layer ${draggingTryOnJewelry ? "dragging" : ""}`} aria-label="耳饰佩戴效果" style={{ transform: `translate(${tryOnOffset.x}%, ${tryOnOffset.y}%)` }}>
                {items.map((item) => {
                  const material = materials.find((entry) => entry.id === item.materialId) ?? materials[0];
                  const trialX = item.x < 50 ? 34 + (item.x - 25) * .42 * tryOnPairScale : 66 + (item.x - 75) * .42 * tryOnPairScale;
                  const trialY = 35 + (item.y - 17) * .72 * tryOnPairScale;
                  return <span key={item.uid} onPointerDown={beginTryOnJewelryDrag} onPointerMove={moveTryOnJewelry} onPointerUp={endTryOnJewelryDrag} onPointerCancel={endTryOnJewelryDrag} style={{ left: `${trialX}%`, top: `${trialY}%`, zIndex: item.z, opacity: item.opacity, transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale * .72 * tryOnPairScale}) scaleX(${item.flipX ? -1 : 1}) scaleY(${item.flipY ? -1 : 1})` }}><img src={material.image} alt="" draggable={false} style={{ filter: `drop-shadow(0 5px 5px rgba(86,58,32,.2)) hue-rotate(${item.hue}deg)` }} /></span>;
                })}
              </div>
              <p className="tryon-drag-hint">拖动任意一颗珠子，整副耳饰会一起移动</p>
            </div>
            <div className="tryon-size-control" aria-label="调整整副耳饰大小">
              <strong>耳饰大小</strong>
              <button onClick={() => setTryOnPairScale((scale) => Math.max(.5, Number((scale - .1).toFixed(1))))} aria-label="缩小整副耳饰">−</button>
              <input type="range" min="50" max="180" value={Math.round(tryOnPairScale * 100)} onChange={(event) => setTryOnPairScale(Number(event.target.value) / 100)} aria-label="耳饰大小" />
              <button onClick={() => setTryOnPairScale((scale) => Math.min(1.8, Number((scale + .1).toFixed(1))))} aria-label="放大整副耳饰">＋</button>
              <span>{Math.round(tryOnPairScale * 100)}%</span>
            </div>
            <div className="tryon-result-actions">
              {tryOnMethod === "upload" && <button className="secondary-button" onClick={() => uploadInputRef.current?.click()}>更换照片</button>}
              {tryOnMethod === "camera" && <button className="secondary-button" onClick={() => { stopCamera(); setTryOnStep("choose"); window.setTimeout(() => { setTryOnMethod("camera"); setTryOnStep("result"); }, 0); }}>重新授权摄像头</button>}
              {tryOnMethod === "model" && <button className="secondary-button" onClick={() => setTryOnStep("model-picker")}>更换人物模板</button>}
              {(tryOnOffset.x !== 0 || tryOnOffset.y !== 0 || tryOnPairScale !== 1) && <button className="secondary-button" onClick={() => { setTryOnOffset({ x: 0, y: 0 }); setTryOnPairScale(1); }}>恢复默认位置与大小</button>}
              <button className="primary-button" onClick={() => { notify("试戴效果已保存。"); closePreview(); }}>保存试戴效果</button>
            </div>
          </>}
        </div>
      </div>}
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState<PageName>("首页");
  const [notice, setNotice] = useState("");
  const notify = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2600); };
  const navigate = (name: string, ready: boolean) => ready ? setPage(name as PageName) : notify(`${name}将在后续版本开放。`);
  const pageContent = page === "首页"
    ? <Home onStart={() => setPage("创作工坊")} notify={notify} />
    : page === "我的素材"
      ? <MyMaterials onAddToCraft={(material) => { notify(`已将「${material.name}」加入创作工坊`); setPage("创作工坊"); }} notify={notify} />
      : page === "我的作品"
        ? <MyWorks
            onContinueEdit={(work, creationType) => {
              notify(work ? `继续编辑「${work.name}」` : `开始创作${creationType ?? "新作品"}`);
              setPage("创作工坊");
            }}
            onPlaceDesktop={(work) => notify(`已将「${work.name}」加入桌面布置`)}
            onPublishToMarket={(work) => {
              window.sessionStorage.setItem("yuwu-market-publish-work", JSON.stringify(work));
              setPage("与物市集");
            }}
            notify={notify}
          />
        : page === "桌面布置"
          ? <DesktopLayout notify={notify} />
        : page === "灵感广场"
          ? <InspirationSquare
              notify={notify}
              onUseMaterials={(artwork) => {
                window.sessionStorage.setItem("yuwu-inspiration-craft", JSON.stringify(artwork));
                notify(`已载入「${artwork.name}」的同款素材`);
                setPage("创作工坊");
              }}
              onAddToDesktop={(artwork) => {
                window.sessionStorage.setItem("yuwu-inspiration-desktop", JSON.stringify(artwork));
                notify(`已将「${artwork.name}」加入桌面作品库`);
                setPage("桌面布置");
              }}
            />
        : page === "与物市集"
          ? <MarketPlace
              notify={notify}
              onUseMaterials={(artwork) => {
                window.sessionStorage.setItem("yuwu-market-craft", JSON.stringify(artwork));
                notify(`已载入「${artwork.name}」的同款素材`);
                setPage("创作工坊");
              }}
              onAddToDesktop={(artwork) => {
                window.sessionStorage.setItem("yuwu-market-desktop", JSON.stringify(artwork));
                notify(`已将「${artwork.name}」加入桌面作品库`);
                setPage("桌面布置");
              }}
            />
        : <Workshop onBack={() => setPage("首页")} notify={notify} />;
  return (
    <main className={`app-shell ${page === "创作工坊" ? "workshop-mode" : "home-mode"}`}>
      <Topbar onHome={() => setPage("首页")} />
      <div className="app-layout"><Sidebar active={page} onNavigate={navigate} />{pageContent}</div>
      {notice && <div className="toast" role="status">{notice}</div>}
    </main>
  );
}
