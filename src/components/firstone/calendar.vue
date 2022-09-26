<template>
  <div class="calendar">
    <el-row>
      <el-col :span="3" :offset="1">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @select="handleselect"
        >
          <!-- <el-submenu index="1">
            <template slot="title">
                <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <el-submenu v-for="(item,index) in submenuList" :key="index">
            <template slot="title">
                <span>{{item.span}}</span>
            </template>
            <el-menu-item-group v-for="(itemA,index1) in item.child" :key="index1">
              <el-menu-item :index="itemA.id">{{itemA.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <el-tabs
          v-model="editableTabsValue"
          type="border-card"
          editable
          @edit="handleTabsEdit"
        >
          <el-tab-pane
            v-for="(item, index) in editableTabs"
            :key="index"
            :label="item.title"
            :name="item.name"
          >
            {{ item.content }}
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ts-nocheck

import { list } from '_postcss@7.0.39@postcss';

export default {
  name: "calendar",
  components: {},
  data() {
    return {
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content",
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content",
        },
        {
          title: "Tab 3",
          name: "3",
          content: "Tab 3 content",
        },
      ],
      tabIndex: 3,
      submenuList:[{
        span:'导航一',
        id:'1',
        child:[{
          title:'项目一',
          id:'1-1'
        },{
          title:'项目二',
          id:'1-2'
        }]
      }],
      subment:[]
    };
  },
  created(){
    for(var i=0;i<this.submenuList.length;i++){
        for(var j=0;j<this.submenuList[i].child.length;j++){
          let Obj=this.submenuList[i].child[j]
          this.subment.push(Obj)
        }
      }
      
  },
  methods: {
    handleTabsEdit(targetName, action) {
      //新增
      if (action === "add") {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: targetName+newTabName,
          name: newTabName,
          content: "New Tab content",
        });
        this.editableTabsValue = newTabName;
      }
      //删除
      if (action === "remove") {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      }
    },
    handleselect(index,indexPath){
      console.log(10,index,indexPath)
      console.log(11,this.subment)
      let list=this.subment.find(item=>item.id==index)
      this.handleTabsEdit(list.title,"add")
    }
  },
};
</script>

<style scoped>
.val {
  width: 800px;
  height: 700px;
  margin: 0 auto;
}
/* .el-calendar__header{
    height: 35px;
} */
</style>
