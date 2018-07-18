<template>
    <div>
        <bui-header
                title="云盘"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="updateTabBadge" :title="'更新消息的角标(updateTabBadge)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getThemeColor" :title="'获取当前Link的主题颜色值(getThemeColor)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openVideoRecord" :title="'打开录制小视频(openVideoRecord)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="scanCode" :title="'打开二维码扫码(自动解析指令，自动跳转)(scanCode)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="scanCodeHandle" :title="'打开二维码扫码(可设置直接返回扫码内容，不自行解析)(scanCodeHandle)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openLinkBroswer" :title="'打开Link内置浏览器(openLinkBroswer)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openBtBroswer" :title="'打开BT容器，传入url(openBtBroswer)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openPdfBroswer" :title="'打开pdf文件：url支持本地以及远程的地址(openPdfBroswer)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="chooseFile" :title="'选择文件(chooseFile)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getLanguage" :title="'获取当前语言环境(getLanguage)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="selectFiles" :title="'发起选择文件资源(selectFiles)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="uploadFiles" :title="'发起资源上传(uploadFiles)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openFile" :title="'打开/浏览上传后的资源(openFile)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="registerReceiver" :title="'注册广播接收器。注册后可以通过key监听全局消息(registerReceiver)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="updateMessageTabBadge" :title="'更新消息界面tab的角标(updateMessageTabBadge)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="cancelMsgNtf" :title="'取消指定聊天对象的通知栏信息(cancelMsgNtf)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="cancelMsgNtfByCategoryId" :title="'根据类型清除通知栏的通知(cancelMsgNtfByCategoryId)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="setChatActionTip" :title="'设置聊天界面右上角的气泡未读数(setChatActionTip)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="sendMessage" :title="'发送消息通用方法(sendMessage)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="readTextFromFile" :title="'读取文件文本内容(readTextFromFile)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startSearch" :title="'打开搜索界面(startSearch)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="speechAssistant" :title="'打开语音助手(speechAssistant)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getLoginCookies" :title="'获取Link登录的cookie信息(getLoginCookies)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getDomainRequireAuthUrls" :title="'获取需要授权认证的url(getDomainRequireAuthUrls)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getImage" :title="'获取link图片物理地址,根据内部定的协议获取真实的物理地址(getImage)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startChat" :title="'发起聊天(startChat)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openTodo" :title="'打开待办待阅(openTodo)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="startEmail" :title="'打开邮箱(startEmail)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getEmailUnreadCount" :title="'获取未读邮箱条数(getEmailUnreadCount)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openOnlineServicer" :title="'打开在线客服(openOnlineServicer)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            updateTabBadge(){
                this.linkapi.updateTabBadge(100);
            },
            getThemeColor(){
                this.linkapi.getThemeColor((res)=>{
                    //返回颜色值
                    this.$alert(res);
                });
            },
            openVideoRecord(){
                this.linkapi.openVideoRecord();
            },
            scanCode(){
                this.linkapi.scanCode();
            },
            scanCodeHandle(){
                this.linkapi.scanCodeHandle({
                    "isHandleResult": true
                },(res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                },(error)=>{
                    this.$alert("回调失败");
                    this.$alert(error);
                });
            },
            openLinkBroswer(){
                this.linkapi.openLinkBroswer("跳转百度","https://www.baidu.com/");
            },
            openBtBroswer(){
                this.linkapi.openBtBroswer("https://www.baidu.com/");
            },
            openPdfBroswer(){
                this.linkapi.openPdfBroswer("跳转百度","https://www.baidu.com/");
            },
            chooseFile(){
                this.linkapi.chooseFile((res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                });
            },
            getLanguage(){
                this.linkapi.getLanguage((res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                });
            },
            selectFiles(){
                this.linkapi.selectFiles(1, (res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                });
            },
            uploadFiles(){
                this.linkapi.selectFiles(1, (res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                    // this.linkapi.uploadFiles(res, (resp)=>{
                    //     this.$alert("回调成功");
                    //     this.$alert(resp);
                    // });
                });
            },
            openFile(){
                this.linkapi.selectFiles(2, (res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                    // this.linkapi.openFile(res);
                    this.linkapi.openFile(res.resource[0]);
                });

            },
            registerReceiver(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000010', (res)=>{
                    this.linkapi.registerReceiver(1,res.userId);
                });

            },
            updateMessageTabBadge(){
                this.linkapi.updateMessageTabBadge({
                    "appCode": "",
                    "unReadCount": 8
                });
            },
            cancelMsgNtf(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000010', (res)=>{
                    this.linkapi.cancelMsgNtf(res.userId);
                });
            },
            cancelMsgNtfByCategoryId(){
                this.linkapi.getFavoriteApp((resp)=>{
                    this.$alert(resp);
                    this.linkapi.cancelMsgNtfByCategoryId(resp[0].category);
                });

            },
            setChatActionTip(){
                this.linkapi.setChatActionTip('70975e19-6b70-46ec-86a6-9788f1eb5457','8');
            },
            sendMessage(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000010', (res)=>{
                    this.linkapi.sendMessage({
                        "toCompany": res.eCode,
                        "toId": res.userId ,
                        "toName": res.userName,
                        "toType": 1,
                        "content": "hello",
                        "msgType": 0,
                    }, (res)=>{
                        this.$alert("回调成功");
                        this.$alert(res);
                    }, (error)=>{
                        this.$alert("回调失败");
                        this.$alert(error);
                    });
                });

            },
            readTextFromFile(){
                this.linkapi.readTextFromFile('','', (res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                }, (error)=>{
                    this.$alert("回调失败");
                    this.$alert(error);
                });
            },
            startSearch(){
                this.linkapi.startSearch();
            },
            speechAssistant(){
                this.linkapi.speechAssistant();
            },
            getLoginCookies(){
                this.linkapi.getLoginCookies((res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                }, (error)=>{
                    this.$alert("回调失败");
                    this.$alert(error);
                });
            },
            getDomainRequireAuthUrls(){
                this.linkapi.getDomainRequireAuthUrls((res)=>{
                    this.$alert("回调成功");
                    this.$alert(res);
                }, (error)=>{
                    this.$alert("回调失败");
                    this.$alert(error);
                });
            },
            getImage(){
                this.linkapi.getFavoriteApp((resp)=>{
                    this.linkapi.getImage(resp[0].icon, (res)=>{
                        this.$alert("回调成功");
                        this.$alert(res);
                    }, (error)=>{
                        this.$alert("回调失败");
                        this.$alert(error);
                    });
                });

            },
            startChat(){
                this.linkapi.startChat();
            },
            openTodo(){
                //defaultIndex 0(待办)/1（待阅）/2（已办）
                this.linkapi.openTodo({
                    "defaultIndex":1
                });
            },
            startEmail(){
                this.linkapi.startEmail();
            },
            getEmailUnreadCount(){
                this.linkapi.getEmailUnreadCount((resp)=>{
                    this.$alert(resp);
                    this.$alert("回调成功");
                    this.$alert(resp);
                }, (error)=>{
                    this.$alert("回调失败");
                    this.$alert(error);
                });
            },
            openOnlineServicer(){
                this.linkapi.openOnlineServicer();
            }
        }
    }
</script>
