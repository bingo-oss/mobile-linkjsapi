<template>
    <div>
        <bui-header
                title="服务号"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="sendServiceAccountNotice" :title="'发送服务号公告(sendServiceAccountNotice)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openServiceAccountCard" :title="'查看服务号名片页(openServiceAccountCard)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openServiceAccountList" :title="'查看已关注服务号列表(openServiceAccountList)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="addServiceAcccount" :title="'打开添加服务号页面(addServiceAcccount)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startServiceAccountChat" :title="'打开服务号聊天界面(startServiceAccountChat)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            sendServiceAccountNotice(){
                this.linkapi.sendServiceAccountNotice("70975e19-6b70-46ec-86a6-9788f1eb5457", 0);
            },
            openServiceAccountCard(){
                this.linkapi.openServiceAccountCard("70975e19-6b70-46ec-86a6-9788f1eb5457");
            },
            openServiceAccountList(){
                this.linkapi.openServiceAccountList();
            },
            addServiceAcccount(){
                this.linkapi.addServiceAcccount();
            },
            startServiceAccountChat(){
                this.linkapi.startServiceAccountChat("70975e19-6b70-46ec-86a6-9788f1eb5457");
            }
        },
        mounted: function () {

        }
    }
</script>
