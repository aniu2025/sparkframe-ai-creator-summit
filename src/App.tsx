import { useEffect, useState, type MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Copy,
  Lightbulb,
  Menu,
  MessageCircle,
  Mic2,
  MoonStar,
  Rocket,
  Sparkles,
  SunMedium,
  Users,
  X,
} from "lucide-react";
import "./App.css";
import heroImage from "./assets/creator-summit-hero.png";

type Theme = "light" | "dark";

type NavItem = {
  id: string;
  label: string;
};

type Highlight = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type Session = {
  time: string;
  title: string;
  speaker: string;
  note: string;
};

type Speaker = {
  name: string;
  role: string;
  topic: string;
  quote: string;
};

type Resource = {
  id: string;
  tag: string;
  title: string;
  summary: string;
  items: string[];
};

const navItems: NavItem[] = [
  { id: "overview", label: "首页" },
  { id: "schedule", label: "议程" },
  { id: "speakers", label: "嘉宾" },
  { id: "resources", label: "资料" },
  { id: "faq", label: "常见问题" },
];

const highlights: Highlight[] = [
  {
    icon: Sparkles,
    title: "灵感策展",
    description: "把选题、脚本、封面、分发策略整合成一条完整创作链路。",
  },
  {
    icon: Rocket,
    title: "上线实战",
    description: "每个环节都给到模板和示例，回去就能直接开做。",
  },
  {
    icon: Users,
    title: "创作者社区",
    description: "现场组队、共创点评、资源互换，减少单打独斗的试错成本。",
  },
  {
    icon: BookOpen,
    title: "学习资料包",
    description: "重点内容折叠归档，想看再展开，页面清爽也更方便复习。",
  },
];

const scheduleByTrack = {
  主论坛: [
    {
      time: "09:30",
      title: "从灵感到发布：AI 创作流怎么搭最顺",
      speaker: "林屿 / 创作者教练",
      note: "拆解一套适合个人 IP 与小团队的低摩擦工作流。",
    },
    {
      time: "11:00",
      title: "内容不只是写得快，更要持续有人看",
      speaker: "周沐 / 增长负责人",
      note: "用真实案例讲清楚选题、钩子、分发和复盘的关系。",
    },
    {
      time: "14:30",
      title: "一个人也能做出像团队一样的栏目节奏",
      speaker: "秦安 / 播客主理人",
      note: "把脚本、录制、切片、封面和社媒发布串成流水线。",
    },
  ],
  增长实验室: [
    {
      time: "10:20",
      title: "标题、封面、评论区，三个最值钱的增长触点",
      speaker: "白榆 / 增长顾问",
      note: "现场演示如何快速做 A/B 版本，并判断该保留哪一版。",
    },
    {
      time: "13:40",
      title: "让 AI 帮你做选题池，而不是替你写空话",
      speaker: "江策 / 内容策略师",
      note: "重点讲提示词结构与人味校正，避免内容同质化。",
    },
    {
      time: "16:00",
      title: "复盘面板怎么搭，才能看出真问题",
      speaker: "叶晴 / 数据产品经理",
      note: "从曝光、停留、互动到转化，现场给出最小可用指标面板。",
    },
  ],
  创作实战营: [
    {
      time: "09:50",
      title: "30 分钟做出一页能转化的活动页",
      speaker: "苏未 / 前端设计师",
      note: "从视觉主线、信息层级到 CTA 布局，一次讲透。",
    },
    {
      time: "13:10",
      title: "短视频脚本现场改稿：把普通内容拉到能发",
      speaker: "纪繁 / 编导",
      note: "直接对比初稿与终稿，理解删改背后的判断标准。",
    },
    {
      time: "15:20",
      title: "直播预热素材包怎么做，才不会临时手忙脚乱",
      speaker: "唐愿 / 活动运营",
      note: "分享主持词、转场页、互动提问卡等一套落地模板。",
    },
  ],
};

