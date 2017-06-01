/**
 * Created by supfn on 2017/6/1.
 */
$(function($){
    $.fn.slSlider = function(config){
        this.each(function(index, item) {
            var conf = {
                speed : 1000,
                autoSlide : false,
                autoSlideSpeed : 2000,
                sliderUl : "",
                sliderLi : "",
                sliderPoint : "",
                sliderArrow : "",
                isNum:false
            };
            var $this = null,
                $sliderUl = null,
                $sliderLi = null,
                $sliderPoint = null,
                $sliderArrow = null,
                $prev = null,
                $next = null,
                count = 0,
                index = 0,
                startX,
                startY,
                endX,
                endY,
                distanceX,
                distanceY,
                isSliding = false,
                initConfig = function($self, config){
                    if( config instanceof Object )
                        for( var item in config )
                            conf[item] = config[item];
                    $this = $self;
                };

            var initDom = function(){
                $sliderUl = $this.find(conf.sliderUl);
                count = $sliderUl.find(conf.sliderLi).length;
                $sliderUl.html( $sliderUl.html() + $sliderUl.html() );//列表翻倍
                $sliderUl.css({width : (count*2) * $this.width()});//设置宽度
                $sliderLi = $sliderUl.find(conf.sliderLi);
                $sliderLi.css({width : $this.width()});//设置宽度
                if(conf.sliderArrow)
                {
                    $sliderArrow = $this.find(conf.sliderArrow);
                    $prev = $sliderArrow.find(".prev");
                    $next = $sliderArrow.find(".next");
                }
                if(conf.sliderPoint)
                {
                    $sliderPoint = $this.find(conf.sliderPoint);
                    if(conf.isNum)
                    {
                        $sliderPoint.append('<span class="current" data-index="'+ 1 +'">' + 1 +'</span><span>/</span>');
                        $sliderPoint.append('<span class="count" data-index="'+ 1 +'">' + count +'</span>');
                    }else
                    {
                        for(var i = 0; i<count; i++)
                            $sliderPoint.append('<span data-index="'+ i +'"></span>');
                        $sliderPoint.find("span").eq(index).addClass("active");
                    }


                }
            };
            var sliderNext = function(speed, callback){
                console.log(456)
                speed = speed || conf.speed;
                $sliderUl.animate({"right": $this.width() + "px"}, speed, "linear", function(){//右移
                    $sliderLi = $sliderUl.find(conf.sliderLi);
                    var $first = $sliderLi.eq(0);
                    var $last = $sliderLi.eq($sliderLi.length-1);
                    $first.insertAfter($last);
                    $sliderUl.css({"left":"","right":""});
                    isSliding = false;
                    if(callback)
                        callback();
                });
                index = (index+1)%count;//重置指示器
                if(conf.isNum)
                {
                    $sliderPoint.find(".current").html(Math.abs(index));
                }else
                {
                    $sliderPoint.find("span").removeClass("active");
                    $sliderPoint.find("span").eq(index).addClass("active");
                }
                isSliding = true;
            };
            var sliderPrev = function(speed, callback){
                speed = speed || conf.speed;
                $sliderLi = $sliderUl.find(conf.sliderLi);
                var $last = $sliderLi.eq($sliderLi.length-1);
                var $first = $sliderLi.eq(0);
                $last.insertBefore($first);
                $sliderUl.css({"left":-$this.width() + "px"});
                $sliderUl.animate({"left": "0px"}, speed, "linear", function(){//位移完成后重置样式
                    $sliderUl.css({"left":"","right":""});
                    isSliding = false;
                    if(callback)
                        callback();
                });
                index = (index-1)%count;//重置指示器
                if(conf.isNum)
                {
                    $sliderPoint.find(".current").html(Math.abs(index));
                }else
                {
                    $sliderPoint.find("span").removeClass("active");
                    $sliderPoint.find("span").eq(index).addClass("active");
                }
                isSliding = true;
            };
            var sliderByIndex = function(pIndex){
                var abs = Math.abs(pIndex-index);
                var incr = pIndex > index ? abs : -abs;
                var i = 1;
                var next = function(){
                    sliderNext(conf.speed/abs, function(){
                        if(abs > i++)
                            next();
                    });
                };
                var prev = function(){
                    sliderPrev(conf.speed/abs, function(){
                        if(abs > i++)
                            prev();
                    });
                };
                if(incr > 0)
                    next();
                else
                    prev();
            };
            var touchMove = function () {
                $($sliderUl).parent().on('touchstart',function (e) {
                    startX = e.touches[0].pageX;
                    startY = e.touches[0].pageY;
                    console.log(startX,startY)
                })
                $($sliderUl).parent().on('touchend',function (e) {
                    //获取滑动屏幕时的x，y
                    endX = e.changedTouches[0].pageX;
                    endY = e.changedTouches[0].pageY;

                    //获取滑动的距离
                    distanceX = endX - startX;
                    distanceY = endY - startY;

                    //判断滑动方向
                    if(Math.abs(distanceX) > Math.abs(distanceY) && distanceX > 0){
                        //向右滑动

                        console.log("向右滑动")
                        sliderNext()

                    }else if(Math.abs(distanceX)>Math.abs(distanceY) && distanceX<0){
                        //向左滑动
                        console.log("向左滑动")
                        sliderPrev()


                    }
                })
            };


            var initEvent = function(){
                var id = 0;
                if($prev)
                    $prev.click(function(event){//前一项
                        if(isSliding)
                            return false;
                        sliderPrev();
                    });
                if($next)
                    $next.click(function(event){//后一项
                        if(isSliding)
                            return false;
                        sliderNext();
                    });
                if($sliderPoint)
                    $sliderPoint.on("click", "span", function(event){//点击指示器
                        var $e = $(event.target);
                        var pIndex = $e.attr("data-index");
                        if(pIndex == index)
                            return false;
                        sliderByIndex(pIndex);
                    });
                if(conf.autoSlide)
                {
                    id = setInterval(function(){
                        sliderNext();
                    },conf.autoSlideSpeed);
                    if($this.hover)
                        $this.hover(function(event){
                            clearInterval(id);
                        });
                    if($this.mouseleave)
                        $this.mouseleave(function(event) {
                            clearInterval(id);
                            id = setInterval(function(){
                                sliderNext();
                            },conf.autoSlideSpeed);
                        });
                }
                $("."+$this.attr("class")).on("swipeLeft", null, function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    sliderNext();
                });
                $("."+$this.attr("class")).on("swipeRight", null, function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    sliderPrev();
                });
            };
            initConfig($(item), config);//初始化设置
            initDom();
            initEvent();
            touchMove();
        });
    };
}(Zepto || jQuery));
$(".slider_box_index").slSlider({//初始化滚动图
    sliderUl : ".slider_ul_index",
    sliderLi : ".slider_li_index",
    sliderPoint : ".slider_point_index",
    speed:500,
    autoSlide:true,
    autoSlideSpeed:5000
});