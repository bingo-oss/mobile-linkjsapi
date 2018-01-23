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
 * Link平台提供的功能接口，使用该模块需要安装linkapi模块（ npm install linkapi --save ）
 * @module 平台接口
 */

var linkapi = {

    /**
     * @class 用户
     */

    /**
     * 获取登陆后的用户信息
     * @method getLoginInfo
     * @param {function} success 成功回调，返回当前登录用户信息
     * @param {function} error 失败回调，返回获取失败原因
     * @return {object} 包含字段: loginId,userId,userName,orgId,orgName,email,telephone,eCode,picture,picture_local
     */
    getLoginInfo: function (success, error) {
        link.getLoginInfo([], success, error);
    },

    /**
     * 获取登录用户凭证 AccessToken
     * @method getToken
     * @param {function} success 成功回调，返回当前Token对象 {access_token:''}
     * @param {function} error 失败回调，返回获取失败原因
     * @return {object} 包含字段: accessToken
     */
    getToken(success, error) {
        return new Promise((resolve, reject) => {
            link.getToken([], res => {
                resolve(res);
                success && success(res);
            }, err => {
                reject(err);
                error && error(err);
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
    refreshToken (success, error) {
        return new Promise((resolve, reject) => {
            link.refreshToken([], res => {
                resolve(res);
                success && success(res);
            }, err => {
                reject(err);
                error && error(err);
            });
        });
    },

    /**
     * 获取指定userId的用户信息,支持批量获取
     * @method getUserInfo
     * @param  {string} id   用户userId,支持传入数组
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

    /**
     * 根据loginId获取userId
     * @method getUserIdWithLoginId
     * @param {string} loginId 登录id
     * @param  {function} success 成功回调函数，返回用户信息对象
     * @param  {function} error   失败回调函数，返回失败原因
     */
    getUserIdWithLoginId: function (loginId, success, error) {
        link.getUserIdWithLoginId([loginId], success, error);
    },


    /**
     * 根据手机或者邮箱获取用户信息
     * @method getUserInfoByCellphoneOrEmail
     * @param key {string} 目前支持传入手机或者邮箱
     * @param success {function} 成功，返回用户信息
     * @param error {function} 失败回调函数，返回错误字符串
     */
    getUserInfoByCellphoneOrEmail: function (key, success, error) {
        link.getUserInfoByCellphoneOrEmail([key], success, error);
    },

    /**
     * 该接口用于调用Link的用户聊天页面
     * @method startUserChat
     * @param userId {string} 用户id
     * @param userName {string} 用户名称(可选)
     * @param ecode {string} 企业code(可选)
     */
    startUserChat: function (userId, userName, ecode) {
        link.startUserChat([userId, userName, ecode]);
    },

    /**
     * @class 群组
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

    /**
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

    /**
     * 打开群组列表
     * @method openGroupList
     */
    openGroupList: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn", //固定参数
            key: "GroupList" //固定参数
        }], null, null);
    },

    /**
     * 打开群组的名片页面
     * @method startGroupCard
     * @param groupId {string} 群组id
     * @param success {function} 成功回调
     * @param error {function} 失败回调函数，返回错误原因
     */
    startGroupCard: function (groupId, success, error) {
        link.startGroupCard([groupId], success, error);
    },

    /**
     * 打开群组发公告页面
     * @method sendGroupNotice
     * @param groupId {string} 群组id
     */
    sendGroupNotice: function (groupId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "PublishGroupAnnouncement",
            groupId: groupId
        }], null, null);
    },

    /**
     * 打开群组公告列表
     * @method openGroupNoticeList
     * @param groupId {string} 群组id
     */
    openGroupNoticeList: function (groupId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "GroupAnnouncementList",
            groupId: groupId
        }], null, null);
    },

    /**
     * 该接口用于调用Link的群组聊天页面
     * @method startGroupChat
     * @param groupId {string} 群组id
     * @param groupName {string} 群组名称(可选)
     */
    startGroupChat: function (groupId, groupName) {
        link.startGroupChat([groupId, groupName]);
    },

    /**
     * 打开一个群组公告详情
     * @method openGroupBulletinDetail
     * @param params {object} 参数
     * @param params.bulletinId {string} 公告id
     * @param params.groupId {string} 公告所属的群组id
     * @param params.title {string} 公告标题
     * @param params.content {string} 公告内容
     * @param params.isImportant {boolean} 是否是重要公告
     */
    openGroupBulletinDetail:function(params){
        link.openGroupBulletinDetail([params]);
    },

    /**
     * 打开群公告发表界面
     * @method startGroupBulletinEdit
     * @param params {object} 参数
     * @param params.groupId {string} 公告所属的群组id
     * @param params.title {string} 公告标题
     * @param params.content {string} 公告内容
     * @param params.isImportant {boolean} 是否是重要公告
     */
    startGroupBulletinEdit:function(params){
        link.startGroupBulletinEdit([params]);
    },

    /**
     * @class 部门
     */

    /**
     * 打开部门列表
     * @method openOrgList
     * @param orgId {string} 部门id
     */
    openOrgList: function (orgId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "OrganizationList",
            orgId: orgId || ''
        }], null, null);
    },

    /**
     * 查看部门名片页
     * @method openOrgCard
     * @param orgId
     */
    openOrgCard: function (orgId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "OrganizationCard",
            orgId: orgId
        }], null, null);
    },

    /**
     * @class 服务号
     */

    /**
     * 发送服务号公告
     * @method sendServiceAccountNotice
     * @param accountId {string} 服务号id
     * @param bulletinType {int} 公告类型(1文字,2图片,3语音) | 不传此参数时先进入公告类型选择页面
     */
    sendServiceAccountNotice: function (accountId, bulletinType) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "SendBulletin",
            accountId: accountId,
            bulletinType: bulletinType
        }], null, null);
    },

    /**
     * 查看服务号名片页
     * @method openServiceAccountCard
     * @param accountId {string} 服务号id
     */
    openServiceAccountCard: function (accountId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "ServiceAccountCard",
            accountId: accountId
        }], null, null);
    },

    /**
     * 查看已关注服务号列表
     * @method openServiceAccountList
     */
    openServiceAccountList: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "ServiceAccountList"
        }], null, null);
    },

    /**
     * 打开添加服务号页面
     * @method addServiceAcccount
     */
    addServiceAcccount: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "AddServiceAccount"
        }], null, null);
    },

    /**
     * 打开服务号聊天界面
     * @method startServiceAccountChat
     * @param accountId {String} 服务号id
     */
    startServiceAccountChat: function (accountId, accountName) {
        link.startServiceAccountChat([accountId, accountName]);
    },


    /**
     * @class 组织
     */

    /**
     * 根据部门id获取用户信息以及子部门信息
     * @method getChildListByOrgId
     * @param orgId {string} 部门id
     * @param page {int} 页码，从1开始
     * @param pagesize {int} 页数
     * @param success {function} 成功，返回某部门下的用户以及子部门
     * @param error {function} 失败回调函数，返回错误字符串
     */
    getChildListByOrgId: function (orgId, page, pagesize, success, error) {
        link.getChildListByOrgId([orgId, page, pagesize], success, error);
    },

    /**
     * 根据部门id获取该部门的信息
     * @method getDeptInfoById
     * @param orgId {String} 部门id
     * @param success {function} 成功，返回部门信息
     * @param error {function} 失败回调函数，返回错误字符串
     */
    getDeptInfoById: function (orgId, success, error) {
        link.getDeptInfoById([orgId], success, error);
    },

    /**
     * 执行同步服务
     * @method execSyncService
     * @param type{int} 同步类型。 0：用户信息同步，1：群组信息同步，2：部门信息同步，3：服务号信息同步，4：好友企业同步，5：应用同步
     * @param success {function} 成功，返回状态
     * @param error {function} 失败回调函数，返回错误字符串
     */
    execSyncService: function (type, success, error) {
        link.execSyncService([type], success, error);
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

    /**
     * 打开通讯录页面
     * @method openContactPage
     */
    openContactPage: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "Contact"
        }], null, null);
    },

    /**
     * @class 消息
     */

    /**
     * 打开消息中心页面
     * @method openMsgCenter
     */
    openMsgCenter: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MessageCenter"
        }], null, null);
    },

    /**
     * 获取未读消息总数
     * @method getUnreadMessageCount
     * @param success {function} 成功回调，返回数字
     * @param error {function} 失败回调,返回失败信息
     */
    getUnreadMessageCount: function (success, error) {
        link.getUnreadMessageCount([], success, error);
    },

    /**
     * 该方法用于获取指定帐号id的未读消息数
     * @method getUnreadMessageCountById
     * @param callback {function} 回调函数，返回未读消息数
     * @param talkWithId {string} 这里的帐号包括：用户的id，服务号的id，部门的id，群组的id
     */
    getUnreadMessageCountById: function (talkWithId, callback) {
        link.getUnreadMessageCountById([talkWithId], callback);
    },

    /**
     发送邀约消息（主要用在消息窗口）
     @param params {toId:,toType:,title:,desc:,action_params:}
     */
    sendInviteMessage: function (params, success, error) {
        params = params || {};
        link.sendInviteMessage([params], success, error);
    },

    /**
     * @class 动态
     */

    /**
     * 发表动态
     * @param options {object} 动态参数
     * @param options.authorID {string} 发表动态的对象id ， 可以是用户或用户运营的服务号 （不写默认是当前用户）
     * @param options.content {string} 动态内容
     * @param options.privateType {int}  私密类型 ， 0 群组，  1 部门， 2 个人 ， 3 项目  ， 4公开 （默认类型）
     * @param options.privateInstanceID {string}  私密对象id
     * @param options.privateName {string} 私密对象名称
     * @param options.labelIds {string} 'id1,id2,id3'动态的标签id（可选）
     * @param success {function} 成功回调
     * @param error {function} 失败回调
     */
    publishMicroblog: function (options, success, error) {
        var params = extend({
            code: "OpenBuiltIn",
            key: "PublishMicroBlog"
        }, options);
        link.launchLinkServiceWithDictionary([params], success, error);
    },

    /**
     * 打开某人动态主页
     * @method openUserMicroblog
     * @param userId {string} 用户id
     */
    openUserMicroblog: function (userId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "BlogCard",
            accountId: userId
        }], null, null);
    },

    /**
     * 打开某群组动态主页
     * @method openGroupMicroblog
     * @param groupId {string} 群组id
     */
    openGroupMicroblog: function (groupId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "GroupBlogList",
            groupId: groupId
        }], null, null);
    },

    startProjectDetail: function (projectId, success, error) {
        link.startProjectDetail([projectId], success, error);
    },

    /**
     * 打开某服务号动态主页
     * @method openServiceAccountMicroblog
     * @param serviceId {string} 服务号id
     */
    openServiceAccountMicroblog: function (serviceId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "BlogCard",
            accountId: serviceId,
            accountType: 3
        }], null, null);
    },

    /**
     * 打开某话题动态主页
     * @method openTopicMicroblog
     * @param topic {string} 话题名称
     */
    openTopicMicroblog: function (topic) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "TopicBlogList",
            topic: topic
        }], null, null);
    },

    /**
     * 打开动态详情
     * @method openMicroblogDetail
     * @param blogId {string} 动态id
     */
    openMicroblogDetail: function (blogId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "BlogDetail",
            blogId: blogId
        }], null, null);
    },

    openMyMicroblog: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MyMicroBlog"
        }], null, null);
    },

    /**
     * @class 应用
     */

    /**
     * 该方法用于app里面启动app
     * @method runApp
     * @param params{object} 启动应用的参数
     * @param params.appCode {string} 应用市场中填写的编码
     * @param params.appUrl {string} 启动页面地址
     * @param params.data {object} 启动目标应用后，通过getPageParams获取
     */
    runApp: function (params, success, error) {
        var dataStr = "";
        var url = params.appUrl;
        var urlParams = "";

        if (params.data) {
            for (var key in params.data) {
                dataStr += ("\n" + key + "=" + params.data[key]);
                urlParams += (key + "=" + encodeURIComponent(params[key]) + "&");
            }
        }
        //weex应用才将参数加到url后面
        if(url.endsWith("js")){
            if (params.appUrl) {
                if (url.indexOf('?') < 0) {
                    url += "?";
                }
                url += urlParams;
            }
        }
        params = "[OpenApp]\nappCode=" + params.appCode + (params.appUrl ? "\nappUrl=" + url : "") + dataStr;
        link.launchLinkService([params], success, error);
    },

    /**
     * 打开应用中心
     * @method openAppMarket
     */
    openAppMarket: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "DcService"
        }], null, null);
    },

    /**
     * 获取本地收藏的应用
     * @method getFavoriteApp
     * @param success {function} 成功获取数据回调
     * @param error {function} 失败回调
     */
    getFavoriteApp: function (success, error) {
        link.launchLinkServiceWithDictionary([{
            code: "Data",
            key: "GetFavoriteService"
        }], success, error);
    },


    /**
     * @class 签到定位
     */

    /**
     * 打开“我要签到”界面
     * @method startCheckIn
     */
    startCheckIn: function () {
        var params = "[StartCheckin]\npushToListOnComplete=false";
        link.launchLinkService([params], null, null);
    },

    /**
     * 打开“签到列表”界面
     * @method openCheckInList
     */
    openCheckInList: function () {
        var params = "[OpenBuiltIn]\nkey=MyCheckIn";
        link.launchLinkService([params], null, null);
    },

    /**
     * 打开签到详情页面
     * @method openCheckInDetail
     * @param checkinId {string} 签到id
     */
    openCheckInDetail: function (checkinId) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "CheckinDetail",
            checkinId: checkinId
        }], null, null);
    },

    /**
     * 打开地理定位界面，选择后返回
     * @method startLocationSelect
     * @param params {object} 参数
     *   @param params.canDrag {bool} 是否可以通过拖动改变位置,默认false
     *   @param params.canSearch {bool} 是否具备搜索功能,默认true
     *   @param params.title {string} 标题栏文本
     * @param success {function} 成功回调, 返回对象 {'longitude':42.2935494597,'latitude'116.0595516834,'addr':'具体位置'}
     * @param error {function} 失败回调
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

    /**
     * @class 我的
     */

    /**
     * 打开个人信息修改页面
     * @method openPersonEdit
     */
    openPersonEdit: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "EditPersonInfo"
        }], null, null);
    },

    /**
     * 打开个人设置页面
     * @method openSetting
     */
    openSetting: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenSubMenu",
            key: "setting",
            module: "MySelf"
        }], null, null);
    },

    /**
     * 打开关于页面
     * @method openAbout
     */
    openAbout: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MyAbout"
        }], null, null);
    },

    /**
     * 打开设置消息通知页面
     * @method openStNotification
     */
    openStNotification: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StNotification'
        }], null, null);
    },

    /**
     * 打开设置手势锁屏页面
     * @method openStGestureLock
     */
    openStGestureLock: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StGestureLock'
        }], null, null);
    },

    /**
     * 打开手势锁屏页面，如果没有设置，会先弹出设置界面，如果有设置，则直接弹出解锁页面
     * @method checkGestureLock
     */
    checkGestureLock: function (success, error) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'CheckGestureLock'
        }], success, error);
    },

    /**
     * 打开设置字体大小页面
     * @method openStFont
     */
    openStFont: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StFont'
        }], null, null);
    },

    /**
     * 打开设备管理页面
     * @method openStDevice
     */
    openStDevice: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StDevice'
        }], null, null);
    },

    /**
     * 打开手工同步页面
     * @method openStSync
     */
    openStSync: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StSync'
        }], null, null);
    },

    /**
     * 打开清除缓存页面
     * @method openStCleanCache
     */
    openStCleanCache: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StCleanCache'
        }], null, null);
    },

    /**
     * 打开修改密码页面
     * @method openStModifyPassword
     */
    openStModifyPassword: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StModifyPassword'
        }], null, null);
    },

    /**
     * 打开邀请好友页面
     * @method openStInvite
     */
    openStInvite: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'InviteUser'
        }], null, null);
    },

    /**
     * 打开二维码页面
     * @method openStQrcode
     */
    openStQrcode: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StQrcode'
        }], null, null);
    },

    /**
     * 打开注销页面
     * @method logout
     */
    logout: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: 'StLogout'
        }], null, null);
    },

    /**
     * @class 流程
     */

    /**
     * 打开自由流程页面
     * @param processId {string} 流程id
     * @param serviceName  {string} 流程名称
     */
    startProcess: function (processId, serviceName) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenProcess",
            processId: processId,
            serviceName: serviceName
        }], null, null);
    },

    /**
     * 打开我的工作页面
     * @method openProcessMywork
     */
    openProcessMywork: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "MyWork"
        }], null, null);
    },

    //日程，调用系统的日程接口
    insertOrUpdateSchedule: function (scheduleinfo, callback) {
        schedule.insertOrUpdate(scheduleinfo, callback);
    },
    deleteSchedule: function (scheduleinfo, callback) {
        schedule.deleteSchedule(scheduleinfo, callback);
    },
    querySchedule: function (scheduleinfo, callback) {
        schedule.querySchedule(scheduleinfo, callback);
    },

    /**
     * 分享内容到Link
     * @method share
     * @param params {object} 分享参数
     * @param params.title {string} 标题
     * @param params.content {string} 分享内容摘要
     * @param params.url {string} 点击进入的链接
     * @param params.icon {string} 分享的图标地址，支持远程地址，或本地图片
     * @param params.type {string} WEBSITE,PICTURE,ACTION
     * @param params.website {string} url
     * @param params.file {string} 存储服务的文件id
     * @param params.picture {string} 图片http地址
     * @param params.action {string} 执行指令
     */
    share: function (params, success, error) {
        if (params.type == "picture") params.icon = params.content;
        params = extend({
            content: "",
            title: ""
        }, params);
        link.share([params], success, error);
    },

    /**
     * 内容分享到聊天（个人/群组)
     * @method shareToMessage
     * @param params {object} 分享参数
     * @param success {function} 分享成功后回调
     * @param error {function}  分享失败后回调
     */
    shareToMessage: function (params, success, error) {
        if (params.type == "picture") params.icon = params.content;
        params = extend({
            content: "",
            title: ""
        }, params);
        link.shareToMessage([params], success, error);
    },

    /**
     * 内容分享到动态
     * @method shareToBlog
     * @param params {object} 分享参数
     * @param success {function} 分享成功后回调
     * @param error {function}  分享失败后回调
     */
    shareToBlog: function (params, success, error) {
        if (params.type == "picture") params.icon = params.content;
        params = extend({
            content: "",
            title: ""
        }, params);
        link.shareToBlog([params], success, error);
    },

    /**
     * @class 云盘
     */

    /**
     * 打开云盘选择文件(单选)
     * @method chooseDiskFile
     * @param success {function} 成功选择文件回调,返回 id、name、size
     * @param error {function} 失败回调
     */
    chooseDiskFile: function (success, error) {
        link.chooseDiskFile([], success, error);
    },

    /**
     * 创建云盘分享
     * @param id {string} 云盘文件id
     * @return result {Object} 公开分享
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

    /**
     * @class 网络请求
     */

    /**
     * 发送GET请求
     * @method get
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，自动拼接到url后面
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
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

    /**
     * 发送POST请求
     * @method post
     * @param params {object} 请求参数
     * @param params.url {string} 请求的URL
     * @param params.headers {object} 请求头, Content-Type默认值是 application/x-www-form-urlencoded
     * @param params.type {string} 响应类型, json(默认),text
     * @param params.data {object} 请求数据，带到 HTTP body中
     * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
     */
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
                        return ajax.post(params);
                    });
                } else {
                    return Promise.reject(status, statusText);
                }
            });
        });
    },

    /**
     * @class 其他
     */


    updateTabBadge: function (badgeValue) {
        link.updateTabBadge([badgeValue], null, null);
    },

    /**
     * 获取当前Link的主题颜色值
     * @method getThemeColor
     * @param success {function} 成功回调，返回颜色值
     */
    getThemeColor: function (success) {
        var callback = function (result) {
            //result.background_color = "#" + result.background_color.substring(3);
            success(result); //"#ff0072c6"
        }
        link.getThemeColor([], callback, null);
    },

    /**
     * 打开录制小视频
     * @method openVideoRecord
     */
    openVideoRecord: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "VideoCapture"
        }], null, null);
    },

    /**
     * 打开二维码扫码(自动解析指令，自动跳转)
     * @method scanCode
     */
    scanCode: function () {
        link.launchLinkServiceWithDictionary([{
            code: "OpenBuiltIn",
            key: "ScanCode"
        }], null, null);
    },

    /**
     * 打开二维码扫码(可设置直接返回扫码内容，不自行解析)
     * @param options {object} 扫码参数
     * @param options.isHandleResult {bool} 是否处理结果,默认false
     * @param success {function} 成功扫码后回调
     * @param error {function} 失败回调
     */
    scanCodeHandle: function (options, success, error) {
        link.scanCode([options], success, error);
    },

    /**
     * 打开Link内置浏览器
     * @method openLinkBroswer
     * @param title {string} 标题栏文本
     * @param url {string} 打开的url
     */
    openLinkBroswer: function (title, url) {
        link.launchLinkServiceWithDictionary([{
            code: "OpenUrl",
            title: title,
            url: url
        }], null, null);
    },

    /**
     * 打开BT容器，传入url
     * @method openBtBroswer
     * @param url {string} 打开的url
     */
    openBtBroswer: function (url) {
        var params = "[BingoTouch]\nurl=" + url;
        link.launchLinkService([params], null, null);
    },

    /**
     * 打开pdf文件：url支持本地以及远程的地址
     * @method openPdfBroswer
     * @param title {string} 标题栏文本
     * @param url {string} 打开的url
     */
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
     * 选择文件
     * @method chooseFile
     * @param callback {function} 选择文件成功回调
     */
    chooseFile: function (callback) {
        link.chooseFile([], callback, null);
    },

    /**
     * 获取当前语言环境
     * @method getLanguage
     * @param callback {function} 获取语言环境回调
     */
    getLanguage: function (callback) {
        link.getLanguage([], callback, null);
    },

    /**
     * 发起选择文件资源
     * @method selectFiles
     * @param type {int} 范围0~3，0：拍照 1：选择图片  2 本地文件  3：云盘文件
     * @param success {function} 成功回调函数
     * @param error {function} 失败回调函数
     */
    selectFiles:function(type,success,error){
        link.selectResourceFiles([type],success,error);
    },

    /**
     * 发起资源上传
     * @method uploadFiles
     * @param resArray {object} 从selectFiles获取到的对象
     * @param success {function} 成功回调函数
     * @param error {function} 失败回调函数
     */
    uploadFiles:function(resArray,success,error){
        link.uploadResourceFiles(resArray,success,error);
    },

    /**
     * 打开/浏览上传后的资源
     * @method openFile
     * @param res {object} 资源对象
     */
    openFile:function(res){
        link.openResourceFile([res])
    },

    /**
     * 注册广播接收器。注册后可以通过key监听全局消息
     * @method registerReceiver
     * @param key {string} 广播接收器的code，可以传入服务号的code
     */
    registerReceiver:function(key){
        link.registerReceiver([key]);
    },

    /**
     * 更新消息界面tab的角标
     * @method updateMessageTabBadge
     * @param params {object} 参数
     * @param params.appCode {string} 编码,如业务大厅编码businesscenter
     * @param params.unReadCount {int}  消息数量
     */
    updateMessageTabBadge:function(params){
        link.updateMessageTabBadge([params]);
    },

    /**
     * 发送退出应用事件
     * @method sendExitEvent
     * @param code {string} 应用appcode
     */
    sendExitEvent:function(code){
        link.sendExitEvent([code]);
    }

}

module.exports = linkapi;