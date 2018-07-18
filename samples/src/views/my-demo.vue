<template>
    <div>
        <bui-header
                title="定位"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="openPersonEdit" :title="'打开个人信息修改页面(openPersonEdit)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openSetting" :title="'打开个人设置页面(openSetting)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openAbout" :title="'打开关于页面(openAbout)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStNotification" :title="'打开设置消息通知页面(openStNotification)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStGestureLock" :title="'打开设置手势锁屏页面(openStGestureLock)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStFont" :title="'打开设置字体大小页面(openStFont)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStDevice" :title="'打开设备管理页面(openStDevice)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStSync" :title="'打开手工同步页面(openStSync)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStCleanCache" :title="'打开清除缓存页面(openStCleanCache)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStModifyPassword" :title="'打开修改密码页面(openStModifyPassword)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStInvite" :title="'打开邀请好友页面(openStInvite)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openStQrcode" :title="'打开二维码页面(openStQrcode)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="logout" :title="'打开注销页面(logout)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            openPersonEdit(){
                this.linkapi.openPersonEdit();
            },
            openSetting(){
                this.linkapi.openSetting();
            },
            openAbout(){
                this.linkapi.openAbout();
            },
            openStNotification(){
                this.linkapi.openStNotification();
            },
            openStGestureLock(){
                this.linkapi.openStGestureLock((res)=>{
                    this.$alert(res);
                });
            },
            openStFont(){
                this.linkapi.openStFont();
            },
            openStDevice(){
                this.linkapi.openStDevice();
            },
            openStSync(){
                this.linkapi.openStSync();
            },
            openStCleanCache(){
                this.linkapi.openStCleanCache();
            },
            openStModifyPassword(){
                this.linkapi.openStModifyPassword();
            },
            openStInvite(){
                this.linkapi.openStInvite();
            },
            openStQrcode(){
                this.linkapi.openStQrcode();
            },
            logout(){
                this.linkapi.logout();
            }
        }
    }
</script>
