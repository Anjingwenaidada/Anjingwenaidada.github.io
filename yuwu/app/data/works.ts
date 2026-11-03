export const workTypes = ["全部", "耳饰", "手串项链", "插花", "风铃", "幻想生物", "布艺", "画作相框"] as const;

export const workStatuses = ["全部作品", "制作中", "已完成", "已摆放"] as const;

export type WorkType = Exclude<(typeof workTypes)[number], "全部">;
export type WorkStatus = Exclude<(typeof workStatuses)[number], "全部作品">;

export type Work = {
  id: number;
  name: string;
  type: WorkType;
  status: WorkStatus;
  image: string;
  materials: string[];
  createTime: string;
};

export const works: Work[] = [
  {
    id: 1,
    name: "春日琉璃耳饰",
    type: "耳饰",
    status: "已完成",
    image: "/yuwu/ui/craft-earrings.png",
    materials: ["蓝色水晶珠", "白色珍珠", "花朵挂件", "金属连接件"],
    createTime: "2026-08-04",
  },
  {
    id: 2,
    name: "珍珠手链",
    type: "手串项链",
    status: "已摆放",
    image: "/yuwu/ui/craft-bracelet.png",
    materials: ["白色珍珠", "绿松石珠", "金色隔片", "弹力丝绳"],
    createTime: "2026-08-02",
  },
  {
    id: 3,
    name: "海洋蓝花束",
    type: "插花",
    status: "已完成",
    image: "/yuwu/ui/craft-flowers.png",
    materials: ["蓝色小花", "白色绣球", "枝叶", "湖蓝花瓶", "装饰丝带"],
    createTime: "2026-07-30",
  },
  {
    id: 4,
    name: "复古风铃",
    type: "风铃",
    status: "制作中",
    image: "/yuwu/ui/craft-wind.png",
    materials: ["黄铜铃铛", "镀金流苏", "原木水滴"],
    createTime: "2026-07-28",
  },
  {
    id: 5,
    name: "森林幻想生物",
    type: "幻想生物",
    status: "已完成",
    image: "/yuwu/ui/craft-creature.png",
    materials: ["毛绒躯体", "星星挂件", "树脂眼睛", "刺绣贴片", "软陶犄角"],
    createTime: "2026-07-24",
  },
  {
    id: 6,
    name: "布艺小熊",
    type: "布艺",
    status: "制作中",
    image: "/yuwu/ui/craft-fabric.png",
    materials: ["棉麻布料", "木质纽扣", "刺绣线", "填充棉", "蕾丝贴片", "缎带"],
    createTime: "2026-07-21",
  },
  {
    id: 7,
    name: "夏日植物画框",
    type: "画作相框",
    status: "已摆放",
    image: "/yuwu/ui/craft-frame.png",
    materials: ["植物画芯", "原木画框", "亚麻衬纸"],
    createTime: "2026-07-18",
  },
  {
    id: 8,
    name: "湖蓝珍珠耳饰",
    type: "耳饰",
    status: "制作中",
    image: "/yuwu/ui/craft-earrings.png",
    materials: ["湖蓝巴洛克珠", "奶油珍珠", "复古耳钩", "金属连接件", "贝壳花片"],
    createTime: "2026-07-15",
  },
];

export const creationTypes = [
  { name: "耳饰", image: "/yuwu/ui/craft-earrings.png" },
  { name: "手串", image: "/yuwu/ui/craft-bracelet.png" },
  { name: "插花", image: "/yuwu/ui/craft-flowers.png" },
  { name: "风铃", image: "/yuwu/ui/craft-wind.png" },
  { name: "幻想生物", image: "/yuwu/ui/craft-creature.png" },
  { name: "布艺", image: "/yuwu/ui/craft-fabric.png" },
] as const;
