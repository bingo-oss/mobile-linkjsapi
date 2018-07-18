<template>
  <div>
    <bui-header title="BUI-weex-linkapi" :leftItem="leftItem" @leftClick="back">
    </bui-header>
    <scroller>
      <!--<catalog title="消息"></catalog>-->
      <bui-cell @cellClick="jumpTo(item.url)" :title="item.name" :key="index" v-for="(item,index) in layout">
        <bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon>
      </bui-cell>
    </scroller>
  </div>
</template>

<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>

<script>
    // import catalog from './catalog.vue';
    const globalEvent = weex.requireModule('globalEvent');
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },
                layout: [
                    {name: "用户", text: "", url: "user-demo.weex.js"},
                    {name: "群组", text: "", url: "group-demo.weex.js"},
                    {name: "部门", text: "", url: "org-demo.weex.js"},
                    {name: "服务号", text: "", url: "serve-demo.weex.js"},
                    {name: "组织", text: "", url: "grid-demo.weex.js"},
                    {name: "通讯录", text: "", url: "notebook-demo.weex.js"},
                    {name: "消息", text: "", url: "msg-demo.weex.js"},
                    {name: "动态", text: "", url: "microblog-demo.weex.js"},
                    {name: "应用", text: "", url: "appRun-demo.weex.js"},
                    {name: "定位", text: "", url: "location-demo.weex.js"},
                    {name: "我的", text: "", url: "my-demo.weex.js"},
                    {name: "流程", text: "", url: "flow-demo.weex.js"},
                    {name: "云盘", text: "", url: "disk-demo.weex.js"},
                    {name: "网络请求", text: "", url: "request-demo.weex.js"},
                    {name: "其他", text: "", url: "other-demo.weex.js"},
                ]
            }
        },
        components: {
            // catalog
        },
        methods: {
            jumpTo (file) {
                if (file) {
                    var url = file;
                    this.$push(url);
                }
            },
            back () {
                this.$pop();
            }
        },
        mounted: function () {
            globalEvent.addEventListener("androidback",(e)=> {
                this.$pop();
            });

        }
    }
</script>
