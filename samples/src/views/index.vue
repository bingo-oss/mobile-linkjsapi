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
                    {name: "用户", text: "", url: "user-demo.js"},
                    {name: "群组", text: "", url: "group-demo.js"},
                    {name: "部门", text: "", url: "org-demo.js"},
                    {name: "服务号", text: "", url: "serve-demo.js"},
                    {name: "组织", text: "", url: "grid-demo.js"},
                    {name: "通讯录", text: "", url: "notebook-demo.js"},
                    {name: "消息", text: "", url: "msg-demo.js"},
                    {name: "动态", text: "", url: "microblog-demo.js"},
                    {name: "应用", text: "", url: "appRun-demo.js"},
                    {name: "定位", text: "", url: "location-demo.js"},
                    {name: "我的", text: "", url: "my-demo.js"},
                    {name: "流程", text: "", url: "flow-demo.js"},
                    {name: "云盘", text: "", url: "disk-demo.js"},
                    {name: "网络请求", text: "", url: "request-demo.js"},
                    {name: "其他", text: "", url: "other-demo.js"},
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