const fullAgenda: Session[] = [
  {
    time: "09:00",
    title: "签到与创作体检墙",
    speaker: "现场团队",
    note: "用 3 个问题快速定位你现在最缺的是选题、产能还是增长。",
  },
  {
    time: "12:10",
    title: "午间自由共创",
    speaker: "全部参会者",
    note: "开放桌面点评与资源交换，适合找搭子和互测内容方向。",
  },
  {
    time: "17:10",
    title: "收官问答与作品展示",
    speaker: "全体讲者",
    note: "把当天产出的页面、脚本、封面方案做一次快评快改。",
  },
];

const speakers: Speaker[] = [
  {
    name: "林屿",
    role: "AI 创作者教练",
    topic: "工作流搭建",
    quote: "真正省时间的不是多一个工具，而是让每个工具只做自己最擅长的那一步。",
  },
  {
    name: "白榆",
    role: "增长实验室导师",
    topic: "增长设计",
    quote: "增长不是发布后的补救动作，而是从标题开始就应该一起设计的东西。",
  },
  {
    name: "苏未",
    role: "产品与视觉设计师",
    topic: "活动页转化",
    quote: "页面不是把内容堆满，而是要让用户一眼知道下一步点哪里。",
  },
];

const resources: Resource[] = [
  {
    id: "starter-kit",
    tag: "模板包",
    title: "创作者起步工具箱",
    summary: "适合个人作者和小团队，涵盖选题、脚本、封面、发布节奏。",
    items: ["7 天选题池模板", "脚本改稿清单", "内容发布节奏表", "封面文案对照卡"],
  },
  {
    id: "growth-kit",
    tag: "复盘包",
    title: "增长复盘资料",
    summary: "把数据、评论和下一轮实验整合在一页里，复盘会更快更直观。",
    items: ["互动评论拆解表", "渠道投放对比卡", "指标看板字段建议", "A/B 版本记录表"],
  },
  {
    id: "event-kit",
    tag: "活动包",
    title: "线下活动共创素材",
    summary: "适合做沙龙、训练营、发布会等活动的宣传与现场执行。",
    items: ["主持人串场词", "签到欢迎话术", "演讲提纲页模板", "会后跟进消息模版"],
  },
];

const faqs = [
  {
    question: "这个页面有哪些互动效果？",
    answer:
      "你可以直接体验到固定导航、悬停变色、日程筛选切换、点击弹出提醒、FAQ 折叠、资料展开收起、移动端菜单切换等多个交互。",
  },
  {
    question: "深色 / 浅色模式是怎么切换的？",
    answer:
      "右上角按钮是一键切换，状态会保存到本地，下次打开页面会继续沿用你上一次的选择。",
  },
  {
    question: "为什么把长内容做成折叠？",
    answer:
      "这样移动端不会显得拥挤，用户可以先快速浏览重点，再按需展开完整议程和资料细节。",
  },
  {
    question: "AI 生成图片放在哪里了？",
    answer:
      "主视觉图区使用了一张 AI 生成的活动插图，已经作为本地资源接入到页面中，能直接跟项目一起打包。",
  },
];

