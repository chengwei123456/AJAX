(function (window, undefined) {
    var njQuery = function (selector) {
        return new njQuery.prototype.init(selector);
    }
    njQuery.prototype = {
        constructor: njQuery,
        init: function (selector) {
            //去除字符串两端的空格
            selector = njQuery.trim(selector)

            //1.传入'' null undefined NaN 0 false, 返回空的Jquery对象
            if (!selector) {
                return this;
            }
            else if (njQuery.isFunction(selector)){
                // function 处理
                njQuery.ready(selector);
            }
            //2.字符串
            else if (njQuery.isString(selector)) {
                //2.1 判断是否为代码片段
                if (njQuery.isHTML(selector)) {
                    //1.根据代码片段创建所有的元素
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;
                    //2.将创建好的一级元素添加到Jquery当中
                    // for (var i=0; i< temp.children.length; i++){
                    //     this[i] = temp.children[i];
                    // }
                    // //3. 给jquery对象添加length属性
                    // this.length = temp.children.length;
                    [].push.apply(this, temp.children)
                    return this;
                }
                //2.2判断是否是选择器 
                else {
                    //1.根据传入的选择器找到对应的元素

                    var res = document.querySelectorAll(selector);

                    [].push.apply(this, res);
                    return this;
                }
            }
            //3.对数组处理
            else if (njQuery.isArray(selector)) {
                        //真数组
                        // 伪数组
                        // 将自定义的伪数组转换成真数组
                        var arr = [].slice.call(selector);
                        // 将真数组转换为伪数组
                        [].push.apply(this, arr);
                        return this;
            }
            else {
                this[0] = selector;
                this.length = 1;
                return this;
            }
        },
        jquery: "1.0.0",
        selector: '',
        length : 0,
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function(){
            return [].slice.call(this);
        }
    }

    njQuery.extend = njQuery.prototype.extend = function(obj) {
        for (var key in obj) {
            this[key] = obj[key];
        }
    }

    njQuery.extend({
        isString : function (str) {
            return typeof str === "string"
        },
        isHTML : function (str) {
            return str.charAt(0) == "<" &&
                str.charAt(str.length - 1) == ">" &&
                str.length >= 3
        },
        trim : function (str) {
            if (!njQuery.isString(str)){
                return str;
            }
    
            //判断是否支持trim方法
            if (str.trim) {
                return str.trim()
            } else {
                return str.replace(/^\s+|\s+$/g, "")
            }
        },
        isObject : function(sele){
            return typeof sele === "object"
        },
        isWindow : function(sele) {
            return sele == window 
        },
        isArray : function(sele) {
           if (njQuery.isObject(sele) && 
                !njQuery.isWindow(sele) &&
                'length' in sele){
                    return true;
                }
                else {
                    return false;
                }
        },
        isFunction : function(sele){
            return typeof sele === "function";
        },
        ready: function(fn) {
            //判断DOM是否加载完毕
            if(document.readyState == "complete"){
                fn();
            }else if(document.addEventListener) {
                document.addEventListener("DOMContentLoaded", function(){
                    fn();
                })
            } else {
                document.attachEvent("onreadystatechange", function(){
                    if (document.readyState =="complete"){
                        fn();
                    }
                })
            }
        }
    });

    
    njQuery.prototype.init.prototype = njQuery.prototype;
    window.njQuery = window.$ = njQuery;
})(window);