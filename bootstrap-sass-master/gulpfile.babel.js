//引入必须的类库
//gulp核心类库
import gulp from 'gulp';
//加载 gulp 插件的类库，我们知道 gulp 插件非常丰富，如果要一个个引入的话，需要写很多很多条 import 语句，引入了这个插件之后，调用时只需要加 点(.) + 插件名称 那就可以使用了。
import gulpLoadPlugins from 'gulp-load-plugins';
//浏览器同步工具，如果有代码更新，浏览器会自动刷新更新资料
import browserSync from 'browser-sync'
//删除资源的工具包
import del from 'del';
//wiredep 是从 bower 同步到 html 中资源引用的插件，bower 中定义了依赖包，有了它，这些包的引用比如 js，css 就可以直接自动生成到 html 文件中。
import {stream as wiredep} from 'wiredep';

//将加载插件的插件初始化为 $ 符号，然后初始化 reload 等变量。
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

//编译sass，in 代表 Sass 源文件地址，tmp 代表生成的编译后的 CSS 目录。编译之后会在根目录下出现一个.tmp文件
const styles = {
    'in': 'assets/stylesheets/**/*.scss',
    'tmp': '.tmp/css'
};

//
const scripts = {
    'in': 'assets/javascripts/**/*.js',
    'tmp': '.tmp/js',
    'out': 'dist/js'
};

const lint = {
    'in': 'assets/javascripts/**/*.js'
};
const html = {
    'in': 'assets/*.html',
    'out': 'dist'
};
const images = {
    'in': 'assets/images/**/*',
    'out': 'dist/images'
};
const fonts = {
    'in': ['assets/fonts/bootstrap/*'],
    'tmp': '.tmp/fonts',
    'out': 'dist/fonts'
};
const extras = {
    'in': [
        'assets/*.*',
        '!assets/*.html'
    ],
    'out': 'dist'
};
const serve = {
    'baseDir': ['.tmp', 'assets'],
    'baseDirDist': ['dist'],
    'routes': {
        '/bower_components': 'bower_components'
    },
    'port': 9000
};
const build = {
    'in': 'dist/**/*'
};
const wire = {
    'in': 'assets/*.html',
    'out': 'dist'
};
//plumber 是一个错误处理插件，当出现错误时，不会立即卡主，而是进入 plumber，防止程序运行终止。
//sourcemaps 是用来生成映射文件的一个插件，map 文件记录了从 Sass 编译成 CSS 的过程中，每一行的 Sass 代码对应哪一行的 CSS 代码。
//sass 是核心的编译 Sass 的插件，指定了输出格式 expanded，precision 指定了当输出十进制数字时，使用多少位的精度，然后指定了路径和错误日志。
//autoprefixer 是一个以友好方式处理浏览器前缀的插件，比如一些 CSS 的定义会出现 -webkit- 等等，此插件是用来处理浏览器前缀的。
//dest 是输出编译后的文件，指定输出路径。
//reload 是同步浏览器资源的方法。
gulp.task('styles', () => {
    return gulp.src(styles.in)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(styles.tmp))
        .pipe(reload({stream: true}));
});
//使用babel将es6转换成es5
gulp.task('scripts', () => {
    return gulp.src(scripts.in)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.babel())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(scripts.tmp))
        .pipe(reload({stream: true}));
});
//另外还有一个专门负责代码风格转换的 task，使用了 eslint 这个插件
gulp.task('lint', () => {
    return gulp.src(lint.in)
        .pipe(reload({stream: true, once: true}))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
});
//HTML 处理就是检查一下有哪些 CSS 和 JS 被引用了，可以将它们合并，然后将新的文件放到 dist 并更新它的引用路径。
gulp.task('html', ['styles', 'scripts'], () => {
    return gulp.src(html.in)
        .pipe($.useref({searchPath: ['.tmp', 'assets', '.']}))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano()))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest(html.out));
});
gulp.task('images', () => {
    return gulp.src(images.in)
        .pipe($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{cleanupIDs: false}]
        }))
        .pipe(gulp.dest(images.out));
});
gulp.task('fonts', () => {
    return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {
    })
        .concat(fonts.in))
        .pipe(gulp.dest(fonts.tmp))
        .pipe(gulp.dest(fonts.out));
});
gulp.task('extras', () => {
    return gulp.src(extras.in, {
        dot: true
    }).pipe(gulp.dest(extras.out));
});
gulp.task('clean', del.bind(null, ['.tmp', 'dist']));
gulp.task('serve', ['styles', 'scripts', 'fonts', 'wiredep'], () => {
    browserSync({
        notify: false,
        port: serve.port,
    server: {
    baseDir: serve.baseDir,
        routes: serve.routes
}
});
gulp.watch([
    html.out, scripts.tmp, scripts.out, images.out, fonts.tmp, fonts.out
]).on('change', reload);
gulp.watch(styles.in, ['styles']);
gulp.watch(scripts.in, ['scripts']);
gulp.watch(fonts.in, ['fonts']);
gulp.watch('bower.json', ['wiredep', 'fonts']);
});
gulp.task('serve:dist', () => {
    browserSync({
        notify: false,
        port: serve.port,
    server: {
    baseDir: serve.baseDirDist
}
});
});
gulp.task('wiredep', () => {
    gulp.src(wire.in)
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe($.useref({searchPath: ['.tmp', 'assets', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe(gulp.dest(wire.out));
});
gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
    return gulp.src(build.in).pipe($.size({title: 'build', gzip: true}));
});
gulp.task('default', ['clean'], () => {
    gulp.start('build');
});