<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until
 * <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="摄吧,摄影,SHe.Ba,sheba,摄影爱好,摄影吧"/>
    <meta name="description" content="摄吧,SHe.Ba,摄影爱好者的家园,把日常生活中稍纵即逝的平凡事物转化为不朽的视觉图像,记住美的瞬间。"/>
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <title><?php
        wp_title('|', true, 'right');
        bloginfo('name');
        ?></title>
    <?php if (is_singular() && pings_open(get_queried_object())) : ?>
        <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
    <?php endif; ?>
    <?php wp_head(); ?>
    <style>
        canvas{display: block;width: 100%;height: 100%;z-index: -1;position: fixed}
    </style>
</head>
<body <?php body_class(); ?>>
<canvas id="canvas"></canvas>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#main"><?php esc_html_e('Skip to 
content', 'seos-photography'); ?></a>
    <header id="masthead" class="site-header" role="banner">
        <nav id="site-navigation" class="main-navigation" role="navigation">
            <button class="menu-toggle" aria-controls="primary-menu" aria-
                    expanded="false"><?php esc_html_e('菜单', 'seos-photography'); ?></button>
            <?php wp_nav_menu(array('theme_location' => 'primary', 'menu_id'

            => 'primary-menu')); ?>
        </nav><!-- #site-navigation -->

        <?php if ((is_front_page() or is_home()) and !get_theme_mod

        ('hide_home_image')) : ?>

        <?php if (!get_theme_mod('hide_home_image')) : ?>

        <?php if (get_theme_mod('front_page_image')) : ?>

        <div class="site-branding"

             style="background-image: url('<?php echo get_theme_mod('front_page_image'); ?>'); min-

                     height: 850px">

            <?php else : ?>

            <div class="site-branding"

                 style="background-image: url('<?php echo get_template_directory_uri() .

                     '/images/header.jpg'; ?>'); min-height: 850px">

                <?php endif; ?>

                <?php sp_header_image(); ?>

                <?php endif; ?>

            </div><!-- .site-branding -->

            <?php else : ?>

                <?php sp_title_and_description(); ?>

            <?php endif; ?>

    </header><!-- #masthead -->

    <div class="clear"></div>

    <?php if (is_front_page() or is_home()) { ?>

        <div class="container-images">

            <?php if (!get_theme_mod('hide_img_1')) : ?>
                <a href="/a">
                    <div class="sp-image">
                        <div class="sp-overlay"></div>
                        <div class="sp-title">My 摄吧

                        </div>
                        <div class="sp-description">We

                            SHe.Ba
                        </div>
                        <img src="<?php echo

                            get_template_directory_uri() . '/images/header1.jpg'; ?>" alt="img-1"/>
                    </div>
                </a>
            <?php else : ?>

                <?php if (get_theme_mod('seos_photography_img1')) : ?>
                    <a href="<?php echo esc_url(get_theme_mod

                    ('seos_photography_url1')); ?>">
                        <div class="sp-image">
                            <div class="sp-overlay"></div>
                            <div class="sp-title"><?php echo

                                esc_attr(get_theme_mod('seos_photography_title1')); ?></div>
                            <div class="sp-description"><?php

                                echo esc_attr(get_theme_mod('seos_photography_text1')); ?></div>
                            <img src="<?php echo esc_url

                            (get_theme_mod('seos_photography_img1')); ?>" alt="img-1"/>
                        </div>
                    </a>
                <?php endif; endif; ?>

            <?php if (!get_theme_mod('hide_img_2')) : ?>
                <a href="/s">
                    <div class="sp-image">
                        <div class="sp-overlay"></div>
                        <div class="sp-title">My

                            SHe.Ba
                        </div>
                        <div class="sp-description">摄影

                            SHe.Ba
                        </div>
                        <img src="<?php echo

                            get_template_directory_uri() . '/images/header2.jpg'; ?>" alt="img-2"/>
                    </div>
                </a>
            <?php else : ?>
                <?php if (get_theme_mod('seos_photography_img2')) : ?>
                    <a href="<?php echo esc_url(get_theme_mod

                    ('seos_photography_url2')); ?>">
                        <div class="sp-image">
                            <div class="sp-overlay"></div>
                            <div class="sp-title"><?php echo

                                esc_attr(get_theme_mod('seos_photography_title2')); ?></div>
                            <div class="sp-description"><?php

                                echo esc_attr(get_theme_mod('seos_photography_text2')); ?></div>
                            <img src="<?php echo esc_url

                            (get_theme_mod('seos_photography_img2')); ?>" alt="img-2"/>
                        </div>
                    </a>
                <?php endif; endif; ?>

            <?php if (!get_theme_mod('hide_img_3')) : ?>
                <a href="/e">
                    <div class="sp-image">
                        <div class="sp-overlay"></div>
                        <div class="sp-title">My 故事

                        </div>
                        <div class="sp-description">摄吧的

                            故事
                        </div>
                        <img src="<?php echo

                            get_template_directory_uri() . '/images/header3.jpg'; ?>" alt="img-3"/>
                    </div>
                </a>
            <?php else : ?>
                <?php if (get_theme_mod('seos_photography_img3')) : ?>
                    <a href="<?php echo esc_url(get_theme_mod

                    ('seos_photography_url3')); ?>">
                        <div class="sp-image">
                            <div class="sp-overlay"></div>
                            <div class="sp-title"><?php echo

                                esc_attr(get_theme_mod('seos_photography_title3')); ?></div>
                            <div class="sp-description"><?php

                                echo esc_attr(get_theme_mod('seos_photography_text3')); ?></div>
                            <img src="<?php echo esc_url

                            (get_theme_mod('seos_photography_img3')); ?>" alt="img-3"/>
                        </div>
                    </a>
                <?php endif; endif; ?>

        </div><!-- .container-images -->

    <?php } ?>

    <div id="content" class="site-content">
    </div>

    <script>

        var canvasHeight = document.body.clientHeight;
        var canvasdom = document.getElementById('canvas');

        canvasdom.style.cssText += 'z-index=-1;width:100%;height:' + canvasHeight + 'px';

        class Circle {
            //创建对象
            //以一个圆为对象
            //设置随机的 x，y坐标，r半径，_mx，_my移动的距离
            //this.r是创建圆的半径，参数越大半径越大
            //this._mx,this._my是移动的距离，参数越大移动
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.r = Math.random() * 10 ;
                this._mx = Math.random() ;
                this._my = Math.random() ;

            }

            //canvas 画圆和画直线
            //画圆就是正常的用canvas画一个圆
            //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
            drawCircle(ctx) {
                ctx.beginPath();
                //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
                ctx.arc(this.x, this.y, this.r, 0, 360)
                ctx.closePath();
                ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
                ctx.fill();
            }

            drawLine(ctx, _circle) {
                let dx = this.x - _circle.x;
                let dy = this.y - _circle.y;
                let d = Math.sqrt(dx * dx + dy * dy)
                if (d < 150) {
                    ctx.beginPath();
                    //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
                    ctx.moveTo(this.x, this.y);   //起始点
                    ctx.lineTo(_circle.x, _circle.y);   //终点
                    ctx.closePath();
                    ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
                    ctx.stroke();
                }
            }

            // 圆圈移动
            // 圆圈移动的距离必须在屏幕范围内
            move(w, h) {
                this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
                this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
                this.x += this._mx / 2;
                this.y += this._my / 2;
            }
        }
        //鼠标点画圆闪烁变动
        class currentCirle extends Circle {
            constructor(x, y) {
                super(x, y)
            }

            drawCircle(ctx) {
                ctx.beginPath();
                //注释内容为鼠标焦点的地方圆圈半径变化
                //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
                this.r = 8;
                ctx.arc(this.x, this.y, this.r, 0, 360);
                ctx.closePath();
                //ctx.fillStyle = 'rgba(0,0,0,' + (parseInt(Math.random() * 100) / 100) + ')'
                ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
                ctx.fill();

            }
        }
        //更新页面用requestAnimationFrame替代setTimeout
        window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        let w = canvas.width = canvas.offsetWidth;
        let h = canvas.height = canvas.offsetHeight;
        let circles = [];
        let current_circle = new currentCirle(0, 0)

        let draw = function () {
            ctx.clearRect(0, 0, w, h);
            for (let i = 0; i < circles.length; i++) {
                circles[i].move(w, h);
                circles[i].drawCircle(ctx);
                for (j = i + 1; j < circles.length; j++) {
                    circles[i].drawLine(ctx, circles[j])
                }
            }
            if (current_circle.x) {
                current_circle.drawCircle(ctx);
                for (var k = 1; k < circles.length; k++) {
                    current_circle.drawLine(ctx, circles[k])
                }
            }
            requestAnimationFrame(draw)
        }

        let init = function (num) {
            for (var i = 0; i < num; i++) {
                circles.push(new Circle(Math.random() * w, Math.random() * h));
            }
            draw();
        }
        window.addEventListener('load', init(60));
        window.onmousemove = function (e) {
            e = e || window.event;
            current_circle.x = e.clientX;
            current_circle.y = e.clientY;
        }
        window.onmouseout = function () {
            current_circle.x = null;
            current_circle.y = null;

        };
    </script>
</div>
</body>