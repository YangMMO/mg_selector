<template>
  <!-- <div class="hello">Hello {{ mg }}</div> -->
  <div class="page">
    <!-- <div>
      <div>在当前页的</div>
      <span class="layer p br">XXX层</span>
      <span>进行查找</span>
    </div> -->

    <div class="input-box br">
      <i class="ri-search-line"></i>
      <input type="text" placeholder="搜索图层名称" @input="inputValue" :value="searchValue">
    </div>

    <div>
      <!-- <div name="type-is">
        <span>包含类型</span>
        <span>不包含类型</span>
      </div> -->
      <ul name="type-select">
        <li
          v-for="(type, key) in types" 
          :key="key" 
          :class="['p br tag-box', { active: activeType === key }]"
          @click=" activeType = activeType === key ? '' : key "
        >
          {{ type.title_cn }}
        </li>
      </ul>
    </div>
    <div class="check">
      <span><input type="checkbox" :checkedValue="exact" @click="exact= !exact">精确匹配</span>
    </div>
    
    
    <div class="line">
      <button class="btn br" @click="searchClick">查找</button>
    </div>

    <div class="copyright">
      <p><a href="https://www.mmoo.fun/" target="_blank">@MMOO.FUN</a> V0.2.0 更新时间2022-4-11</p>
      <p>感谢MasterGo官方大佬: haomengyuan6 的帮助</p>
      <span>下一版本计划：</span>
      <ul class="next-updata">
        <li>1.根据选中项查找</li>
        <li>2.支持类型查询（已完成部分）</li>
      </ul>
    </div>

  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      types: {
        FrameNode: {
          title_cn: '画板(容器)'
        },
        ComponentNode: {
          title_cn: '组件'
        },
        InstanceNode: {
          title_cn: '实例'
        },
        GroupNode: {
          title_cn: '群组'
        },
        TextNode: {
          title_cn: '文本'
        },
        PenNode: {
          title_cn: '钢笔形状'
        },
        LineNode: {
          title_cn: '直线'
        },
        StarNode: {
          title_cn: '星型'
        },
        EllipseNode: {
          title_cn: '圆形'
        },
        RectangleNode: {
          title_cn: '矩形'
        },
        PolygonNode: {
          title_cn: '多边形'
        },
        // BooleanOperationNode: {
        //   title_cn: '布尔图层'
        // },
      },
      activeType: '',
      // NodeTypes: [
      //     'GroupNode',
      //     'FrameNode',
      //     'PenNode',
      //     'StarNode',
      //     'LineNode',
      //     'EllipseNode',
      //     'PolygonNode',
      //     'RectangleNode',
      //     'TextNode',
      //     'ComponentNode',
      //     'InstanceNode',
      //     'BooleanOperationNode'
      // ]
    }
  },
  setup() {
    return {
      searchValue: '',
      exact: false,
    }
  },
  created() {
    window.resizeTo(320,640);
  },
  methods: {
    inputValue (e) {
      let value = e.target.value
      this.searchValue =  value
    },
    searchClick () {
      // if (this.searchValue === "") {
      //   alert('请填入匹配值')
      //   return
      // }
      parent.postMessage({
        searchValue: this.searchValue,
        exact: this.exact,
        activeType: this.activeType,
      }, '*')
    },
    clg (param) {
      console.log(param);
    }
  },
})
</script>

<style>

ul {
  padding: 0;
}
li {
  display: inline-block;
}
.page {
  /* width: 320px; */
  /* height: ; */
  padding: 20px;
  background: #fff;
  border: 1px #ededed solid;
  color: rgb(0, 102, 22);
}
.p {
  padding: 4px;
  margin-bottom: 4px;
}
.p:not(:last-child) {
  margin-right: 4px;
}
.br {
  border-radius: 4px;
}
.input-box {
  display: flex;
  padding: 4px;
  align-items: center;
  background: rgb(237, 255, 241);
}
.input-box i {
  padding: 0 4px;
}
input {
  width: 100%;
  border: none;
  background: none;
  outline: none;
  
}
input::-webkit-input-placeholder {
  color: rgb(175, 206, 182);
}
.tag-box {
  background: rgb(226, 243, 230);
  color: rgb(149, 204, 160);
  cursor: pointer;
}
.tag-box:hover {
  background: rgb(214, 248, 222);
  color: rgb(30, 187, 61);
}
.tag-box.active {
  background: rgb(0, 102, 22);
  color: #fff;
}
.btn {
  width: 100%;
  padding: 8px;
  background: rgb(229, 252, 234);
  border: 1px rgb(0, 102, 22) solid;
  color: rgb(0, 102, 22);
  outline: none;
  transition: all 0.5s;
  cursor: pointer;
}
.btn:hover {
  background: rgb(0, 102, 22);
  color: #fff;
  box-shadow: 4px 0 8px 0 rgba(0, 102, 22, 0.25);
}
.layer {
  display: inline-block;
  background: rgb(255, 207, 162);
  color: rgb(255, 141, 34);
  font-size: 12px;
}

.check {
  margin: 12px 0;
}
.check input{
  width: auto;
  margin-right: 4px;
}

.copyright {
  margin: 12px 0;
  font-size: 12px;
}

.line {
  padding-bottom: 20px;
  margin-bottom: 20px;
  position: relative;
}

.line::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #ededed;
  /* transform: scaleY(0.5); */
  
}

.next-updata li {
  display: block;
  line-height: 1.45rem;
}
</style>