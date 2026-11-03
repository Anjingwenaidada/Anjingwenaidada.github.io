export const desktopCategories = [
  "耳饰",
  "手串项链",
  "插花",
  "豆荚娃娃",
  "风铃",
  "幻想生物",
  "纽扣布艺",
  "画作相框",
] as const;

export type DesktopCategory = (typeof desktopCategories)[number];
export type ArtworkSource = "我的创作" | "收藏作品" | "交换获得" | "推荐作品";

export type DesktopStyle = {
  id: string;
  name: string;
  description: string;
  image: string;
  recommendation: string;
};

export const desktopStyles: DesktopStyle[] = [
  {
    id: "warm-desk",
    name: "温馨书桌",
    description: "柔和奶油色与木质陈列，让作品像被好好收藏在生活里。",
    image: "/yuwu/desktop/backgrounds/warm-desk.png",
    recommendation: "适合花艺、画作相框与珍珠饰品",
  },
  {
    id: "japanese-healing",
    name: "日系治愈",
    description: "清爽留白与浅木色层板，适合轻盈、安静的小物组合。",
    image: "/yuwu/desktop/backgrounds/japanese-healing.png",
    recommendation: "适合极简耳饰、风铃与浅色手串",
  },
  {
    id: "oriental-room",
    name: "东方雅居",
    description: "留白与深木质结合，适合摆放东方手作作品。",
    image: "/yuwu/desktop/backgrounds/oriental-room.png",
    recommendation: "适合新中式耳饰、风铃与画作相框",
  },
  {
    id: "forest-nature",
    name: "森系自然",
    description: "自然光影、枝叶与原木陈列，让手作拥有呼吸感。",
    image: "/yuwu/desktop/backgrounds/forest-nature.png",
    recommendation: "适合插花、豆荚娃娃与幻想生物",
  },
  {
    id: "creative-workbench",
    name: "创意工作台",
    description: "洞洞板与开放层架，适合自由组合丰富的创作收藏。",
    image: "/yuwu/desktop/backgrounds/creative-workbench.png",
    recommendation: "适合多件饰品、布艺与创作工具",
  },
];

export type DesktopArtwork = {
  id: string;
  name: string;
  category: DesktopCategory;
  source: ArtworkSource;
  image: string;
};

export const desktopArtworks: DesktopArtwork[] = [
  { id: "spring-earrings", name: "春日琉璃耳饰", category: "耳饰", source: "我的创作", image: "/yuwu/ui/craft-earrings.png" },
  { id: "lake-earrings", name: "湖蓝珍珠耳饰", category: "耳饰", source: "收藏作品", image: "/yuwu/ui/craft-earrings.png" },
  { id: "pearl-bracelet", name: "珍珠手链", category: "手串项链", source: "我的创作", image: "/yuwu/ui/craft-bracelet.png" },
  { id: "turquoise-necklace", name: "绿松石项链", category: "手串项链", source: "交换获得", image: "/yuwu/ui/craft-bracelet.png" },
  { id: "ocean-flowers", name: "海洋蓝花束", category: "插花", source: "我的创作", image: "/yuwu/ui/craft-flowers.png" },
  { id: "white-hydrangea", name: "白绣球花瓶", category: "插花", source: "推荐作品", image: "/yuwu/ui/craft-flowers.png" },
  { id: "pea-doll", name: "春芽豆荚娃娃", category: "豆荚娃娃", source: "收藏作品", image: "/yuwu/ui/craft-pea.png" },
  { id: "vintage-wind", name: "复古风铃", category: "风铃", source: "我的创作", image: "/yuwu/ui/craft-wind.png" },
  { id: "forest-creature", name: "森林幻想生物", category: "幻想生物", source: "我的创作", image: "/yuwu/ui/craft-creature.png" },
  { id: "star-creature", name: "星光幻想生物", category: "幻想生物", source: "收藏作品", image: "/yuwu/ui/craft-creature.png" },
  { id: "fabric-bear", name: "布艺小熊", category: "纽扣布艺", source: "我的创作", image: "/yuwu/ui/craft-fabric.png" },
  { id: "plant-frame", name: "夏日植物画框", category: "画作相框", source: "我的创作", image: "/yuwu/ui/craft-frame.png" },
];

export type DesktopCanvasItem = {
  uid: string;
  productId: string;
  source: ArtworkSource;
  image: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
};

export type DesktopLayoutData = {
  id: string;
  style: string;
  background: string;
  items: DesktopCanvasItem[];
  updatedAt: string;
};
