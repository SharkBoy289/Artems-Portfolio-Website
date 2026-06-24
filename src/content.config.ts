import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

/**
 * Content collections power the Projects, Timeline, and Testimonials sections.
 * Editing content = editing these files only; layout never changes.
 *
 * - projects   → MDX case studies (rich body) in src/content/projects/
 * - timeline   → JSON array of career/project milestones
 * - testimonials → JSON array of REAL testimonials (permission granted)
 */

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // "shipped" | "in-progress" | "experiment" — drives the status badge
    status: z.enum(["shipped", "in-progress", "experiment"]),
    year: z.string(),
    tags: z.array(z.string()).default([]),
    // featured projects render larger / first
    featured: z.boolean().default(false),
    // optional links
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    // cover image lives in /public; optional so cards degrade gracefully
    cover: z.string().optional(),
    // lower = earlier in the grid
    order: z.number().default(100),
    // placeholder entries are visually marked + easy to find/replace later
    placeholder: z.boolean().default(false),
  }),
});

const timeline = defineCollection({
  loader: file("./src/content/timeline.json"),
  schema: z.object({
    id: z.string(),
    year: z.string(),
    title: z.string(),
    subtitle: z.string(),
    // one line on why the work is impressive — the skill/impact, not just the what
    impact: z.string(),
    // key technologies, rendered as chips
    stack: z.array(z.string()).default([]),
    // distinguishes work history / education from personal projects
    type: z.enum(["work", "education", "project"]).default("project"),
    status: z.enum(["shipped", "in-progress", "experiment"]).default("shipped"),
    // sort key — higher = more recent (rendered most-recent-first)
    sort: z.number(),
  }),
});

const testimonials = defineCollection({
  loader: file("./src/content/testimonials.json"),
  schema: z.object({
    id: z.string(),
    quote: z.string(),
    author: z.string(),
    role: z.string().optional(),
  }),
});

export const collections = { projects, timeline, testimonials };
