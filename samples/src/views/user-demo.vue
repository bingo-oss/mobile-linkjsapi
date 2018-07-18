<template>
    <div>
        <bui-header
                title="用户"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="getLoginInfo" :title="'获取登陆后的用户信息(getLoginInfo)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getToken" :title="'获取登录用户凭证 AccessToken(getToken)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="refreshToken" :title="'刷新平台的 AccessToken(refreshToken)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getUserInfo" :title="'获取指定userId的用户信息,支持批量获取(getUserInfo)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getUserIdWithLoginId" :title="'根据loginId获取userId(getUserIdWithLoginId)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getUserInfoByCellphoneOrEmail" :title="'根据手机或者邮箱获取用户信息(getUserInfoByCellphoneOrEmail)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startUserChat" :title="'该接口用于调用Link的用户聊天页面(startUserChat)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            getLoginInfo(){
                this.linkapi.getLoginInfo((res)=>{
                    this.$alert(res);
                }, (error)=>{
                    this.$alert(error);
                });
            },
            getToken(){
                this.linkapi.getToken((res)=>{
                    this.$alert(res);
                }, (error)=>{
                    this.$alert(error);
                });
            },
            refreshToken(){
                this.linkapi.refreshToken((res)=>{
                    this.$alert(res);
                }, (error)=>{
                    this.$alert(error);
                });
            },
            getUserInfo(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.getUserInfo(res.userId, (resp)=>{
                        this.$alert(resp);
                    }, (error)=>{
                        this.$alert(error);
                    });
                });
            },
            getUserIdWithLoginId(){
                this.linkapi.getLoginInfo((res)=>{
                    this.$alert(res);
                    this.linkapi.getUserIdWithLoginId(res.loginId, (resp)=>{
                        this.$alert(resp);
                    }, (error)=>{
                        this.$alert(error);
                    });
                });
            },
            getUserInfoByCellphoneOrEmail(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.$alert(res);
                }, (error)=>{
                    this.$alert(error);
                });
            },
            startUserChat(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.startUserChat(res.userId);
                });
            }
        },
        mounted: function () {

        }
    }
</script>
