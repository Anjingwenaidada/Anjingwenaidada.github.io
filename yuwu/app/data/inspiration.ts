export const inspirationCategories = [
  "全部",
  "耳饰",
  "手串项链",
  "插花",
  "豆荚娃娃",
  "风铃",
  "挂绳",
  "纽扣布艺",
  "画作相框",
] as const;

export const inspirationStyles = ["全部", "清新自然", "新中式", "复古", "日系", "极简", "民族风", "多巴胺"] as const;
export const inspirationMaterials = ["全部", "珍珠", "水晶", "琉璃", "金属", "木质"] as const;
export const inspirationColors = ["全部", "蓝色", "白色", "粉色", "绿色", "金色"] as const;
export const inspirationSorts = ["热门推荐", "最新发布", "收藏最多"] as const;

export type InspirationCategory = Exclude<(typeof inspirationCategories)[number], "全部">;
export type InspirationStyle = Exclude<(typeof inspirationStyles)[number], "全部">;
export type InspirationMaterial = Exclude<(typeof inspirationMaterials)[number], "全部">;
export type InspirationColor = Exclude<(typeof inspirationColors)[number], "全部">;

export type InspirationArtwork = {
  id: string;
  name: string;
  category: InspirationCategory;
  author: string;
  image: string;
  tags: string[];
  materials: string[];
  materialTypes: InspirationMaterial[];
  style: InspirationStyle;
  colors: InspirationColor[];
  favoriteCount: number;
  source: "灵感广场" | "与物市集" | "盲盒交换";
  publishedAt: string;
  description: string;
};

export type Favorite = {
  userId: string;
  artworkId: string;
  createTime: string;
  source: "自己收藏的作品" | "灵感收藏" | "桌面使用记录";
};

