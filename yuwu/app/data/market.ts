import { inspirationArtworks, type InspirationArtwork } from "./inspiration";

export const marketCategories = [
  "全部", "耳饰", "手串项链", "插花", "豆荚娃娃", "风铃", "挂绳", "纽扣布艺", "画作相框",
] as const;

export type MarketExchangeStatus = "可交换" | "交换中" | "仅展示";

export type MarketArtwork = InspirationArtwork & {
  userId: string;
  authorAvatar: string;
  authorWorkCount: number;
  exchangeStatus: MarketExchangeStatus;
  marketStatus: "已发布" | "交换中" | "已完成交换";
};

export type BlindBox = {
  id: string;
  creatorId: string;
  creator: string;
  name: string;
  cover: string;
  artworks: string[];
  artworkTypes: string[];
  rule: string;
  status: "等待交换" | "交换中" | "交换完成";
  applicants: number;
};

export type Exchange = {
  id: string;
  userA: string;
  userB: string;
  blindBoxA: string;
  blindBoxB: string;
  receivedWork: string;
  sentWork: string;
  status: "申请中" | "completed";
  createTime: string;
};

const authorProfiles = [
  { id: "u-lin", avatar: "林", works: 18, state: "可交换" as const },
  { id: "u-light", avatar: "光", works: 31, state: "交换中" as const },
  { id: "u-moon", avatar: "月", works: 24, state: "可交换" as const },
  { id: "u-candy", avatar: "棉", works: 15, state: "仅展示" as const },
  { id: "u-bean", avatar: "豆", works: 22, state: "可交换" as const },
  { id: "u-flower", avatar: "花", works: 28, state: "交换中" as const },
] as const;

export const marketArtworks: MarketArtwork[] = inspirationArtworks.slice(0, 12).map((artwork, index) => {
  const author = authorProfiles[index % authorProfiles.length];
  return {
    ...artwork,
    source: "与物市集",
    userId: author.id,
    authorAvatar: author.avatar,
    authorWorkCount: author.works,
    exchangeStatus: author.state,
    marketStatus: author.state === "交换中" ? "交换中" : "已发布",
  };
});

export const initialBlindBoxes: BlindBox[] = [
  {
    id: "box-spring",
    creatorId: "u-lin",
    creator: "小林手作",
    name: "春日小物盲盒",
    cover: "/yuwu/ui/craft-earrings.png",
    artworks: ["春日珍珠耳饰", "清晨绣球花瓶", "旧时光木质风铃"],
    artworkTypes: ["耳饰", "插花", "风铃"],
    rule: "用一件同类型数字手作参与交换，确认后随机获得其中一件。",
    status: "等待交换",
    applicants: 6,
  },
  {
    id: "box-ocean",
    creatorId: "u-light",
    creator: "拾光珠宝铺",
    name: "海风蓝调盲盒",
    cover: "/yuwu/ui/craft-bracelet.png",
    artworks: ["海洋风耳坠", "珍珠花园手串", "云朵琉璃挂绳"],
    artworkTypes: ["耳饰", "手串项链", "挂绳"],
    rule: "交换作品需包含蓝色或白色元素，每位用户只能申请一次。",
    status: "交换中",
    applicants: 12,
  },
  {
    id: "box-oriental",
    creatorId: "u-moon",
    creator: "山月造物",
    name: "东方留白盲盒",
    cover: "/yuwu/ui/craft-frame.png",
    artworks: ["新中式青玉耳饰", "植物标本画框", "旧时光木质风铃"],
    artworkTypes: ["耳饰", "画作相框", "风铃"],
    rule: "优先交换新中式、木质或玉石主题作品。",
    status: "等待交换",
    applicants: 9,
  },
  {
    id: "box-friends",
    creatorId: "u-bean",
    creator: "豆豆造物局",
    name: "桌面伙伴盲盒",
    cover: "/yuwu/ui/craft-pea.png",
    artworks: ["夕阳豆荚娃娃", "星星幻想生物", "布艺小熊"],
    artworkTypes: ["豆荚娃娃", "幻想生物", "纽扣布艺"],
    rule: "交换一位你亲手创造的桌面伙伴，收获另一份陪伴。",
    status: "交换完成",
    applicants: 15,
  },
];

export const initialExchanges: Exchange[] = [
  {
    id: "exchange-01",
    userA: "安安",
    userB: "豆豆造物局",
    blindBoxA: "我的森林小物盲盒",
    blindBoxB: "桌面伙伴盲盒",
    receivedWork: "夕阳豆荚娃娃",
    sentWork: "布艺小熊",
    status: "completed",
    createTime: "2026-08-03",
  },
  {
    id: "exchange-02",
    userA: "安安",
    userB: "拾光珠宝铺",
    blindBoxA: "春日配色盲盒",
    blindBoxB: "海风蓝调盲盒",
    receivedWork: "海洋风耳坠",
    sentWork: "春日琉璃耳饰",
    status: "申请中",
    createTime: "2026-08-05",
  },
];
