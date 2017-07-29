var nameSpance= window.nameSpance|| {};


nameSpance.canvasStar=(function(){
    //这里可以存放私有属性和私有方法,不对外开放，防止其他开发者私自改动
    var privateMethod = {
        paraHandling:function(option){
            var configTemp ;
            if(option.config != undefined){  //开发者设置了值
                option.config.imgArr== undefined ? option.config.imgArr =config.imgArr:null;
                option.config.imgSecond== undefined ? option.config.imgSecond = config.imgSecond:null;
                option.config.isRandom== undefined ? option.config.isRandom = config.isRandom:null;
                configTemp = option.config;
            }else{
                configTemp = config;
            };
            return configTemp;
        },



    //这里为抛出对象，供开发者使用的
    var canvasStar = {
        publicAttr : true,
        publicMethod : function(){
            console.log("这是抛出方法，供开发者使用...")
        }
    };

    return publicObject;
})();
