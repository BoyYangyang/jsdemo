自己平时一些练习的demo
```
├── GulpBootStrapSass-master    // 基于ES6利用Gulp编译BootStrap-Sass源码
├── Sortable-master             // JQuery的Sortable插件源码
├── bootstrap-sass-master       // 基于ES6利用Gulp编译BootStrap-Sass练习
├── canvas-star                 // canvas-star源码
├── canvas2                     // HTML5 Canvas菱角背景动画特效
├── checkbox                    // 自定义 checkout 
│   ├── input.html              // 自定义 input
│   ├── checkbox.html           // 自定义 checkbox 选择框
│   ├── rounded-chexkbox.html   // 自定义圆形选择框 
│   ├── ios-checkbox.html       // 自定义 ios 风格选择框 
│   └── slider-checkbox.html    // 自定义 slide 风格选择框 
├── copy-canvas-start           // canvas-star 特效练习
│   ├── canvasstar.js           // 封装 canvasstar
│   ├── demo.html               // 完整版 canvasstar 优化完代码
|   ├── cache-optimization.html // 使用离屏渲染优化源码
|   ├── cache-star.html         // cache 离屏渲染 star
|   ├── mydialog.js             // 封装一个运算插件
|   ├── test.html               // 测试使用 mydialog.js 
│   └── test2.html              // 测试使用 canvasstar.js 
├── drag                        // 交换两个 div 中的内容
├── email-51fang                // 51 房邮件模板
├── functional                  // 函数式编程练习
├── html5-css3-checkbox-styles  // css3-checkbox 练习
├── html5-css3-input-styles     // css3-input 源码
├── sort-demo                   // 使用 sort 插件 demo
└── tab
```

```
<script>
    var a = [1, [2, [3, 4, [7, 7, 8]]], [5], 6];


    function handler(arr) {
        var str = JSON.stringify(arr);
        console.log(str)
        str = str.replace(/[\[\]]/g, '');
        console.log(str)
        arr = eval('[' + str + ']');
        return arr;
    }

    handler(a);
</script>
<script>
    var a = [1, [2, [3, 4, [7, 7, 8]]], [5], 6];


    function handler(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                arr.splice(i, 1)[0].map(function (item, index) {
                    arr.splice(i + index, 0, item);
                })
            }
        }
        return arr;
    }
    handler(a);
</script>

<script>
    var a = [1, [2, [3, 4, [7, 7, 8]]], [5], 6];

    function flat(arr) {
        return arr.reduce(
            function (acc, val) {
                return acc.concat(Array.isArray(val) ? flat(val) : val)
            }, []);
    }

    flat(a);
</script>

<script>
    var a = [1, [2, [3, 4, [7, 7, 8]]], [5], 6];

    function handler(arr) {
        var str = arr.toString();
        str = str.replace(/[\[\]]/g, ' ');
        return str.split(",");
    }

    handler(a)
</script>
数组去重
<script>
    var arr = [1,1,1,1,2,3,3,4,5,7,7,7];
    function unique(arr){
        return Array.from(new Set(arr))
    }
    unique(arr)
</script>
<script>
    var arr = [1,1,1,1,2,3,3,4,5,7,7,7];
    function unique(arr){
        var ret = [];
        arr.forEach(function (item) {
            if(ret.indexOf(item) === -1){
                ret.push(item)
            }
        });
        return ret;
    }
    unique(arr)
</script>
继承
<script>
    var a = [1,2,3];
    var b = [4,5,6];
    var deepCopy = function(_result,a) {
        for (var k in a) {
            _result[k] = typeof a[k] ==='object' ? deepCopy(a[k]) : a[k]
        }
        return _result
    };
    function inherit(a, b) {
        var _result = Object.create(b);
        Object.assign(_result,a);
        /*Object.keys(a).forEach(key => {
            _result[key] = a[key]
        });*/
        return _result
    }
    inherit(a,b);
    console.log(_result)

</script>
```
