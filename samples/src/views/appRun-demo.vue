<template>
    <div>
        <bui-header
                title="应用"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="runApp" :title="'该方法用于app里面启动app(runApp)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="launchLinkService" :title="'执行指令的接口(launchLinkService)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openAppMarket" :title="'打开应用中心(openAppMarket)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openServiceMarketDesktop" :title="'打开收藏应用中心(openServiceMarketDesktop)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getFavoriteApp" :title="'获取本地收藏的应用(getFavoriteApp)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
                }
            }
        },
        methods: {
            back() {
                this.$pop();
            },
            runApp(){
                this.linkapi.getFavoriteApp((res)=>{
                    this.$alert(res);
                    // this.linkapi.runApp({
                    //     'authorID': res.userId,
                    //     'content': '发现了其中的奥妙~赞',
                    //     'privateType': 2
                    // }, (resp)=>{
                    //     this.$alert(resp);
                    // });
                });

            },
            launchLinkService(){
                this.linkapi.getFavoriteApp( (res)=>{
                    this.linkapi.launchLinkService(JSON.parse(res)[0].actionParams, (resp)=>{
                        this.$alert('回调');
                    });
                });
            },
            openAppMarket(){
                this.linkapi.openAppMarket();
            },
            openServiceMarketDesktop(){
                this.linkapi.openServiceMarketDesktop();
            },
            getFavoriteApp(){
                this.linkapi.getFavoriteApp( (res)=>{
                    this.$alert(res);
                });
            },
            openMicroblogDetail(){
                this.linkapi.openMicroblogDetail('9bc6db76-f4d9-4fd5-a934-6861a887abe3');
            },
            openMyMicroblog(){
                this.linkapi.getLoginInfo( (res)=>{
                    this.linkapi.openMyMicroblog();
                });

            },
            openMicroblogCenter(){
                this.linkapi.openMicroblogCenter();
            }
        }
    }
</script>
