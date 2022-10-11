<template>
  <div class="hover">
    <p>clearInterval() 方法//此方法能够取消setInterval()方法设置的定时器。</p>
    <p>clearTimeout对应的是setTimeout，clearInterval对应的是setInterval，</p>
    <div class="red" style="display:flex;">
      <div  style="display: inline-block; border:1px solid salmon;">
        <ul id="mesviewssss" @mouseenter="enterone" @mouseleave="leaveone">
          <li v-for="item in 5" :key="item">
            {{ item }}--{{text}}
          </li>
        </ul>
      </div>
      <div  style="border:1px solid gold; display: inline-block; width: 300px;height: 100px;" @mouseenter="enter" @mouseleave="leave">
        {{ message }}--{{mestext}}
      </div>
      <div style="border:1px solid chocolate; width: 300px;">
        <p>trabsform属性</p>
        <div class="div50red box"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'hover',
  components: {},
  data () {
    return {
      message: '默认值',
      mestext:'鼠标',
      timer: null,
      text:'执行中'
    }
  },
  mounted () {
    // @ts-ignore
    this.timer = setInterval(this.scroll, 6000)
  },
  methods: {
    scroll () {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#mesviewssss')
        // @ts-ignore
        container.style.cssText = 'transform:translate(0,0)'
        // container.style.cssText = `transition:opacity .3s;`;
        // @ts-ignore
        container.appendChild(container.children[0]) // 把第一个DOM添加到最后一个去
        // container.scrollTop = container.scrollHeight;
      })
    },
    enter () {
      this.message = '修改值'
      this.mestext="鼠标进入"
    },
    leave () {
      //  leave: function(e){
      this.message = '默认值111';
      this.mestext="鼠标出来"
    },
    enterone () {
      // @ts-ignore
      clearInterval(this.timer)
      this.timer = null
      this.text='进入停止切换'
    },
    leaveone () {
      // @ts-ignore
      this.timer = setInterval(this.scroll, 6000)
      this.text='出来继续切换'
    }
  },
  beforeDestroy () {
    // @ts-ignore
    clearInterval(this.timer)
    this.timer = null
    console.log('页面刷新，销毁实例')
  }
}
</script>

<style scoped>
.hover {
  border: 1px solid red;
}
ul {
  width: 300px;
  height: 100px;
  border: 1px solid chartreuse;
  text-align: center;
  overflow: hidden;
}
ul li {
  list-style-type: none;
  border: 1px solid blue;
  width: 250px;
  height: 50px;
  margin: 25px 0;
}

.box{
  /* transition:width 2s; 恢复时间*/
  /* transition-delay: 2s;*持续时间 */
}
.box:hover{
  transition:all 1s;/*时间1s */
  /* transform: skewX(80deg);transform:rotateX(360deg);横向旋转80,360 */
  /* skew分别表示X轴和Y轴倾斜的角度，取值类型为角度值deg */
  /* transform:translate(250px,0px);向右边平移200px */
  /* transform:scale(0.5)缩放一倍 */
transform:scale(1) rotateY(0deg) rotateZ(180deg);
}
</style>
