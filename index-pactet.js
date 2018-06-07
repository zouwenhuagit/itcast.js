/**
 * Created by Administrator on 2016/10/29.
 */
window.onload=function(){
    headerEffect();
    bannerLoop();
}

/*顶部背景透明变换效果*/
function headerEffect(){
    /*获取顶部块*/
    var header = document.querySelector("header");
    /*获取banner*/
    var banner=document.querySelector(".banner");
    /*获取高度*/
    var height=banner.offsetHeight;
    /*添加widnow的滚动事件*/
    window.onscroll=function() {
        /*获取文档滑出屏幕顶部之外的距离*/
        var offstTop=document.body.scrollTop;
        var opacity=0;
        if(offstTop < height){
            opacity=offstTop/height;
        }
        else{
            opacity=1;
        }
        header.style.backgroundColor="rgba(233,35,34,"+opacity+")";
    }
}


/*轮播图*/
function bannerLoop(){
    /*1.获取banner*/
    var banner=document.querySelector(".banner");
    /*2.获取banner的宽度*/
    var bannerW=banner.offsetWidth;
    /*3.获取需要动画的图片盒子*/
    var imgBox=banner.querySelector("ul:first-of-type");
    /*4定义图片的索引:为什么从1开始，因为图片已经有一个默认的偏移*/
    var index=1;
    /*5.开启定时器*/
    var timerId=setInterval(function(){
        /*6.增加索引*/
        index++;
        /*判断索引是否越界，如果是，则重置到起始位置*/
        /*7.添加过渡*/
        imgBox.style.transition="all 0.3s";
        imgBox.style.webkitTransition="all 0.3s";
        /*8.设置偏移*/
        imgBox.style.transform="translateX("+(-index*bannerW)+"px)";
        imgBox.style.webkitTransform="translateX("+(-index*bannerW)+"px)";
        /*如果跳到最后一张，则以非过渡的方式将图片移动到索引1的位置*/
        if(index==9){
            index=1;
            setTimeout(function(){
                imgBox.style.transition="none";
                imgBox.style.webkitTransition="none";
                /*8.设置偏移*/
                imgBox.style.transform="translateX("+(-index*bannerW)+"px)";
                imgBox.style.webkitTransform="translateX("+(-index*bannerW)+"px)";
            },300);
        }
    },2000);

    /*6.为轮播图添加touch事件*/
    var startX=0;//起始X位置
    var moveX=0;//记录滑动过程中的x位置
    var distanceX=0;//一次滑动触摸时的x轴方向的偏移量

    /*封装常用的操作*/
    /*1.开启过渡*/
    var openTransition=function(){
        imgBox.style.transition="all 0.3s";
        imgBox.style.webkitTransition="all 0.3s";
    };
    /*2.关闭过渡*/
    var closeTransition=function(){
        imgBox.style.transition="none";
        imgBox.style.webkitTransition="none";
    }
    /*3.设置偏移*/
    var setTransform=function(distanceX){
        imgBox.style.transform="translateX("+(distanceX)+"px)";
        imgBox.style.transform="webkitTranslateX("+(distanceX)+"px)";
    }

    /*手指开始触摸*/
    imgBox.addEventListener("touchstart",function(e){
        /*按下手指的时候：能够拉住轮播--暂停时钟--touchstart*/
        clearInterval(timerId);
        /*记录起始位置*/
        startX= e.touches[0].clientX;
    });
    /*手指滑动*/
    imgBox.addEventListener("touchmove",function(e){
        /*记录滑动时的x的位置*/
        moveX= e.touches[0].clientX;
        /*计算偏移量*/
        distanceX=moveX-startX;
        /*设置偏移:偏移默认都是参照元素是了原始的坐标(左上角)。所以在设置偏移的时候需要先考虑当前的索引位置，在当前索引位置的基础再进行偏移*/
        setTransform(-index*bannerW+distanceX);
    });
    /*手指离开*/
    imgBox.addEventListener("touchend",function(e){
        /*当手指松开的时候，需要判断当前滑动的距离是否超出当前轮播图的1/3,如果超过，则翻页，否则回弹--touchend.再次开启时钟*/
        if(Math.abs(distanceX) > bannerW/3){
            /*判断方向*/
            if(distanceX>0){
                index--;
                /*开启过渡*/
                openTransition();
                /*设置偏移*/
                setTransform(-index*bannerW);
            }
            else if(distanceX<0){
                index++;
                /*开启过渡*/
                openTransition();
                /*设置偏移*/
                setTransform(-index*bannerW);
            }
        }
        else{
            //当前滑动没有超过1/3
            openTransition();
            /*设置偏移*/
            setTransform(-index*bannerW);
        }

        /*重新开启时钟*/
        timerId=setInterval(function(){
            /*6.增加索引*/
            index++;
            /*判断索引是否越界，如果是，则重置到起始位置*/
            /*7.添加过渡*/
            openTransition();
            /*8.设置偏移*/
            setTransform(-index*bannerW);
        },2000);
    });

    /*为轮播图添加过渡效果执行完毕的监听事件：当一个过渡效果执行完毕会触发这个事件*/
    imgBox.addEventListener("transitionEnd",function(){
        /*判断当前索引，如果是最后一张，就调用索引1，如果是最前面一张，就调用索引8*/
        if(index==0){
            index=8;
            /*关闭过渡*/
            closeTransition();
            /*8.设置偏移*/
            setTransform(-index*bannerW);
        }
        else if(index==9){
            index=1;
            closeTransition();
            /*8.设置偏移*/
            setTransform(-index*bannerW);
        }
    });
    imgBox.addEventListener("webkitTransitionEnd",function(){
        if(index==0){
            index=8;
            closeTransition();
            /*8.设置偏移*/
            setTransform(-index*bannerW);
        }
        else if(index==9){
            index=1;
            closeTransition();
            /*8.设置偏移*/
            setTransform(-index*bannerW);
        }
    });
}