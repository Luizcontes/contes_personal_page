import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const blogPage = readFileSync(resolve(rootDir, 'src/pages/blog.astro'), 'utf8');
const blogList = readFileSync(resolve(rootDir, 'src/components/blog/BlogList.astro'), 'utf8');
const blogCard = readFileSync(resolve(rootDir, 'src/components/blog/BlogCard.astro'), 'utf8');
const blogPostPage = readFileSync(resolve(rootDir, 'src/pages/blog/[slug].astro'), 'utf8');
const blogPost = readFileSync(resolve(rootDir, 'src/components/blog/BlogPost.astro'), 'utf8');
const baseLayout = readFileSync(resolve(rootDir, 'src/layouts/BaseLayout.astro'), 'utf8');
const globalStyles = readFileSync(resolve(rootDir, 'src/styles/global.css'), 'utf8');
const determinismPost = readFileSync(
	resolve(rootDir, 'src/content/blog/why-determinism-matters.mdx'),
	'utf8',
);

describe('blog page component contract', () => {
	it('keeps the page free of local CSS and delegates rendering to BlogList', () => {
		expect(blogPage).not.toContain('<style>');
		expect(blogPage).toContain('import BlogList');
		expect(blogPage).toContain('<BlogList posts={posts} />');
	});

	it('uses the shared home shell and section layout', () => {
		expect(blogPage).toContain('<main class="home-shell">');
		expect(blogList).toContain('<section class="home-section blog-list-section">');
	});

	it('keeps blog cards reusable and token-driven', () => {
		expect(blogList).toContain("import BlogCard from './BlogCard.astro'");
		expect(blogList).toContain('<BlogCard post={post} />');
		expect(blogCard).toContain("CollectionEntry<'blog'>");
		expect(blogCard).toContain('var(--color-surface)');
		expect(blogCard).toContain('var(--color-border)');
		expect(blogCard).toContain('var(--space-6)');
	});

	it('does not alter shared header or footer implementation', () => {
		expect(blogPage).not.toContain('site-header');
		expect(blogPage).not.toContain('site-footer');
	});

	it('uses the shared page section and reusable post component', () => {
		expect(blogPostPage).toContain("import BlogPost from '../../components/blog/BlogPost.astro'");
		expect(blogPostPage).toContain('layout="post"');
		expect(blogPostPage).toContain('<main class="home-shell post-page-shell">');
		expect(blogPostPage).toContain('<BlogPost post={post} formattedDate={formattedDate}>');
		expect(blogPost).toContain('<section class="home-section blog-post-section">');
		expect(blogPost).toContain('<slot />');
	});

	it('keeps post sizing at the page shell while retaining the shared footer behavior', () => {
		expect(baseLayout).toContain("layout?: 'default' | 'post'");
		expect(baseLayout).toContain('<body data-layout={layout}>');
		expect(globalStyles).toContain('body[data-layout="post"]');
		expect(globalStyles).toContain('body[data-layout="post"] .blog-post-section');
		expect(globalStyles).toContain('min-height: 0');
	});

	it('renders the cover from frontmatter and keeps MDX content-only', () => {
		expect(blogPost).toContain('post.data.cover');
		expect(blogPost).toContain('class="post-cover"');
		expect(determinismPost).not.toContain('style="width: 100%;');
		expect(determinismPost).toContain('<YouTubeEmbed');
	});

	it('contains slotted MDX content within the post shell', () => {
		expect(blogPost).toContain('width: 100%;');
		expect(blogPost).toContain('min-width: 0;');
		expect(blogPost).toContain('max-width: 100%;');
		expect(blogPost).toContain('overflow-wrap: anywhere;');
		expect(blogPost).toContain('overflow-x: clip;');
		expect(blogPost).toContain('.post-body :global(*)');
		expect(blogPost).toContain('.prose :global(iframe)');
		expect(blogPost).toContain('.prose :global(table)');
	});
});
