<template>
    <div>
        <bui-header
                title="定位"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="startCheckIn" :title="'打开“我要签到”界面(startCheckIn)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openCheckInList" :title="'打开“签到列表”界面(openCheckInList)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openCheckInDetail" :title="'打开签到详情页面(openCheckInDetail)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startLocationSelect" :title="'打开地理定位界面，选择后返回(startLocationSelect)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            startCheckIn(){
                this.linkapi.startCheckIn();
            },
            openCheckInList(){
                this.linkapi.openCheckInList();
            },
            openCheckInDetail(){
                this.linkapi.openCheckInDetail("deabc66a-e36e-4906-872a-040b96d025cf");
            },
            startLocationSelect(){
                this.linkapi.startLocationSelect({
                    'title':'location'
                }, (res)=>{
                    this.$alert(res);
                });
            }
        }
    }
</script>
