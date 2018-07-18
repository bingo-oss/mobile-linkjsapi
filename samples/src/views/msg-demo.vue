<template>
    <div>
        <bui-header
                title="消息"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="openMsgCenter" :title="'打开消息中心页面(openMsgCenter)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getUnreadMessageCount" :title="'获取未读消息总数(getUnreadMessageCount)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getUnreadMessageCountById" :title="'获取未读消息总数(getUnreadMessageCountById)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="sendInviteMessage" :title="'发送邀约消息(sendInviteMessage)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            openMsgCenter(){
                this.linkapi.openMsgCenter();
            },
            getUnreadMessageCount(){
                this.linkapi.getUnreadMessageCount((resp)=>{
                    this.$alert(resp);
                });
            },
            getUnreadMessageCountById(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    /**
                     * 该方法用于获取指定帐号id的未读消息数
                     * @method linkapi.getUnreadMessageCountById
                     * @param callback {function} 回调函数，返回未读消息数
                     * @param talkWithId {string} 这里的帐号包括：用户的id，服务号的id，部门的id，群组的id
                     */
                    this.linkapi.getUnreadMessageCountById(res.userId, (resp)=>{
                        this.$alert(resp);
                    });
                });
            },
            sendInviteMessage(){
                //该方法需在消息对话窗口执行
                this.linkapi.getFavoriteApp((resp)=>{
                    this.linkapi.sendInviteMessage(
                        {
                            'toId': '652c6375-07bc-44d5-b2dc-8efd959a80b2',
                            'toType': 0,
                            'title': 'hello',
                            'desc': 'hello world!',
                            'action_params': resp[0].actionParams
                        }, (res)=>{
                            this.$alert(res);
                        }, (error)=>{
                            this.$alert(error);
                        });
                });
            }
        },
        mounted: function () {

        }
    }
</script>
