<template>
    <div>
        <bui-header
                title="通讯录"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="startContactSingleSelector" :title="'调用平台选人界面(单选)(startContactSingleSelector)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startContactMulitSelector" :title="'调用平台选人界面(多选)(startContactMulitSelector)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="onRemoveFromSelectedArea" :title="'选人界面扩展事件：监听全局移除事件(onRemoveFromSelectedArea)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startUserCard" :title="'打开指定userId用户的名片(startUserCard)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openContactPage" :title="'打开通讯录页面(openContactPage)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
        </scroller>
    </div>
</template>

<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>

<script>
    module.exports = {
        data: function () {
            return {
                leftItem: {
                    icon: 'ion-chevron-left'
                },

            }
        },
        components: {

        },
        methods: {
            back() {
                this.$pop();
            },
            startContactSingleSelector(){
                this.linkapi.startContactSingleSelector("单选选人", 1, (res)=>{
                    this.$alert(res);
                }, (error)=>{
                    this.$alert(error);
                });
            },
            startContactMulitSelector(){
                this.linkapi.startContactMulitSelector("多选选人", 1, (res)=>{
                    this.$alert(res);
                }, (error)=>{
                    this.$alert(error);
                });
            },
            onRemoveFromSelectedArea(){
                this.$alert('监听全局移除事件----@param model : 选择的model，包含id,name,icon,type');
            },
            startUserCard(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.startUserCard(res.userId);
                });
            },
            openContactPage(){
                this.linkapi.openContactPage();
            }
        },
        mounted: function () {

        }
    }
</script>
