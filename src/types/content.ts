export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Service = {
  slug: string;
  name: string;
  index: string;
  short: string;
  summary: string;
  image: ImageAsset;
  disciplines: string[];
  narrative: string[];
  capabilities: { title: string; text: string }[];
  considerations: string[];
};

export type Industry = {
  slug: string;
  name: string;
  index: string;
  summary: string;
  image: ImageAsset;
  pressures: string[];
  approach: string[];
  serviceSlugs: string[];
  projectSlug: string;
};

export type Project = {
  slug: string;
  title: string;
  sector: string;
  mode: string;
  lane: string;
  summary: string;
  image: ImageAsset;
  challenge: string[];
  approach: string[];
  record: string[];
};

export type ArticleBlock = {
  heading?: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readMinutes: number;
  image: ImageAsset;
  author: string;
  blocks: ArticleBlock[];
};

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  initials: string;
  photo?: string;
};

export type Career = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
};

export type Faq = {
  id: string;
  group: string;
  question: string;
  answer: string;
};

export type MilestoneState = "complete" | "current" | "upcoming";

export type Shipment = {
  id: string;
  status: string;
  progress: number;
  mode: string;
  origin: string;
  destination: string;
  eta: string;
  pieces: string;
  weight: string;
  milestones: {
    label: string;
    detail: string;
    time: string;
    state: MilestoneState;
  }[];
};

export type Testimonial = {
  quote: string;
  role: string;
  context: string;
};
