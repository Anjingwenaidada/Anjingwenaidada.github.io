import { siteAsset } from './siteAsset'

export const navigation = [
  { id: 'cover', label: '首页' },
  { id: 'about', label: '个人介绍' },
  { id: 'strengths', label: '个人优势' },
  { id: 'projects', label: '精选项目' },
  { id: 'articles', label: '我的文章' },
  { id: 'contact', label: '联系我' },
]

export const profile = {
  name: '安静文', title: 'AI 产品经理', email: '870756182@qq.com',
  school: '石家庄铁道大学四方学院', degree: '本科', major: '产品设计',
  phone: '188-3324-4956', phoneLink: '18833244956',
  resume: siteAsset('/assets/anjingwen-resume.pdf?v=20261009'), portrait: siteAsset('/assets/portrait.png'), wechat: siteAsset('/assets/wechat.jpg'),
  heroPortrait: siteAsset('/assets/portrait-user-v2.png'),
}

export const experiences = [
  { company: '北京灵伴即时智能科技有限公司', team: '创新中心', role: 'AI 影视产品经理', date: '2026.02 — 2026.09', summary: '连接 AI 视频能力与创作者的完整工作流程。', details: ['参与 DramaAI Studio 平台建设，主导无限画布等核心模块的产品设计。', '推进团队协作、调色台与运营板块需求落地，基于内测反馈持续迭代。'], tags: ['AI 视频', '创作者工具', '0 → 1'] },
  { company: '北京康高特仪器设备有限公司', team: '产品研发事业部', role: 'AI 产品经理', date: '2025.01 — 2026.02', summary: '将企业知识和 AI 工作流融入营销内容生产。', details: ['规划企业内部 AIGC 数字营销平台，覆盖内容生成、产品问答与知识检索。', '设计 Agent 工作流、知识库及人工确认机制，推动跨团队协作与效果验收。'], tags: ['Agent', 'RAG', '企业 AI 应用'] },
  { company: '腾讯科技（北京）有限公司', team: '智影团队', role: 'AIGC 产品经理', date: '2022.07 — 2024.12', summary: '让视觉 AI 能力成为更易用的内容创作功能。', details: ['推进图片创作、视频风格化等功能的需求定义、版本规划与上线。', '协同算法与研发，推动生成工作流产品化，建立评测标准与 Bad Case 迭代机制。'], tags: ['AIGC', '视觉 AI', '效果评测'] },
]

export type Project = {
  id: string; number: string; name: string; category: string; role: string; summary: string; url?: string;
  examples?: { title: string; src: string; poster?: string }[];
  exampleProcess?: {
    title: string; intro: string; reference: string; templateDescription: string;
    steps: { title: string; description: string }[];
    generationStrategy: string; productWork: string;
  };
  tags: string[]; theme: string; coverTitle: string; coverImage?: string; flow: string[]; problem: string; solution: string; focus?: string;
  overviewLabels?: { problem: string; focus?: string }; outcome?: string; hideOverviewSubtitle?: boolean;
}

