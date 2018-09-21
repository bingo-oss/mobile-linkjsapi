<template>
    <div>
        <bui-header
                title="群组"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="createGroup" :title="'创建群组(createGroup)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="joinGroup" :title="'加入群组(joinGroup)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openGroupList" :title="'打开群组列表(openGroupList)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startGroupCard" :title="'打开群组的名片页面(startGroupCard)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="sendGroupNotice" :title="'打开群组发公告页面(sendGroupNotice)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openGroupNoticeList" :title="'打开群组公告列表(openGroupNoticeList)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startGroupChat" :title="'该接口用于调用Link的群组聊天页面(startGroupChat)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openGroupBulletinDetail" :title="'打开一个群组公告详情(openGroupBulletinDetail)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startGroupBulletinEdit" :title="'打开群公告发表界面(startGroupBulletinEdit)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startGroupChat" :title="'该接口用于调用Link的群组聊天页面(startGroupChat)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startGroupChat" :title="'该接口用于调用Link的群组聊天页面(startGroupChat)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            createGroup(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.createGroup({
                        userIds: res.userId
                    }, (res)=>{
                        this.$alert(res);
                    }, (error)=>{
                        this.$alert(error);
                    });
                });
            },
            joinGroup(){
                this.linkapi.getUserInfoByCellphoneOrEmail('16600000001', (res)=>{
                    this.linkapi.joinGroup('f87a23ed-9662-4a91-9a3b-ff680873e5dd', [res.userId],(respone)=>{
                        this.$alert("回调成功");
                        this.$alert(respone);
                    }, (error)=>{
                        this.$alert("回调失败");
                        this.$alert(error);
                    });
                });
            },
            openGroupList(){
                this.linkapi.openGroupList();
            },
            startGroupCard(){
                this.linkapi.startGroupCard('f87a23ed-9662-4a91-9a3b-ff680873e5dd', (resp)=>{
                    this.$alert(resp);
                }, (error)=>{
                    this.$alert(error);
                });
            },
            sendGroupNotice(){
                this.linkapi.sendGroupNotice('f87a23ed-9662-4a91-9a3b-ff680873e5dd');
            },
            openGroupNoticeList(){
                this.linkapi.openGroupNoticeList('f87a23ed-9662-4a91-9a3b-ff680873e5dd');
            },
            startGroupChat(){
                this.linkapi.startGroupChat('f87a23ed-9662-4a91-9a3b-ff680873e5dd');
            },
            openGroupBulletinDetail(){
                this.linkapi.openGroupBulletinDetail({
                    "bulletinId": "",
                    "groupId": 'f87a23ed-9662-4a91-9a3b-ff680873e5dd',
                    "title": "",
                    "content": ""
                });
            },
            startGroupBulletinEdit(){
                this.linkapi.startGroupBulletinEdit({
                    "groupId": 'f87a23ed-9662-4a91-9a3b-ff680873e5dd',
                    "title": "希望",
                    "content": "希望"
                });
            },
            startGroupChat(){
                this.linkapi.startGroupChat('f87a23ed-9662-4a91-9a3b-ff680873e5dd');
            },
            startGroupChat(){
                this.linkapi.startGroupChat('f87a23ed-9662-4a91-9a3b-ff680873e5dd');
            }
        },
        mounted: function () {

        }
    }
</script>
