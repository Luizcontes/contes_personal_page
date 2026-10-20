import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const showcase = readFileSync(
	resolve(rootDir, 'src/components/projects/ProjectsShowcase.astro'),
	'utf8'
);
const styles = readFileSync(
	resolve(rootDir, 'src/components/projects/projects-showcase.css'),
	'utf8'
);
const runtime = readFileSync(
	resolve(rootDir, 'src/components/projects/projectsShowcaseRuntime.ts'),
	'utf8'
);
const contentConfig = readFileSync(resolve(rootDir, 'src/content.config.ts'), 'utf8');

describe('projects showcase contract', () => {
	it('renders a data-driven featured panel and project card collection', () => {
		expect(showcase).toContain("getCollection('projects')");
		expect(showcase).toContain('data-featured-project-panel');
		expect(showcase).toContain('data-project-card');
		expect(showcase).toContain('data-featured-preview');
		expect(showcase).toContain('data-featured-cta');
		expect(showcase).not.toContain('loading="lazy"');
		expect(showcase).toContain('decoding="async"');
	});

	it('supports reusable preview, icon, and localized project data', () => {
		expect(contentConfig).toContain('titleKey: z.string()');
		expect(contentConfig).toContain('summaryKey: z.string()');
		expect(contentConfig).toContain('icon: z.string()');
		expect(contentConfig).toContain('preview: z.string()');
		expect(showcase).toContain('project.data.icon');
		expect(showcase).toContain('project.data.preview');
	});

	it('defines the desktop grid and mobile carousel interaction hooks', () => {
		expect(styles).toContain('grid-template-columns: repeat(3, minmax(0, 1fr))');
		expect(styles).toContain('scroll-snap-type: x mandatory');
		expect(showcase).toContain('data-projects-previous');
		expect(showcase).toContain('data-projects-next');
		expect(runtime).toContain('selectProject');
		expect(runtime).toContain('IntersectionObserver');
		expect(runtime).toContain('scrollIntoView');
		expect(runtime).toContain('selectionLock');
		expect(runtime).toContain('projectFeatured');
		expect(runtime).not.toContain("grid.addEventListener('scroll'");
	});

	it('supports URL fallback and disabled project CTAs', () => {
		expect(runtime).toContain('projectLiveUrl || card.dataset.projectRepoUrl');
		expect(runtime).toContain('projects-cta--disabled');
		expect(runtime).toContain("projects.cta.unavailable");
	});
});
