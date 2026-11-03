export const materialCategories = ["全部", "耳饰", "手串项链", "插花", "豆荚娃娃", "风铃", "幻想生物", "纽扣布艺", "画作相框"] as const;

export const materialSources = ["系统推荐素材", "用户收藏素材", "创作使用素材"] as const;

export type MaterialCategory = Exclude<(typeof materialCategories)[number], "全部">;
export type MaterialSource = (typeof materialSources)[number];

export type LibraryMaterial = {
  id: string;
  name: string;
  category: MaterialCategory;
  material: string;
  image: string;
  source: MaterialSource;
  usageCount: number;
  favorite: boolean;
};

export const materialLibrary: LibraryMaterial[] = [
  { id: "blue-crystal-bead", name: "蓝色水晶珠", category: "耳饰", material: "切面水晶", image: "/yuwu/materials/earrings/aqua-crystal.png", source: "创作使用素材", usageCount: 18, favorite: true },
  { id: "white-pearl", name: "白色珍珠", category: "耳饰", material: "仿天然珍珠", image: "/yuwu/materials/earrings/cream-pearl.png", source: "用户收藏素材", usageCount: 26, favorite: true },
  { id: "turquoise-bead", name: "绿松石珠", category: "手串项链", material: "绿松石", image: "/yuwu/materials/earrings/green-jade-bead.png", source: "系统推荐素材", usageCount: 9, favorite: false },
  { id: "baroque-blue", name: "湖蓝巴洛克珠", category: "手串项链", material: "琉璃", image: "/yuwu/materials/earrings/blue-baroque-pearl.png", source: "系统推荐素材", usageCount: 12, favorite: false },
  { id: "white-hydrangea", name: "白色绣球", category: "插花", material: "永生花", image: "/yuwu/ui/craft-flowers.png", source: "用户收藏素材", usageCount: 15, favorite: true },
  { id: "blue-flower", name: "蓝色小花", category: "插花", material: "手工绢花", image: "/yuwu/materials/earrings/gold-flower-connector.png", source: "系统推荐素材", usageCount: 8, favorite: false },
  { id: "leaf-branch", name: "枝叶", category: "插花", material: "干燥植物", image: "/yuwu/materials/earrings/green-crackle-crystal.png", source: "创作使用素材", usageCount: 21, favorite: false },
  { id: "fabric-bow", name: "蝴蝶结", category: "纽扣布艺", material: "棉麻织物", image: "/yuwu/ui/craft-fabric.png", source: "用户收藏素材", usageCount: 17, favorite: true },
  { id: "fabric-decoration", name: "布料装饰", category: "纽扣布艺", material: "印花棉布", image: "/yuwu/ui/craft-fabric.png", source: "创作使用素材", usageCount: 11, favorite: false },
  { id: "gold-tassel", name: "镀金流苏", category: "风铃", material: "镀金铜", image: "/yuwu/materials/earrings/gold-chain-tassel.png", source: "创作使用素材", usageCount: 28, favorite: true },
  { id: "shell-flower", name: "贝壳花挂件", category: "风铃", material: "贝壳与黄铜", image: "/yuwu/materials/earrings/gold-flower-connector.png", source: "系统推荐素材", usageCount: 14, favorite: false },
  { id: "wood-drop", name: "原木水滴", category: "风铃", material: "胡桃木", image: "/yuwu/materials/earrings/wood-teardrop.png", source: "用户收藏素材", usageCount: 10, favorite: true },
  { id: "botanical-frame", name: "植物小画框", category: "画作相框", material: "原木与纸艺", image: "/yuwu/ui/craft-frame.png", source: "系统推荐素材", usageCount: 7, favorite: false },
  { id: "pea-ornament", name: "豆荚桌面摆件", category: "豆荚娃娃", material: "软陶", image: "/yuwu/ui/craft-pea.png", source: "创作使用素材", usageCount: 19, favorite: false },
  { id: "sun-creature", name: "太阳幻想生物", category: "幻想生物", material: "树脂与布艺", image: "/yuwu/ui/craft-creature.png", source: "系统推荐素材", usageCount: 13, favorite: true },
  { id: "pea-spirit", name: "豆荚精灵", category: "豆荚娃娃", material: "软陶与毛毡", image: "/yuwu/ui/craft-pea.png", source: "用户收藏素材", usageCount: 22, favorite: true },
];