const initialTheme = (): Theme => {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("creator-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

type TrackKey = keyof typeof scheduleByTrack;

export default function App() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<TrackKey>("主论坛");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [selectedSpeaker, setSelectedSpeaker] = useState(0);
  const [openResources, setOpenResources] = useState<string[]>(["starter-kit"]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("creator-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!toastMessage) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToastMessage(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visibleSection?.target.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const jumpToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    jumpToSection(sectionId);
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText("SPARKFRAME2026");
      showToast("邀请码已复制：SPARKFRAME2026");
    } catch {
      showToast("复制失败了，不过邀请码是：SPARKFRAME2026");
    }
  };

  const toggleResource = (resourceId: string) => {
    setOpenResources((current) =>
      current.includes(resourceId)
        ? current.filter((item) => item !== resourceId)
        : [...current, resourceId],
    );
  };

  const currentSpeaker = speakers[selectedSpeaker];

  return (
    <div className="page-shell">
      <a className="skip-link" href="#overview">
        跳到正文
      </a>

      <header className="topbar">
        <div className="nav-inner">
          <button className="brand" onClick={() => jumpToSection("overview")} type="button">
            <span className="brand-mark">SF</span>
            <span className="brand-text">
              <strong>SparkFrame</strong>
              <small>AI 创作者峰会</small>
            </span>
          </button>

          <nav className="nav-links" aria-label="主导航">
            <button
              className="nav-theme-pill"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              type="button"
            >
              {theme === "light" ? "切换深色" : "切换浅色"}
            </button>
            {navItems.map((item) => (
              <a
                key={item.id}
                className={`nav-link ${activeSection === item.id ? "is-active" : ""}`}
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              aria-label={theme === "light" ? "切换到深色模式" : "切换到浅色模式"}
              className="icon-button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              type="button"
            >
              {theme === "light" ? <MoonStar size={18} /> : <SunMedium size={18} />}
            </button>
            <button
              aria-expanded={menuOpen}
              aria-label="切换移动端菜单"
              className="icon-button menu-button"
              onClick={() => setMenuOpen((current) => !current)}
              type="button"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mobile-panel">
            {navItems.map((item) => (
              <a
                key={item.id}
                className="mobile-link"
                href={`#${item.id}`}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <section className="section hero-section" id="overview">
          <div className="hero-copy">
            <p className="eyebrow">2026 创作者活动专题页</p>
            <h1 className="hero-title">
              把灵感、内容、增长和上线，
              <span>放进同一张 AI 创作地图里。</span>
            </h1>
            <p className="hero-subtitle">
              这是一个面向独立创作者、小团队和学习者的单页站示例。页面带固定导航、深浅色模式和多种互动，
              同时把长内容折叠起来，浏览会更轻松。
            </p>

            <div className="hero-actions">
              <button className="hero-button primary" onClick={() => jumpToSection("schedule")} type="button">
                查看议程
                <ArrowRight size={18} />
              </button>
              <button
                className="hero-button secondary"
                onClick={() => showToast("已为你点亮抢先提醒，记得查看下方资料区。")}
                type="button"
              >
                点击领取提醒
              </button>
            </div>

            <div className="hero-metrics" aria-label="活动亮点">
              <div className="metric-chip">
                <CalendarDays size={16} />
                <span>2 天主题议程</span>
              </div>
              <div className="metric-chip">
                <Mic2 size={16} />
                <span>18 场分享与工作坊</span>
              </div>
              <div className="metric-chip">
                <Users size={16} />
                <span>现场共创与点评</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-frame">
              <img alt="AI 创作者峰会主视觉插图" src={heroImage} />
            </div>
            <div className="floating-note top">
              <Sparkles size={16} />
              AI 生成活动主视觉
            </div>
            <div className="floating-note bottom">
              <Lightbulb size={16} />
              深浅模式一键切换
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="highlights-title">
          <div className="section-header">
            <p className="kicker">Why This Page Works</p>
            <h2 className="section-title" id="highlights-title">
              先看重点，再决定要不要展开细节
            </h2>
            <p className="section-intro">
              下面这组卡片保留了明显的悬停反馈，桌面端和手机端都会自动调整排版。
            </p>
          </div>

          <div className="feature-grid">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <article className="feature-card" key={item.title}>
                  <span className="feature-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" id="schedule">
          <div className="section-header">
            <p className="kicker">Interactive Agenda</p>
            <h2 className="section-title">点选不同分会场，议程会即时切换</h2>
            <p className="section-intro">
              这里用了点击筛选和卡片悬停，长议程则放在折叠区里，保证页面不会一下子太满。
            </p>
          </div>

          <div className="track-switcher" role="tablist" aria-label="议程分组">
            {Object.keys(scheduleByTrack).map((track) => (
              <button
                key={track}
                aria-selected={selectedTrack === track}
                className={`track-button ${selectedTrack === track ? "is-active" : ""}`}
                onClick={() => setSelectedTrack(track as TrackKey)}
                type="button"
              >
                {track}
              </button>
            ))}
          </div>

          <div className="timeline-grid">
            {scheduleByTrack[selectedTrack].map((item) => (
              <article className="timeline-card" key={`${selectedTrack}-${item.time}`}>
                <span className="timeline-time">{item.time}</span>
                <h3>{item.title}</h3>
                <p className="timeline-speaker">{item.speaker}</p>
                <p>{item.note}</p>
              </article>
            ))}
          </div>

          <details className="details-wrap">
            <summary className="details-summary">
              <span>展开完整补充议程</span>
              <ChevronDown size={18} />
            </summary>
            <div className="details-content">
              {fullAgenda.map((item) => (
                <div className="details-row" key={item.time}>
                  <strong>{item.time}</strong>
                  <div>
                    <p>{item.title}</p>
                    <small>
                      {item.speaker} · {item.note}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </section>

        <section className="section" id="speakers">
          <div className="section-header">
            <p className="kicker">Clickable Profiles</p>
            <h2 className="section-title">点击嘉宾卡片，右侧内容会同步切换</h2>
            <p className="section-intro">
              这是另一种轻量交互方式，不用跳页也能查看更多信息，适合单页网站承载简介型内容。
            </p>
          </div>

          <div className="speaker-layout">
            <div className="speaker-list">
              {speakers.map((speaker, index) => (
                <button
                  className={`speaker-card ${selectedSpeaker === index ? "is-selected" : ""}`}
                  key={speaker.name}
                  onClick={() => setSelectedSpeaker(index)}
                  type="button"
                >
                  <span className="speaker-avatar">{speaker.name.slice(0, 1)}</span>
                  <div className="speaker-meta">
                    <strong>{speaker.name}</strong>
                    <span>{speaker.role}</span>
                  </div>
                  <em>{speaker.topic}</em>
                </button>
              ))}
            </div>

            <aside className="speaker-panel">
              <p className="panel-tag">当前焦点嘉宾</p>
              <h3>{currentSpeaker.name}</h3>
              <p className="panel-role">{currentSpeaker.role}</p>
              <p className="panel-quote">“{currentSpeaker.quote}”</p>
              <button className="inline-action" onClick={handleCopyCode} type="button">
                <Copy size={16} />
                复制活动邀请码
              </button>
            </aside>
          </div>
        </section>

        <section className="section" id="resources">
          <div className="section-header">
            <p className="kicker">Collapsible Resources</p>
            <h2 className="section-title">资料多的地方做成折叠块，页面会干净很多</h2>
            <p className="section-intro">
              每个资料卡都可以单独展开，适合放模板、FAQ、教程目录这类信息量偏大的内容。
            </p>
          </div>

          <div className="resource-grid">
            {resources.map((resource) => {
              const isOpen = openResources.includes(resource.id);
              return (
                <article className="resource-card" key={resource.id}>
                  <div className="resource-header">
                    <div>
                      <span className="resource-tag">{resource.tag}</span>
                      <h3>{resource.title}</h3>
                      <p>{resource.summary}</p>
                    </div>
                    <button
                      aria-expanded={isOpen}
                      className="resource-toggle"
                      onClick={() => toggleResource(resource.id)}
                      type="button"
                    >
                      {isOpen ? (
                        <>
                          收起
                          <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          展开
                          <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  {isOpen ? (
                    <div className="resource-body">
                      {resource.items.map((item) => (
                        <div className="resource-item" key={item}>
                          <span />
                          <p>{item}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" id="faq">
          <div className="section-header">
            <p className="kicker">FAQ Accordion</p>
            <h2 className="section-title">常见问题继续用折叠，让信息密度更舒服</h2>
            <p className="section-intro">
              这里是典型的单页 FAQ 写法，点一下就展开，既不打断阅读，也便于手机端连续浏览。
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((item, index) => {
              const isOpen = expandedFaq === index;
              return (
                <article className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.question}>
                  <button
                    aria-expanded={isOpen}
                    className="faq-question"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    type="button"
                  >
                    <span>{item.question}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <strong>SparkFrame One Page Demo</strong>
          <p>适合作为简历、产品页、活动页或学习资料页的单页模板继续改造。</p>
        </div>
        <button className="inline-action" onClick={() => jumpToSection("overview")} type="button">
          <MessageCircle size={16} />
          回到顶部
        </button>
      </footer>

      <button
        aria-label={theme === "light" ? "切换到深色模式" : "切换到浅色模式"}
        className="theme-fab"
        onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
        type="button"
      >
        {theme === "light" ? <MoonStar size={18} /> : <SunMedium size={18} />}
      </button>

      {toastMessage ? (
        <div className="toast" role="status" aria-live="polite">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      ) : null}
    </div>
  );
}