export const inspirationArtworks: InspirationArtwork[] = [
  {
    id: "spring-pearl-earrings",
    name: "春日珍珠耳饰",
    category: "耳饰",
    author: "小林手作",
    image: "/yuwu/ui/craft-earrings.png",
    tags: ["清新", "珍珠", "蓝色"],
    materials: ["复古耳钩", "蓝色水晶珠", "白色珍珠", "银色连接件"],
    materialTypes: ["珍珠", "水晶", "金属"],
    style: "清新自然",
    colors: ["蓝色", "白色"],
    favoriteCount: 128,
    source: "灵感广场",
    publishedAt: "2026-08-05",
    description: "把雨后天空的蓝与奶油珍珠串在一起，适合安静的春日穿搭。",
  },
  {
    id: "ocean-blue-drops",
    name: "海洋风耳坠",
    category: "耳饰",
    author: "拾光珠宝铺",
    image: "/yuwu/ui/craft-earrings.png",
    tags: ["海洋", "琉璃", "轻盈"],
    materials: ["金色耳钩", "湖蓝琉璃珠", "贝壳花片", "珍珠吊坠"],
    materialTypes: ["琉璃", "珍珠", "金属"],
    style: "日系",
    colors: ["蓝色", "金色"],
    favoriteCount: 246,
    source: "与物市集",
    publishedAt: "2026-08-02",
    description: "透明湖蓝像被阳光照亮的海面，细小金属件增加温暖光泽。",
  },
  {
    id: "oriental-jade-earrings",
    name: "新中式青玉耳饰",
    category: "耳饰",
    author: "山月造物",
    image: "/yuwu/ui/craft-earrings.png",
    tags: ["新中式", "青玉", "留白"],
    materials: ["青玉圆珠", "镀金连接环", "叶片挂件"],
    materialTypes: ["金属", "琉璃"],
    style: "新中式",
    colors: ["绿色", "金色"],
    favoriteCount: 319,
    source: "灵感广场",
    publishedAt: "2026-07-28",
    description: "以一颗青玉圆珠和叶片完成东方留白，轻盈又有古意。",
  },
  {
    id: "pearl-garden-bracelet",
    name: "珍珠花园手串",
    category: "手串项链",
    author: "棉花糖手记",
    image: "/yuwu/ui/craft-bracelet.png",
    tags: ["珍珠", "花朵", "温柔"],
    materials: ["奶油珍珠", "粉色琉璃珠", "小花隔片", "弹力线"],
    materialTypes: ["珍珠", "琉璃"],
    style: "清新自然",
    colors: ["白色", "粉色"],
    favoriteCount: 187,
    source: "灵感广场",
    publishedAt: "2026-08-01",
    description: "像把一圈小花园戴在手腕上，适合浅色系日常搭配。",
  },
  {
    id: "dopamine-necklace",
    name: "果糖多巴胺项链",
    category: "手串项链",
    author: "三颗豆工作室",
    image: "/yuwu/ui/craft-bracelet.png",
    tags: ["多巴胺", "彩色", "元气"],
    materials: ["彩色水晶珠", "金色隔片", "爱心挂件"],
    materialTypes: ["水晶", "金属"],
    style: "多巴胺",
    colors: ["粉色", "绿色", "金色"],
    favoriteCount: 156,
    source: "与物市集",
    publishedAt: "2026-07-31",
    description: "高明度小珠像糖果一样排列，给工作日补充一点元气。",
  },
  {
    id: "morning-hydrangea",
    name: "清晨绣球花瓶",
    category: "插花",
    author: "一隅花房",
    image: "/yuwu/ui/craft-flowers.png",
    tags: ["绣球", "晨光", "治愈"],
    materials: ["白色绣球", "蓝色小花", "枝叶", "湖蓝花瓶"],
    materialTypes: ["木质"],
    style: "日系",
    colors: ["蓝色", "白色", "绿色"],
    favoriteCount: 402,
    source: "灵感广场",
    publishedAt: "2026-08-04",
    description: "留出枝叶呼吸的空间，让花束像刚从清晨花园里采回来。",
  },
  {
    id: "sunset-pea-doll",
    name: "夕阳豆荚娃娃",
    category: "豆荚娃娃",
    author: "豆豆造物局",
    image: "/yuwu/ui/craft-pea.png",
    tags: ["可爱", "自然", "陪伴"],
    materials: ["豆荚本体", "树脂眼睛", "毛绒头发", "星星挂件"],
    materialTypes: ["木质"],
    style: "清新自然",
    colors: ["绿色", "金色"],
    favoriteCount: 275,
    source: "盲盒交换",
    publishedAt: "2026-07-30",
    description: "小小豆荚装进夕阳色挂件，是会安静陪伴桌面的朋友。",
  },
  {
    id: "vintage-bell",
    name: "旧时光木质风铃",
    category: "风铃",
    author: "木与风",
    image: "/yuwu/ui/craft-wind.png",
    tags: ["复古", "木质", "风铃"],
    materials: ["黄铜铃铛", "原木水滴", "棉麻挂绳"],
    materialTypes: ["木质", "金属"],
    style: "复古",
    colors: ["金色", "绿色"],
    favoriteCount: 213,
    source: "灵感广场",
    publishedAt: "2026-07-27",
    description: "木质水滴与黄铜铃铛在微风里轻轻碰撞，留下温暖旧时光。",
  },
  {
    id: "cloud-phone-strap",
    name: "云朵琉璃挂绳",
    category: "挂绳",
    author: "小满编织",
    image: "/yuwu/ui/craft-wind.png",
    tags: ["挂绳", "琉璃", "天空"],
    materials: ["蓝色琉璃珠", "透明水晶", "编织绳", "金属扣"],
    materialTypes: ["琉璃", "水晶", "金属"],
    style: "极简",
    colors: ["蓝色", "白色"],
    favoriteCount: 96,
    source: "与物市集",
    publishedAt: "2026-08-03",
    description: "以透明层次模拟云朵和天空，挂在手机或钥匙上都很轻盈。",
  },
  {
    id: "forest-spirit",
    name: "森林守护小精灵",
    category: "纽扣布艺",
    author: "软绵绵研究所",
    image: "/yuwu/ui/craft-creature.png",
    tags: ["森林", "布艺", "幻想"],
    materials: ["棉麻布料", "木质纽扣", "刺绣线", "填充棉"],
    materialTypes: ["木质"],
    style: "民族风",
    colors: ["绿色", "金色"],
    favoriteCount: 334,
    source: "灵感广场",
    publishedAt: "2026-07-29",
    description: "用布片、纽扣和刺绣拼出一只来自森林深处的小小守护者。",
  },
  {
    id: "button-bear",
    name: "焦糖纽扣小熊",
    category: "纽扣布艺",
    author: "午后针线盒",
    image: "/yuwu/ui/craft-fabric.png",
    tags: ["小熊", "纽扣", "焦糖"],
    materials: ["焦糖棉布", "木质纽扣", "奶油绣线", "蕾丝贴片"],
    materialTypes: ["木质"],
    style: "复古",
    colors: ["金色", "白色"],
    favoriteCount: 221,
    source: "盲盒交换",
    publishedAt: "2026-07-25",
    description: "像旧玩具箱里被珍藏的小熊，边缘保留温柔的手缝痕迹。",
  },
  {
    id: "summer-leaf-frame",
    name: "夏日枝叶画框",
    category: "画作相框",
    author: "白昼画室",
    image: "/yuwu/ui/craft-frame.png",
    tags: ["植物", "画框", "留白"],
    materials: ["植物画芯", "浅木画框", "亚麻衬纸"],
    materialTypes: ["木质"],
    style: "极简",
    colors: ["绿色", "白色"],
    favoriteCount: 145,
    source: "灵感广场",
    publishedAt: "2026-07-24",
    description: "把一小段夏日枝叶留进画框，为桌面留出安静的绿色。",
  },
];

export const initialFavorites: Favorite[] = [];
