<template>
    <div>
        <bui-header
                title="流程"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="startProcess" :title="'打开自由流程页面(startProcess)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openProcessMywork" :title="'打开我的工作页面(openProcessMywork)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="insertOrUpdateSchedule" :title="'日程，调用系统的日程接口(insertOrUpdateSchedule)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="deleteSchedule" :title="'(deleteSchedule)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="querySchedule" :title="'(querySchedule)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="queryAllSchedule" :title="'(queryAllSchedule)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="shareWebsize" :title="'分享内容到Link-链接(share)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="shareApp" :title="'分享内容到Link-应用(share)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="shareToMessage" :title="'内容分享到聊天（个人/群组)(shareToMessage)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="shareToBlog" :title="'内容分享到动态(shareToBlog)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            startProcess(){
                this.linkapi.startProcess('af20da8b-2db3-4801-a8d4-b6292527aa13', '覃覃123_请假固定流(201806290014)');
            },
            openProcessMywork(){
                this.linkapi.openProcessMywork();
            },
            queryAllSchedule(){
                this.linkapi.queryAllSchedule((result) => {
                    this.$alert("成功回调");
                    this.$alert(result);
                },(error) => {
                    this.$alert("失败回调");
                    this.$alert(error);
                });
            },
            insertOrUpdateSchedule(){
                this.linkapi.getLoginInfo((res)=>{
                    this.$alert(res);
                    this.linkapi.insertOrUpdateSchedule({
                        "accountId":res.userId,
                        "accountName":res.userName,
                        // "scheduleId":"1234567890",
                        "scheduleStartTime":Date.parse(new Date()),
                        "scheduleEndTime":Date.parse(new Date()),
                        "scheduleTitle":"日程标题,String类型",
                        "scheduleDescription":"日程描述,String类型",
                        // "scheduleLocation":"日程地点,String类型",
                        "scheduleAllDay":false,
                        "reminders" : [1,10,20,30]
                    },function (result) {
                        this.$alert(11);
                        this.$alert(result.isSuccess+"---"+result.msg);
                    });
                });
            },
            deleteSchedule(){
                this.linkapi.deleteSchedule();
            },
            querySchedule(){
                this.linkapi.querySchedule();
            },
            shareWebsize(){
                this.linkapi.share({
                    "title":"分享标题",
                    "type":"WEBSITE",
                    "content":"https://www.baidu.com",
                }, (res)=>{
                    this.$alert(res);
                });
            },
            shareApp(){
                this.linkapi.getFavoriteApp((resp)=>{
                    //type 有四种，WEBSITE,PICTURE,ACTION
                    this.linkapi.share({
                        title:"标题",
                        // type:"ACTION",
                        type:"PICTURE",
                        content:"https://m.tuniucdn.com/fb2/t1/G5/M00/7E/35/Cii-tFtITJmIECSkAAHW8-FjTt4AAKJVwMs9ZUAAdcL18.jpeg"
                    }, (res)=>{
                        this.$alert(res);
                    }, (error)=>{
                        this.$alert("回调失败");
                        this.$alert(error);
                    });
                });

            },
            shareToMessage(){
                this.linkapi.shareToMessage({
                    "title":"分享标题",
                    "type":"WEBSITE",
                    "content":"https://www.baidu.com",
                }, (res)=>{
                    this.$alert(res);
                });
            },
            shareToBlog(){
                this.linkapi.shareToBlog({
                    "title":"分享标题",
                    "type":"WEBSITE",
                    "content":"https://www.baidu.com",
                }, (res)=>{
                    this.$alert(res);
                });
            }
        }
    }
</script>
