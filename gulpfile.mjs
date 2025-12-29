import gulp from 'gulp';
import { readFileSync, cpSync, mkdirSync } from 'fs';
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
      })
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
      })
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
      preserveTimestamps: true
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
  return gulp.src([`${root}favicon.ico`]).pipe(gulp.dest(destination));
}

/**
 * Remove all content within the destination folder
 */
function clean() {
  return deleteAsync([`${destination}`]);
}

/**
 * The default task (triggered when running 'gulp' in the console)
 */
gulp.task('default', gulp.series(clean, styles, javascript, images, svg, favicon, html));
/**
 * Task to remove the destination folder and its contents.
 */
gulp.task('clean', clean);
