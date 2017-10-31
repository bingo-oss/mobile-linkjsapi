var link = weex.requireModule("LinkModule");
var schedule = weex.requireModule("ScheduleModule");
var platform = weex.config.env.platform;
var ajax = require("./ajax.js");

var extend = function (obj, ext) {
    var key;
    if (typeof ext === "object") {
        for (key in ext) {
            obj[key] = ext[key];
        }
    }
    return obj;
}

/**
 * Link平台功能接口，使用该模块需要 import 或者 require linkapi.js
 * @module 平台接口
 */

var linkapi = {

    /**
     * @class 用户信息
     */

    /**
     * 获取登陆后的用户信息
     * @method getLoginInfo
     * @param {function} success 成功回调，返回当前登录用户信息
     * @param {function} error 失败回调，返回获取失败原因
     * @return {object} 包含字段: loginId,userId,userName,orgId,orgName,email,telephone,eCode,picture,picture_local
     * @example
     linkapi.getLoginInfo((resp)=>{
        //todo
    },(error)=>{
        //todo
    });
     */
    getLoginInfo: function (success, error) {
        link.getLoginInfo([], success, error);
    },

    /**
     * 获取登录用户凭证 AccessToken
     * @method getToken
     * @param {function} success 成功回调，返回当前Token对象
     * @param {function} error 失败回调，返回获取失败原因
     * @return {object} 包含字段: accessToken
     */
    getToken() {
        return new Promise((resolve, reject) => {
            link.getToken([], res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },

    /**
     * 刷新平台的 AccessToken
     * @method refreshToken
     * @param {function} success 成功回调，返回新的Token对象
     * @param {function} error 失败回调，返回获取失败原因
     * @return {object} 包含字段: accessToken
     */
    refreshToken () {
        return new Promise((resolve, reject) => {
            link.refreshToken([], res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    },

    /**
     * 获取指定userId的用户信息,支持批量获取
     * @method getUserInfo
     * @param  {string} id   用户userId,允许传入数组
     * @param  {function} success 成功回调函数，返回用户信息对象
     * @param  {function} error   失败回调函数，返回失败原因
     * @return {object}   包含字段: loginId,userId,userName,orgId,orgName,email,telephone,eCode,picture,picture_local
     */
    getUserInfo: function (id, success, error) {
        if (id instanceof Array) {
            link.getUserListInfo([id], success, error);
        } else {
            link.getUserInfo([id], success, error);
        }
    },

    // 根据loginId获取userId
    getUserIdWithLoginId: function (loginId, success, error) {
        link.getUserIdWithLoginId([loginId], success, error);
    },


    /**
     * @class 通讯录
     */

    /**
     * 调用平台选人界面(单选)
     * @method startContactSingleSelector
     * @param  {string} title  选人界面说明文本
     * @param  {int} dataType  选项: 1-用户,2-群组,3-用户+群组,4-部门(组织),5-用户+组织,8-服务号
     * @param  {object} extraParams 扩展参数
     * @param  {function} success 成功回调函数,返回用户信息
     * @param  {function} error   失败回调函数,返回失败原因
     * @return {object}  包含字段: name,type,id(即userId)
     */
    startContactSingleSelector: function (title, dataType, extraParams, success, error) {
        extraParams = extend({
            isIncludeDisableUser: false
        }, extraParams);
        link.startContactSingleSelector([title, dataType, extraParams], success, error);
    },

    /**
     * 调用平台选人界面(多选)
     * @method startContactMulitSelector
     * @param  {string} title  选人界面说明文本
     * @param  {int} dataType  选项: 1-用户,2-群组,3-用户+群组,4-部门(组织),5-用户+组织,8-服务号
     * @param  {object} extraParams 扩展参数
     * @param  {function} success 成功回调函数,返回用户信息
     * @param  {function} error   失败回调函数,返回失败原因
     * @return {object}  包含字段: name,type,id(即userId)
     */
    startContactMulitSelector: function (title, dataType, extraParams, success, error) {
        extraParams = extend({
            userSelected: [],
            groupSelected: [],
            organizationSelected: [],
            userIgnore: [],
            groupIgnore: [],
            organizationIgnore: [],
            isIncludeDisableUser: false
        }, extraParams);
        link.startContactMulitSelector([title, dataType, extraParams], success, error);
    },

    /**
     * 打开指定userId用户的名片
     * @method startUserCard
     * @param  {string} id 用户userId
     */
    startUserCard: function (id) {
        link.startUserCard([id], null, null);
    },

    /*
     创建群组
     @param userIds {Array} 默认添加的用户id
     @param success {Function} 成功回调，返回群组json对象
     @param error {Function} 失败回调函数，返回错误字符串
     */

    /**
     * 创建群组
     * @method createGroup
     * @param  {array} userIds 需要加入群组的用户userId, 传入数组
     * @param  {function} success 成功回调函数,返回创建成功的群组信息
     * @param  {function} error   失败回调函数,返回失败原因
     * @return {object} 包含字段: groupId,name,ownerId,type,isPublic等
     */
    createGroup: function (userIds, success, error) {
        var successCallback = function (resp) {
            if (typeof resp == "string") {
                resp = JSON.parse(resp);
                success(resp);
            } else if (typeof resp == "object") {
                success(resp);
            }
        }
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "CreateGroup",
            userSelected: userIds || []
        }], successCallback, error);
    },

    /*
     * 加入群组
     * @method joinGroup
     * @param groupId {string} 群组Id
     * @param userIds {array} 用户userId
     * @param success {function} 成功回调
     * @param error {function} 失败回调函数，返回错误原因
     */
    joinGroup: function (groupId, userIds, success, error) {
        link.joinGroup([groupId, userIds], success, error);
    },

    /*
     打开群组列表
     */
    openGroupList: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn", //固定参数
            key: "GroupList" //固定参数
        }], null, null);
    },
    /*
     该接口用于调用Link里面群组的名片页面
     @param groupId {String} 群组id
     */
    startGroupCard: function (groupId, success, error) {
        link.startGroupCard([groupId], success, error);
    },
    /*
     打开群组发公告页面
     @param groupId {String} 群组id
     */
    sendGroupNotice: function (groupId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "PublishGroupAnnouncement",
            groupId: groupId
        }], null, null);
    },
    /*
     打开群组公告列表
     @param groupId {String} 群组id
     */
    openGroupNoticeList: function (groupId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "GroupAnnouncementList",
            groupId: groupId
        }], null, null);
    },
    /*
     打开部门列表
     @param orgId {String} 部门id（可不传）
     */
    openOrgList: function (orgId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "OrganizationList",
            orgId: orgId || '' //@param orgId {String} 部门id（可不传）
        }], null, null);
    },
    /*
     查看部门名片页
     @param orgId {String} 部门id
     */
    openOrgCard: function (orgId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "OrganizationCard",
            orgId: orgId
        }], null, null);
    },
    /*
     发送服务号公告
     @param accountId {String} 服务号id
     @param bulletinType {Int} 公告类型(1文字,2图片,3语音) | 不传此参数时先进入公告类型选择页面
     */
    sendServiceAccountNotice: function (accountId, bulletinType) {

        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "SendBulletin",
            accountId: accountId,
            bulletinType: bulletinType
        }], null, null);
    },
    /*
     查看服务号名片页
     @param accountId {String} 服务号id
     */
    openServiceAccountCard: function (accountId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "ServiceAccountCard",
            accountId: accountId
        }], null, null);
    },
    /*
     查看已关注服务号列表
     */
    openServiceAccountList: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "ServiceAccountList"
        }], null, null);
    },
    /*
     打开添加服务号页面
     */
    addServiceAcccount: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "AddServiceAccount"
        }], null, null);
    },
    /*
     打开通讯录页面
     */
    openContactPage: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "Contact"
        }], null, null);
    },
    /*
     根据部门id获取用户信息以及子部门信息
     @param orgId {String} 部门id
     @param page {Int} 页码，从1开始
     @param pagesize {Int} 页数
     @param success {Function} 成功，返回某部门下的用户以及子部门
     @param error {Function} 失败回调函数，返回错误字符串
     */
    getChildListByOrgId: function (orgId, page, pagesize, success, error) {

        link.getChildListByOrgId([orgId, page, pagesize], success, error);
    },
    /*
     根据部门id获取该部门的信息
     @param orgId {String} 部门id
     @param success {Function} 成功，返回部门信息
     @param error {Function} 失败回调函数，返回错误字符串
     */
    getDeptInfoById: function (orgId, success, error) {
        link.getDeptInfoById([orgId], success, error);
    },
    /*
     执行同步服务
     @param type{int} 同步类型。 0：用户信息同步，1：群组信息同步，2：部门信息同步，3：服务号信息同步，4：好友企业同步，5：应用同步
     @param success {Function} 成功，返回状态
     @param error {Function} 失败回调函数，返回错误字符串
     */
    execSyncService: function (type, success, error) {
        link.execSyncService([type], success, error);
    },
    /*
     根据手机或者邮箱获取用户信息
     @param key {String} 目前支持传入手机或者邮箱
     @param success {Function} 成功，返回用户信息
     @param error {Function} 失败回调函数，返回错误字符串
     */
    getUserInfoByCellphoneOrEmail: function (key, success, error) {
        link.getUserInfoByCellphoneOrEmail([key], success, error);
    },
    //---------message-----------------------------------------------------------------------------------
    /*
     打开消息中心页面
     */
    openMsgCenter: function () {
        //打开消息中心页面
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MessageCenter"
        }], null, null);
    },
    /*
     获取未读消息总数
     @param success {Function} 成功回调，返回数字
     @param error {Function} 失败回调,返回失败信息
     */
    getUnreadMessageCount: function (success, error) {
        link.getUnreadMessageCount([], success, error);
    },
    /**
     该方法用于获取指定帐号id的未读消息数
     @param successCallback {Function} 成功回调函数，返回未读消息数
     @param talkWithId {String} 这里的帐号包括：用户的id，服务号的id，部门的id，群组的id
     */
    getUnreadMessageCountById: function (talkWithId, success) {
        link.getUnreadMessageCountById([talkWithId], success, null);
    },
    /**
     该接口用于调用Link的用户聊天页面
     @param userId {String} 用户id
     @param userName {String} 用户名称(可选)
     @param ecode {String} 企业code(可选)
     */
    startUserChat: function (userId, userName, ecode, success, error) {
        link.startUserChat([userId, userName, ecode], success, error);
    },
    /**
     该接口用于调用Link的群组聊天页面
     @param groupId {String} 群组id
     @param groupName {String} 群组名称(可选)
     */
    startGroupChat: function (groupId, groupName, success, error) {
        link.startGroupChat([groupId, groupName], success, error);
    },
    /**
     打开服务号聊天界面
     @param accountId {String} 服务号id
     */
    startServiceAccountChat: function (accountId, accountName, success, error) {
        link.startServiceAccountChat([accountId, accountName], success, error);
    },
    /**
     发送邀约消息（主要用在消息窗口）
     @param params {toId:,toType:,title:,desc:,action_params:}
     */
    sendInviteMessage: function (params, success, error) {
        params = params || {};
        link.sendInviteMessage([params], success, error);
    },
    //---------blog-----------------------------------------------------------------------------------
    /**
     发表动态
     @param options {JSONObject} 动态参数，具体如下：<br/>
     authorID {String} 发表动态的对象id ， 可以是用户或用户运营的服务号 （不写默认是当前用户）<br/>
     content {String} 动态内容<br/>
     privateType {Int}  私密类型 ， 0 群组，  1 部门， 2 个人 ， 3 项目  ， 4公开 （默认类型）<br/>
     privateInstanceID {String}  私密对象id<br/>
     privateName {String} 私密对象名称<br/>
     images {Array}  动态图片 （相册图片地址， 建议到动态发表界面再选择图片，这样更加方便）
     labelIds:'id1,id2,id3' （动态的标签id，传入数组）
     @param success {Function} 成功回调
     @param error {Function} 失败回调,返回失败信息
     */
    publishMicroblog: function (options, success, error) {
        var params = extend({
            code: "OpenBuiltIn",
            key: "PublishMicroBlog"
        }, options);

        link.launchLinkServiceWithDictionary([params], success, error);
    },
    /**
     打开动态主页
     @param displayType {String} 显示类型
     ALL 全部
     ATTENTION 关注
     ESSENCE 精华
     TOPIC 话题
     FAVOR 收藏
     GROUP 群组
     PROJECT 项目
     */
    //TODO:这接口参数待确认，是否废弃
    openMicroblogPage: function (displayType) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "DcMicroBlog",
            displayType: displayType
        }], null, null);
    },
    /**
     打开某人动态主页
     @param accountId {String} 用户id
     */
    //TODO:这个是否需要换成id
    //android上会报“你们还不是好友，不能查看Ta的动态”
    openUserMicroblog: function (accountId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "BlogCard",
            accountId: accountId
        }], null, null);
    },
    /**
     打开某群组动态主页
     @param groupId {String} 群组id
     */
    openGroupMicroblog: function (groupId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "GroupBlogList",
            groupId: groupId
        }], null, null);
    },
    /*
     打开某项目动态主页
     @param: projectId{String} 项目id
     */
    //TODO:现在还有项目动态？
    startProjectDetail: function (projectId, success, error) {
        link.startProjectDetail([projectId], success, error);
    },
    /**
     打开某服务号动态主页
     @param accountId {String} 服务号id
     */
    //android上会报“你们还不是好友，不能查看Ta的动态”
    openServiceAccountMicroblog: function (accountId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "BlogCard",
            accountId: accountId,
            accountType: 3
        }], null, null);
    },
    /**
     打开某话题动态主页
     @param topic {String} 话题名称
     */
    openTopicMicroblog: function (topic) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "TopicBlogList",
            topic: topic
        }], null, null);
    },
    /**
     打开动态广场
     */
    //TODO: 这接口还要不要用？
    openBlogSquare: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "BlogSquare"
        }], null, null);
    },
    /**
     打开动态详情
     */
    openMicroblogDetail: function (blogId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "BlogDetail",
            blogId: blogId
        }], null, null);
    },
    /**
     打开我的动态
     */
    //TODO: 这接口还要不要用？
    openMyMicroblog: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MyMicroBlog"
        }], null, null);
    },
    //---------app-----------------------------------------------------------------------------------
    /**
     该方法用于app里面启动app
     @method app.link.runApp
     @param params{Object} 启动应用的参数，key-value格式为
     {
         appCode:"应用市场中填写的编码",
         appUrl:"启动页面相对地址",
         data:{name:"张三",sex:"male":age:25} //其中data参数也是json对象，启动目标应用后，能够在app.getPageParams里面获取到。
    }
     */
    //TODO :weex里面如何取 data的值？
    runApp: function (params, success, error) {
        var dataStr = "";
        if (params.data) {
            for (var key in params.data) {
                dataStr += ("\n" + key + "=" + params.data[key]);
            }
            ;
        }
        params = "[OpenApp]\nappCode=" + params.appCode + (params.appUrl ? "\nappUrl=" + params.appUrl : "") + dataStr;
        link.launchLinkService([params], success, error);
    },
    /**
     打开应用桌面
     */
    //TODO: 这接口还要不要用？
    // openAppDesktop: function(){
    //     link.launchLinkServiceWithDictionary([{
    //         code:"OpenBuiltIn",
    //         key:"DcApp"
    //     }], null, null);
    // },
    /**
     打开应用市场
     */
    //TODO: 这接口还要不要用？
    // openAppMarket: function(){
    //     link.launchLinkServiceWithDictionary([{
    //         code:"OpenBuiltIn",
    //         key:"AppMarket"
    //     }], null, null);
    // },
    /**
     打开应用详情页面
     */
    //TODO: 这接口还要不要用？
    // openAppCard: function(AppCode){
    //     link.launchLinkServiceWithDictionary([{
    //         code:"OpenBuiltIn",
    //         key:"AppDetail",
    //         AppCode : AppCode
    //     }], null, null);
    // },
    //打开应用中心
    openAppMarket: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "DcService"
        }], null, null);
    },
    //获取本地收藏的应用
    getFavoriteApp: function (success, error) {
        link.launchLinkServiceWithDictionary([{
            code: "Data",
            key: "GetFavoriteService"
        }], success, error);
    },
    //---------checkin-----------------------------------------------------------------------------------
    /**
     该方法用于调用Link的“我要签到”界面
     */
    startCheckIn: function () {
        var params = "[StartCheckin]\npushToListOnComplete=false";
        link.launchLinkService([params], null, null);
    },
    /**
     该方法用于调用Link的“签到列表”界面
     */
    openCheckInList: function () {
        var params = "[OpenBuiltIn]\nkey=MyCheckIn";
        link.launchLinkService([params], null, null);
    },
    /**
     打开签到详情页面
     @param checkinId {String} 签到id
     */
    openCheckInDetail: function (checkinId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "CheckinDetail",
            checkinId: checkinId
        }], null, null);
    },
    //---------me--------------------------------------------------------------------------------------
    /**
     打开个人信息修改页面
     */
    openPersonEdit: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "EditPersonInfo"
        }], null, null);
    },
    /**
     打开个人设置页面
     */
    openSetting: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenSubMenu",
            key: "setting",
            module: "MySelf"
        }], null, null);
    },
    /**
     打开关于页面
     */
    openAbout: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MyAbout"
        }], null, null);
    },
    /**
     打开设置消息通知页面
     */
    openStNotification: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StNotification'
        }], null, null);
    },
    /**
     打开设置手势锁屏页面
     */
    openStGestureLock: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StGestureLock'
        }], null, null);
    },
    /**
     打开手势锁屏页面，如果没有设置，会先弹出设置界面，如果有设置，则直接弹出解锁页面
     */
    //Android没有成功回调值
    checkGestureLock: function (success, error) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'CheckGestureLock'
        }], success, error);
    },
    /**
     打开设置字体大小页面
     */
    openStFont: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StFont'
        }], null, null);
    },
    /**
     打开设备管理页面
     */
    openStDevice: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StDevice'
        }], null, null);
    },
    /**
     打开手工同步页面
     */
    openStSync: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StSync'
        }], null, null);
    },
    /**
     打开清除缓存页面
     */
    openStCleanCache: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StCleanCache'
        }], null, null);
    },
    /**
     打开修改密码页面
     */
    openStModifyPassword: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StModifyPassword'
        }], null, null);
    },
    /**
     打开邀请好友页面
     */
    openStInvite: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'InviteUser'
        }], null, null);
    },
    /**
     打开Link二维码页面
     */
    openStQrcode: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StQrcode'
        }], null, null);
    },
    /**
     注销Link
     */
    logout: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StLogout'
        }], null, null);
    },
    //---------process----------------------------------------------------------------------------------
    /**
     打开自由流程页面
     @param processId {String} 流程id
     @param serviceName  {String} 流程名称
     */
    startProcess: function (processId, serviceName) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenProcess",
            processId: processId,
            serviceName: serviceName
        }], null, null);
    },
    /**
     打开我的工作页面
     */
    openProcessMywork: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MyWork"
        }], null, null);
    },
    //---------schedule----------------------------------------------------------------------------------
    //TODO:待确认
    insertOrUpdateSchedule: function (scheduleinfo, callback) {
        schedule.insertOrUpdate(scheduleinfo, callback);
    },
    deleteSchedule: function (scheduleinfo, callback) {
        schedule.deleteSchedule(scheduleinfo, callback);
    },
    querySchedule: function (scheduleinfo, callback) {
        schedule.querySchedule(scheduleinfo, callback);
    },
    //---------share-------------------------------------------------------------------------------------
    /*
     @method:外部内容分享到Link里面
     @static
     @param: params{Object}
     title: {string} 标题
     content: {string} 分享内容摘要
     url: {string} 点击进入的链接
     icon: {string} 分享的图标地址，支持远程地址，或本地图片
     type: {string} WEBSITE,PICTURE,ACTION
     website url
     file  存储服务的文件id
     picture http地址
     action 指令
     都不是，普通文本
     */
    share: function (params, success, error) {
        if (params.type == "picture") params.icon = params.content;
        params = extend({
            content: "",
            title: ""
        }, params);
        link.share([params], success, error);
    },
    //分享到聊天界面(个人/群组)
    shareToMessage: function (params, success, error) {
        if (params.type == "picture") params.icon = params.content;
        params = extend({
            content: "",
            title: ""
        }, params);
        link.shareToMessage([params], success, error);
    },
    //分享到动态
    shareToBlog: function (params, success, error) {
        if (params.type == "picture") params.icon = params.content;
        params = extend({
            content: "",
            title: ""
        }, params);
        link.shareToBlog([params], success, error);
    },
    /**
     * 选择一个云盘文件
     * @return result 云盘文件信息
     *         具体参数：id、name、size
     */
    chooseDiskFile: function (success, error) {
        link.chooseDiskFile([], success, error);
    },
    /**
     创建云盘分享
     @param id {String} 云盘文件id
     @return result {Object} 公开分享
     具体参数：shareId、shareName、baseUrl、password、shareHref
     */
    createDiskFileShare: function (id, success, error) {
        link.createDiskFileShare([id], success, error)
    },
    /**
     * 查看云盘文件详情
     * @param diskShareInfo {Object} 云盘文件分享信息
     */
    openDiskFileDetail: function (diskFileId, shareInfo, success, error) {
        link.openDiskFileDetail([diskFileId, shareInfo], success, error);
    },
    //---------other-------------------------------------------------------------------------------------
    /**
     更新Link底部tab角标的数字
     @param badgeValue {String} 角标的内容，这个内容直接更新到tab里面（当不传此值时去除角标）
     PS:必须是Tab页才生效
     */
    //TODO: 这个没有用，并且有点指代不明，更新的是哪个tab。
    updateTabBadge: function (badgeValue) {
        link.updateTabBadge([badgeValue], null, null);
    },
    /**
     获取当前Link的主题颜色值
     @param success {Function} 成功回调，返回颜色值
     */
    getThemeColor: function (success) {
        var callback = function (result) {
            //result.background_color = "#" + result.background_color.substring(3);
            success(result); //"#ff0072c6"
        }
        link.getThemeColor([], callback, null);
    },
    //打开录制小视频
    //在录制完后，可以做临时保存| 分享到动态| 分享到聊天
    openVideoRecord: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "VideoCapture"
        }], null, null);
    },
    //打开二维码扫码(自动解析指令，自动跳转)
    scanCode: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "ScanCode"
        }], null, null);
    },
    //打开二维码扫码(可设置直接返回扫码内容，不自行解析)
    scanCodeHandle: function (options, success, error) {
        link.scanCode([options], success, error);
    },
    //打开Link内置浏览器
    openLinkBroswer: function (title, url) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenUrl",
            title: title,
            url: url
        }], null, null);
    },
    //打开BT容器，传入url
    openBtBroswer: function (url) {
        var params = "[BingoTouch]\nurl=" + url;
        link.launchLinkService([params], null, null);
    },
    //打开pdf文件：url支持本地以及远程的地址
    openPdfBroswer: function (title, url) {
        var params = {
            name: title,
            uri: url
        }
        if (platform == "android") {
            link.fileBrowse([params], null, null);
        } else if (platform == "iOS") {
            linkapi.openLinkBroswer(title, url);
        } else {
            window.open(url, title);
        }
    },
    /**
     该接口用于选文件，返回文件路径
     */
    chooseFile: function (callback) {
        link.chooseFile([], callback, null);
    },
    //获取多语言
    getLanguage: function (callback) {
        link.getLanguage([], callback, null);
    },

    /**
     * 打开地理定位界面，选择后返回
     * @param params {Object} 参数
     *   @param params.canDrag {Bool} : 是否可以通过拖动改变位置,默认false
     *   @param params.canSearch {Bool} : 是否具备搜索功能,默认true
     *   @param params.title {String}: 标题栏文本
     * @param success {Function} 成功回调, 返回对象 {'longitude':42.2935494597,'latitude'116.0595516834,'addr':'具体位置'}
     * @param error
     */
    startLocationSelect: function (params, success, error) {
        var successCallback = function (resp) {
            if (typeof resp == "string") {
                resp = JSON.parse(resp);
                success(resp);
            } else if (typeof resp == "object") {
                success(resp);
            }
        }
        params.canDrag = params.canDrag || false;
        params.canSearch = params.canSearch || true;
        link.startLocationSelect([params], successCallback, error);
    },
    get(params){
        return this.getToken().then(res => {
            let token = res["accessToken"];
            params.headers = params.headers || {};
            params.headers["Authorization"] = "Bearer" + token;
            return ajax.get(params).catch((status, statusText) => {
                if (status == 401) {
                    return this.refreshToken().then(res => {
                        token = res["accessToken"];
                        params.headers = params.headers || {};
                        params.headers["Authorization"] = "Bearer" + token;
                        return ajax.get(params);
                    });
                } else {
                    return Promise.reject(status, statusText);
                }
            });
        });
    },
    post(params){
        return this.getToken().then(res => {
            let token = res["accessToken"];
            params.headers = params.headers || {};
            params.headers["Authorization"] = "Bearer" + token;
            return ajax.post(params).catch((status, statusText) => {
                if (status == 401) {
                    return this.refreshToken().then(res => {
                        token = res["accessToken"];
                        params.headers = params.headers || {};
                        params.headers["Authorization"] = "Bearer" + token;
                        return ajax.get(params);
                    });
                } else {
                    return Promise.reject(status, statusText);
                }
            });
        });
    }
}

module.exports = linkapi;