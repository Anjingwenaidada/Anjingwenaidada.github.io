import { siteAsset } from './siteAsset'

type Article = {
  id: string
  coverImage?: string
  title: string
  summary: string
  tags: string[]
  date: string
  author: string
  source: string
  url: string
}

export const articles: Article[] = [
  {
    id: 'enterprise-agent',
    coverImage: siteAsset('/assets/articles/enterprise-agent.png'),
    title: '企业 Agent 的上限，不在模型参数里，在公司的知识管理能力里',
    summary: '结合企业 Agent 落地实践，拆解知识治理与隐性经验显性化的方法，探讨如何将业务知识转化为可执行的规则、流程与评估标准。',
    tags: ['企业 Agent', '知识管理'],
    date: '2026-05-31',
    author: '墨峥说AI产品',
    source: '人人都是产品经理',
    url: 'https://www.woshipm.com/ai/6405264.html',
  },
  {
    id: 'evoken-ecosystem',
    coverImage: siteAsset('/assets/articles/evoken-ecosystem.webp'),
    title: '《演语科技》从 LiblibAI、Lovart 到 LibTV：这家公司正在搭建怎样的 AIGC 创作生态？',
    summary: '从 LiblibAI 的模型社区，到 Lovart 的设计 Agent 与 LibTV 的视频工作流，拆解演语科技如何将模型能力封装为创作工具，构建覆盖图像、设计与视频的产品生态。',
    tags: ['AIGC 创作生态', '产品分析'],
    date: '2026-09-20',
    author: '墨峥说AI产品',
    source: '微信公众号「墨峥说AI产品」',
    url: 'https://mp.weixin.qq.com/s/L1IedLomkchk2wI1a7SyMQ',
  },
  {
    id: 'ai-hardware',
    coverImage: siteAsset('/assets/articles/ai-hardware.png'),
    title: '每个硬件都值得被AI重构一次：从遥控器到管家的进化',
    summary: '从智能家居的体验割裂出发，探讨 AI 如何重塑硬件交互、设备协同与服务流程，让智能设备从被动控制走向主动理解用户。',
    tags: ['AI 硬件', '产品思考'],
    date: '2026-06-27',
    author: '墨峥说AI产品',
    source: '人人都是产品经理',
    url: 'https://www.woshipm.com/share/6420700.html',
  },
  {
    id: 'siri-ai',
    title: '为什么 Siri AI 比普通聊天机器人更值得产品经理研究',
    summary: '从系统级 AI 的入口、上下文与跨应用执行能力出发，分析 AI 如何从回答问题走向完成任务，以及产品经理需要设计的确认机制与失败兜底。',
    tags: ['系统级 AI', '任务闭环'],
    date: '2026-06-09',
    author: '墨峥说AI产品',
    source: '微信公众号「墨峥说AI产品」',
    url: 'https://mp.weixin.qq.com/s/Q0DalRyeopAaDGnE96LqKA',
  },
  {
    id: 'ai-career',
    coverImage: siteAsset('/assets/articles/ai-career.webp'),
    title: 'AI产品经理之后，下一个风口岗位出现了',
    summary: '拆解前置部署工程师（FDE）的工作方式与能力模型，比较其与 AI 产品经理的分工，探讨如何把一线业务经验沉淀为可复用的产品能力。',
    tags: ['FDE', 'AI 职业发展'],
    date: '2026-06-09',
    author: '墨峥说AI产品',
    source: '微信公众号「墨峥说AI产品」',
    url: 'https://mp.weixin.qq.com/s/5Yvae0pZgh6VBi_XrmmfoA',
  },
]