export const projects: Project[] = [
  { id: 'dramaai', url: 'https://idrama.lingban.cn/', coverImage: siteAsset('/assets/project-covers/dramaai.png'), number: '01', name: 'DramaAI Studio', category: 'AI 影视创作平台', role: 'AI 影视产品经理', theme: 'blue', coverTitle: '从创意，到成片。', flow: ['剧本创作', '视觉制作', '成片交付'], summary: '面向短剧创作者的一站式 AI 内容生产平台', tags: ['无限画布', 'AI 视频', '创作工作流'], hideOverviewSubtitle: true, overviewLabels: { problem: '项目背景' }, problem: '面向短剧创作者，解决制作链路割裂、成片成本高和团队协作效率低的问题，搭建一站式 AI 短剧创作平台。', solution: '需求调研，主导无限画布、素材管理、团队协作等核心板块设计落地，封装原子能力，跟进内测版本测试上线，收集创作者使用反馈。', outcome: '平台完成内测上线，累计服务数百位种子创作者和 10+ 创作团队，支撑 20+ 部 AI 短剧样片生产，画面风格调试时间缩短约 40%。' },
  { id: 'marketing', hideOverviewSubtitle: true, coverImage: siteAsset('/assets/project-covers/marketing-v2.png'), number: '02', name: 'AIGC 数字营销平台', category: '企业 AI 应用', role: 'AI 产品经理', theme: 'teal', coverTitle: '让内容生产，更高效', flow: ['品牌资产', 'AI 协同创作', '审核交付'], summary: '基于企业知识库与多 Agent 协作，串联营销内容生成、产品问答和人工审核。', tags: ['Multi-Agent', 'RAG', '人在回路'], overviewLabels: { problem: '项目背景' }, problem: '仪器设备企业产品型号多、参数复杂、资料分散，营销内容制作高度依赖人工。为此搭建企业内部 AIGC 数字营销平台，串联资料检索、内容生成与审核流程。', solution: '负责需求调研、MVP 范围定义及 AI 方案设计，规划知识库与 Multi-Agent 工作流，串联资料解析、知识检索、内容生成和人工审核，并推进 RAG、ComfyUI、ControlNet 等能力落地。', outcome: '平台 1.0 上线并投入内部使用，覆盖营销物料、视频、产品问答、素材库和知识库等模块；营销物料生产效率提升约 60%，资料复用率提升约 40%。' },
  { id: 'zhiying', hideOverviewSubtitle: true, examples: [{ title: '原视频', src: siteAsset('/assets/project-examples/zhiying/original.mp4') }, { title: '动漫风格转绘', src: siteAsset('/assets/project-examples/zhiying/stylized.mp4') }], exampleProcess: {
    title: 'AI视频风格转绘示例',
    intro: '将复杂的 AI 风格化生成流程封装为简单易用的创作功能，用户上传素材、选择风格模板，即可生成具有统一视觉风格的视频。',
    reference: siteAsset('/assets/project-examples/zhiying/style-reference.png'),
    steps: [
      { title: '上传素材', description: '支持图片 / 视频' },
      { title: '选择风格', description: '动漫风格模板' },
      { title: 'AI 智能生成', description: '自动应用风格配置' },
      { title: '预览与导出', description: '查看效果并保存' },
    ],
    templateDescription: '预设人物造型、色彩、线条和画面质感等风格规则，减少用户反复编写提示词的操作成本。',
    generationStrategy: '在保留原视频动作和镜头结构的基础上，通过风格约束与质量控制，尽量减少人物漂移、画面闪烁和服饰变化。',
    productWork: '用户场景分析 · 功能流程设计 · 风格模板配置 · 生成效果评测 · 交互体验优化',
  }, coverImage: siteAsset('/assets/project-covers/zhiying-v4.png'), number: '03', name: '腾讯智影', category: 'AIGC 创作工具', role: 'AIGC 产品经理', theme: 'violet', coverTitle: '让创作，简单发生。', flow: ['风格选择', 'AI 智能生成', '作品输出'], summary: '将 AI 图像与视频生成能力封装为简单易用的创作工具，让用户轻松完成风格化内容创作。', tags: ['ComfyUI', 'LoRA', '模型评测'], overviewLabels: { problem: '项目背景' }, problem: '用户对个性化图片与视频内容需求持续增长，但传统影像工具操作复杂、创作门槛高。腾讯智影通过生成式 AI、计算机视觉与 LoRA，将专业影像能力封装为更易用的创作工具。', solution: '负责 AI 网感帮修、视频风格转绘、智能抠图、扩图等功能规划与 MVP 设计；协同算法团队封装 ComfyUI 工作流，引入自研 LoRA，并建立模板生产、效果验收和持续更新机制。', outcome: '完成 5 项视觉 AI 功能上线；自拍模板实现日更，带来大盘 DAU 增长 22%，用户留存率提升至 30%，图片保存率达到 80%。' },
  { id: 'yuwu', url: 'https://yuwu-handcraft.k-zeus.chatgpt.site/', coverImage: siteAsset('/assets/project-covers/yuwu.png'), number: '04', name: '与物', category: '数字手作与创意互动平台', role: '独立产品设计与开发', theme: 'rose', coverTitle: '让手作，不受材料限制。', flow: ['自由创作', '桌面陪伴', '分享交换'], summary: '低门槛数字手作，自由创作、桌面陈列，并通过分享与盲盒交换延续创作乐趣。', tags: ['数字手作', '桌面互动', '盲盒交换'], overviewLabels: { problem: '项目背景' }, problem: '线下手作存在材料成本高、素材有限等门槛，现有数字创作产品也缺少丰富玩法与持续互动。为此设计“与物”，将数字手作、桌面陈列与作品交换结合，降低创作成本并增强情感陪伴。', solution: '负责产品定位、功能架构与核心流程设计，规划插花、珠饰、豆荚娃娃等创作模块，以及拖拽编辑、作品保存、桌面陈列、收藏、赠送和盲盒交换等能力。', outcome: '完成产品 0-1 方案与核心流程设计，形成“创作—陈列—陪伴—交换”闭环；完成 50 名种子用户招募与测试，收集反馈用于后续迭代。' },
]

export const capabilityTags: string[] = [
  '需求调研', '原型设计', '评测体系', 'Bad Case 分析', 'Vibe Coding', 'RAG', 'PE工程', 'Human-in-the-loop', 'Harness', 'ControlNet',
  'Claude', 'Codex', 'Cursor', 'Dify', 'ComfyUI', 'Workflow', 'SDD',
]

export const strengths = [
  { title: 'AIGC 产品落地经验', text: '具备 AI 图像、AI 视频产品落地能力，独立推进从需求定义到 Vibe Coding 落地全程能力，能够独立完成大型项目。' },
  { title: '扎实的 AI 技术应用与实践功底', text: '深入理解 AI 核心技术，熟练运用 ComfyUI 搭建工作流、RAG 技术构建知识库系统，熟悉大模型边界与 Agent 构建思路，能运用 Dify、Coze、n8n 等平台搭建和验证 Agent 工作流。' },
  { title: '丰富的跨领域项目操盘经验', text: '拥有营销物料、AI 创作工具、影视 AI 赋能等 AIGC 项目经验，能快速适配业务场景，推动项目从 0 到 1 跑通 SOP 并高质量交付。' },
  { title: '质量评测和持续优化意识', text: '具备 AI 数据治理与模型评测经验，能够通过测试集、失败案例和版本对比定位问题，推动持续优化。' },
  { title: '设计背景带来的优势', text: '产品设计出身，兼具 UI、视觉设计经验、视觉审美与交互能力强；熟悉 AIGC 内容生产链路，能够从创作者视角优化生产流程与产品体验；拥有 10 年绘画经验，具备较强的视觉判断和内容质量评测能力。' },
]











