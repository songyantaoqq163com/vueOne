<template>
    <div id="app">
        <img v-for="item in extraImgList" :key="item.index" :src="item.url" width="50" />
        <p>画布</p>

        <canvas ref="bargraphCanvas" :width="canvasWidth" :height="canvasHeight" class="canvasbor"
            :style="'width:' + canvasWidth / 2 + 'px;height:' + canvasHeight / 2 + 'px;'"></canvas>


    </div>
</template>
<script>
// @ts-nocheck

export default {
    data() {
        return {
            canvasWidth: 1400, // 画布大小
            canvasHeight: 400,
            myCanvas: null,
            ctx: null,
            imgX: 200, // 图片在画布中渲染的起点x坐标，这个坐标为后期的添加注释图片、文字位置提供了相对坐标点
            imgY: 100,
            imgScale: 0.9, // 图片启示的缩放大小
            // @ts-ignore
            imgObject: [],
            extraImgList: [{ url: require('../../assets/logo1.png'), x: 0, y: 0, width: 140, height: 100 }, { url: require('../../assets/logo1.png'), x: 200, y: 0, width: 140, height: 100 }]
        }
    },
    mounted() {
        setTimeout(() => {
            // @ts-ignore
            this.myCanvas = this.$refs.bargraphCanvas;
            // @ts-ignore
            this.ctx = this.myCanvas.getContext('2d');
            this.loadImg();
            //缩放
            this.canvasEventsInit();
        })
    },
    methods: {
        loadImg() {
            var _this = this;
            let extraImgList = _this.extraImgList;
            let length = extraImgList.length;
            var imageList = [];
            let count = 0;
            //加载底层图片，这个先后顺序一定要有，不然用来注释的图片可能会被底层图片覆盖
            // @ts-ignore
            // var isBgLoaded = false;
            var img = new Image();
            var bgImg = extraImgList[0];
            img.src = bgImg.url;
            img.onload = () => {
                imageList.push({ img: img, x: bgImg.x, y: bgImg.y, width: bgImg.width, height: bgImg.height });
                ++count;
                if (length > 1) { // 加载多张图片
                    //加载剩余图片
                    for (let key = 1; key < length; key++) {
                        let item = extraImgList[key];
                        let extarImg = new Image();
                        extarImg.src = item.url;
                        extarImg.onload = () => {
                            imageList.push({ img: extarImg, x: item.x, y: item.y, width: item.width, height: item.height })
                            if (++count >= length) { // 判断是否所有的图片都被预加载完成
                                // @ts-ignore
                                _this.imgObject = imageList;
                                // @ts-ignore
                                _this.drawImage(imageList);
                            }
                        }
                    }
                } else { //只加载一张图片
                    // @ts-ignore
                    _this.imgObject = imageList;
                    // @ts-ignore
                    _this.drawImage(imageList);
                }
            }
        },
        drawImage(imgList) {
            var _this = this;
            _this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 先清空画布
            for (let i = 0; i < imgList.length; i++) {
                _this.ctx.drawImage(
                    imgList[i].img, //规定要使用的图片
                    // imgList[i].x,imgList[i].y,
                    _this.imgX + imgList[i].x * _this.imgScale, _this.imgY + imgList[i].y * _this.imgScale,//在画布上放置图像的 x 、y坐标位置
                    imgList[i].width * _this.imgScale, imgList[i].height * _this.imgScale //要使用的图像的宽度、高度
                );
            }
            // this.ctx.font="15px Arial";  // 添加文字注释
            // this.ctx.fillStyle = "black"
            // this.ctx.fillText("name",this.imgX + 120 * this.imgScale, this.imgY+ 25 * this.imgScale);
        },
        canvasEventsInit() {
            var _this = this;
            var canvas = _this.myCanvas;

            canvas.onmousedown = function (event) {
                var imgx = _this.imgX;
                var imgy = _this.imgY;
                var pos = { x: event.clientX, y: event.clientY };  //获取相对浏览器窗口的坐标，为后期将窗口坐标转换成canvas的坐标做准备
                canvas.onmousemove = function (evt) {  //移动
                    canvas.style.cursor = 'move';
                    var x = (evt.clientX - pos.x) * 2 + imgx; //坐标转换
                    var y = (evt.clientY - pos.y) * 2 + imgy;
                    _this.imgX = x;
                    _this.imgY = y;
                    _this.drawImage(_this.imgObject);  //重新绘制图片
                };
                canvas.onmouseup = function () {
                    canvas.onmousemove = null;
                    canvas.onmouseup = null;
                    canvas.style.cursor = 'default';
                };
            };

            canvas.onmousewheel = canvas.onwheel = function (event) {    //滚轮放大缩小
                var wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltalY * (-40));  //获取当前鼠标的滚动情况
                if (wheelDelta > 0) { // 放大时，每次放大到原来的1.1倍
                    _this.imgScale *= 1.1; //注意，我的缩放是以左上角位置为中心进行缩放的，如果要以图片中心为缩放点，需要修改 imgX，imgY的值
                } else {
                    if (_this.imgScale > 0.9) { // 缩小到原来的0.9倍
                        _this.imgScale *= 0.9;
                    }
                }
                _this.drawImage(_this.imgObject);   //重新绘制图片
                event.preventDefault && event.preventDefault(); // 阻止默认事件，可能在滚动的时候，浏览器窗口也会滚动
                return false;
            };
        },

    }
    // @ts-ignore
}
</script>
<style>
.canvasbor {
    border: 1px solid red;
}
</style>