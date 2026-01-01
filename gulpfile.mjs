import gulp from 'gulp';
import { readFileSync, cpSync, mkdirSync, writeFileSync } from 'fs';
import { deleteAsync } from 'del';
import htmlmin from 'gulp-htmlmin';
import jsmin from 'gulp-minify';
import svgmin from 'gulp-svgmin';
import rev from 'gulp-rev';
import rewrite from 'gulp-rev-rewrite';

const root = './';
const destination = `${root}docs`;
const manifest = `${root}rev-manifest.json`;

/**
 * Minify the HTML
 */
function html() {
  return gulp
    .src([`${root}**/*.html`, `!${root}node_modules/**/*.html`, `!${destination}/**/*.html`])
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true,
        removeAttributeQuotes: true,
      }),
    )
    .pipe(rewrite({ manifest: readFileSync(manifest) }))
    .pipe(gulp.dest(destination));
}

/**
 * Copy the Styles
 */
function styles() {
  return gulp
    .src([`${root}assets/styles/styles.css`])
    .pipe(rev())
    .pipe(gulp.dest(`${destination}/assets/styles`))
    .pipe(rev.manifest(manifest, { merge: false }))
    .pipe(gulp.dest(root));
}

/*
 * Minify the JavaScript
 */
function javascript() {
  return gulp
    .src([`${root}assets/js/*.js`])
    .pipe(
      jsmin({
        noSource: true,
        ext: { min: '.js' },
        compress: {
          dead_code: true,
          unused: true,
          drop_debugger: true,
        },
        output: {
          comments: false,
          quote_style: 1,
        },
      }),
    )
    .pipe(rev())
    .pipe(gulp.dest(`${destination}/assets/js`))
    .pipe(rev.manifest(manifest, { merge: true }))
    .pipe(gulp.dest(root));
}

/**
 * Copy Images using Node's fs module to ensure binary integrity
 */
function images(cb) {
  try {
    // Ensure destination directory exists
    mkdirSync(`${destination}/assets/img`, { recursive: true });

    // Copy all files recursively, preserving binary data
    cpSync(`${root}assets/img`, `${destination}/assets/img`, {
      recursive: true,
      force: true,
      preserveTimestamps: true,
    });

    cb();
  } catch (err) {
    cb(err);
  }
}

/**
 * Minify the SVGs
 */
function svg() {
  return gulp
    .src([`${root}assets/img/svg/*.svg`])
    .pipe(svgmin())
    .pipe(rev())
    .pipe(gulp.dest(`${destination}/assets/img/svg`))
    .pipe(rev.manifest(manifest, { merge: true }))
    .pipe(gulp.dest(root));
}

/**
 * Copy favicon
 */
function favicon() {
  return gulp.src([`${root}**/favicon.ico`, `!${root}node_modules/**`, `!${destination}/**`]).pipe(gulp.dest(destination));
}

/**
 * Generate robots.txt for SEO
 */
function robotsTxt(cb) {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: https://harvanchik.github.io/football-play-generator/sitemap.xml`;

  writeFileSync(`${destination}/robots.txt`, robotsContent);
  cb();
}

/**
 * Generate sitemap.xml for SEO
 */
function sitemap(cb) {
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://harvanchik.github.io/football-play-generator/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  writeFileSync(`${destination}/sitemap.xml`, sitemapContent);
  cb();
}

/**
 * Remove all content within the destination folder
 */
function clean() {
  return deleteAsync([`${destination}`]);
}

/**
 * The default task - Optimized build order for performance
 * 1. Clean old build
 * 2. Process and hash CSS first to create manifest
 * 3. Process and hash JS (merge with manifest)
 * 4. Process images, SVG, favicon in parallel (SVG merges with manifest)
 * 5. Process HTML with asset hashing references
 * 6. Generate SEO files (robots.txt, sitemap.xml) in parallel
 */
gulp.task('default', gulp.series(clean, styles, javascript, gulp.parallel(images, svg, favicon), html, gulp.parallel(robotsTxt, sitemap)));

/**
 * Task to remove the destination folder and its contents.
 */
gulp.task('clean', clean);
