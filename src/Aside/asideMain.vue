<template>
  <div class="asideMain">
    <el-row id="test" class="Mainleft">
      <Multipane class="vertical-panes">
        <el-col :span="three" ref="mainMenu" :style="{ minWidth: '180px', maxWidth: '500px', backgroundColor: '#fff' }">
          <el-scrollbar>
            <div id="menu">
              <AMChild></AMChild>
            </div>
          </el-scrollbar>
        </el-col>
        <multipane-resizer></multipane-resizer>
        <el-col :span="span21" class="Mainright">
          <Breadcrumb :levelListdata="levelList"></Breadcrumb>
          <el-scrollbar>
            <div class="routerview">
              <router-view />
            </div>
          </el-scrollbar>
        </el-col>
      </Multipane>
    </el-row>
  </div>
</template>
<script>
// @ts-nocheck

import { Multipane, MultipaneResizer } from 'vue-multipane';
import Breadcrumb from "./Breadcrumb.vue"
import AMChild from "./AMChild";
import conmheader from "@/js/conmheader";
export default {
  name: "asideMain",
  components: {
    Breadcrumb,
    AMChild,
    Multipane,
    MultipaneResizer
  },
  data() {
    return {
      three: 3,
      span21: 21,
      levelList: null
    };
  },
  created() {

    this.initName();
  },
  methods: {
    initName() {
      let keyList = JSON.parse(sessionStorage.getItem("keylist"))
      if (keyList.length > 0) {
        this.levelList = keyList
      } else {
        this.levelList = []
      }
    },

  },
  watch: {
    $route(to, from) {
      if (to.fullPath !== from.fullPath) {
        let keyList = JSON.parse(sessionStorage.getItem("keylist"))
        this.levelList = keyList
      }
    }
  }
};
</script>

<style>
.login-bg {
  width: 100%;
  height: 100%;
  background: #409eff;
}

.Mainright {
  height: calc(100vh - 80px);
  overflow-y: auto;
  background: #fff;
}

#breadcrumb {
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  box-shadow: 0 -12px 12px 12px #409eff;
}

.routerview {
  margin: 5px;
  padding: 5px;
  height: calc(100vh - 130px);
  overflow-y: auto;
  box-shadow: 0 0 20px 5px #d3dce6;
  border-radius: 5px;
}


.vertical-panes {
  width: 100%;
  height: calc(100vh - 170px);
  /* border: 1px solid red; */
}

.vertical-panes>.pane {
  overflow: hidden;
}

.layout-v>.multipane-resizer {
  margin-left: -6px;
}</style>