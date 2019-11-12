var link = weex.requireModule("LinkModule");
var schedule = weex.requireModule("ScheduleModule");
var platform = weex.config.env.platform;
var camera = weex.requireModule("CameraModule");
var sqlite = weex.requireModule("SQLiteModule");
var file = weex.requireModule("FileModule");
var fileTransfer = weex.requireModule("FileTransferModule");
var app = weex.requireModule("AppModule");
var globalEvent = weex.requireModule("globalEvent");
var ajax = require("./ajax.js");

var extend = function(obj, ext) {
  var key;
  if (typeof ext === "object") {
    for (key in ext) {
      obj[key] = ext[key];
    }
  }
  return obj;
};

/**
 * Link平台提供的功能接口，使用该模块需要安装linkapi模块（ npm install linkapi --save ）
 * @namespace linkapi
 */

var linkapi = {
  // /**
  //  * @class 用户
  //  */

  /**
   * 获取登陆后的用户信息
   * @method linkapi.getLoginInfo
   * @param {function} success 成功回调，返回当前登录用户信息
   * @param {function} error 失败回调，返回获取失败原因
   * @return {object} 包含字段: loginId,userId,userName,orgId,orgName,email,telephone,eCode,picture,picture_local
   */
  getLoginInfo: function(success, error) {
    link.getLoginInfo([], success, error);
  },

  /**
   * 获取登录用户凭证 AccessToken
   * @method linkapi.getToken
   * @param {function} success 成功回调，返回当前Token对象 {access_token:''}
   * @param {function} error 失败回调，返回获取失败原因
   * @return {object} 包含字段: accessToken
   */
  getToken: function(success, error) {
    return new Promise((resolve, reject) => {
      link.getToken(
        [],
        res => {
          resolve(res);
          success && success(res);
        },
        err => {
          reject(err);
          error && error(err);
        }
      );
    });
  },

  /**
   * 刷新平台的 AccessToken
   * @method linkapi.refreshToken
   * @param {function} success 成功回调，返回新的Token对象
   * @param {function} error 失败回调，返回获取失败原因
   * @return {object} 包含字段: accessToken
   */
  refreshToken: function(success, error) {
    return new Promise((resolve, reject) => {
      link.refreshToken(
        [],
        res => {
          resolve(res);
          success && success(res);
        },
        err => {
          reject(err);
          error && error(err);
        }
      );
    });
  },

  /**
   * 获取指定userId的用户信息,支持批量获取
   * @method linkapi.getUserInfo
   * @param  {string} id   用户userId,支持传入数组
   * @param  {function} success 成功回调函数，返回用户信息对象
   * @param  {function} error   失败回调函数，返回失败原因
   * @return {object}   包含字段: loginId,userId,userName,orgId,orgName,email,telephone,eCode,picture,picture_local
   */
  getUserInfo: function(id, success, error) {
    if (id instanceof Array) {
      link.getUserListInfo([id], success, error);
    } else {
      link.getUserInfo([id], success, error);
    }
  },

  /**
   * 根据loginId获取userId
   * @method linkapi.getUserIdWithLoginId
   * @param {string} loginId 登录id
   * @param  {function} success 成功回调函数，返回用户信息对象
   * @param  {function} error   失败回调函数，返回失败原因
   */
  getUserIdWithLoginId: function(loginId, success, error) {
    link.getUserIdWithLoginId([loginId], success, error);
  },

  /**
   * 根据手机或者邮箱获取用户信息
   * @method linkapi.getUserInfoByCellphoneOrEmail
   * @param key {string} 目前支持传入手机或者邮箱
   * @param success {function} 成功，返回用户信息
   * @param error {function} 失败回调函数，返回错误字符串
   */
  getUserInfoByCellphoneOrEmail: function(key, success, error) {
    link.getUserInfoByCellphoneOrEmail([key], success, error);
  },

  /**
   * 该接口用于调用Link的用户聊天页面
   * @method linkapi.startUserChat
   * @param userId {string} 用户id
   * @param userName {string} 用户名称(可选)
   * @param ecode {string} 企业code(可选)
   */
  startUserChat: function(userId, userName, ecode) {
    link.startUserChat([userId, userName, ecode]);
  },

  // /**
  //  * @class 群组
  //  */

  /**
   * 创建群组
   * @method linkapi.createGroup
   * @param  {Object} params 包含字段userIds, groupName
   * @param  {function} success 成功回调函数,返回创建成功的群组信息
   * @param  {function} error   失败回调函数,返回失败原因
   * @return {object} 包含字段: groupId,name,ownerId,type,isPublic等
   */
  createGroup: function(params, success, error) {
    var successCallback = function(resp) {
      if (typeof resp == "string") {
        resp = JSON.parse(resp);
        success(resp);
      } else if (typeof resp == "object") {
        success(resp);
      }
    };
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "CreateGroup",
          userSelected: params.userIds || [],
          isPublic: params.isPublic
          // groupName: params.groupName,
          // pickUsers: params.pickUsers
        }
      ],
      successCallback,
      error
    );
  },

  /**
   * 加入群组
   * @method linkapi.joinGroup
   * @param groupId {string} 群组Id
   * @param userIds {array} 用户userId
   * @param success {function} 成功回调,返回groupId
   * @param error {function} 失败回调函数，返回错误原因
   */
  joinGroup: function(groupId, userIds, success, error) {
    link.joinGroup([groupId, userIds], success, error);
  },

  /**
   * 打开群组列表
   * @method linkapi.openGroupList
   */
  openGroupList: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn", //固定参数
          key: "GroupList" //固定参数
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开群组的名片页面
   * @method linkapi.startGroupCard
   * @param groupId {string} 群组id
   * @param success {function} 成功回调
   * @param error {function} 失败回调函数，返回错误原因
   */
  startGroupCard: function(groupId, success, error) {
    link.startGroupCard([groupId], success, error);
  },

  /**
   * 打开群组发公告页面
   * @method linkapi.sendGroupNotice
   * @param groupId {string} 群组id
   */
  sendGroupNotice: function(groupId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "PublishGroupAnnouncement",
          groupId: groupId
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开群组公告列表
   * @method linkapi.openGroupNoticeList
   * @param groupId {string} 群组id
   */
  openGroupNoticeList: function(groupId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "GroupAnnouncementList",
          groupId: groupId
        }
      ],
      null,
      null
    );
  },

  /**
   * 该接口用于调用Link的群组聊天页面
   * @method linkapi.startGroupChat
   * @param groupId {string} 群组id
   * @param groupName {string} 群组名称(可选)
   */
  startGroupChat: function(groupId, groupName) {
    link.startGroupChat([groupId, groupName]);
  },

  /**
   * 打开一个群组公告详情
   * @method linkapi.openGroupBulletinDetail
   * @param params {object} 参数
   * @param params.bulletinId {string} 公告id
   * @param params.groupId {string} 公告所属的群组id
   * @param params.title {string} 公告标题
   * @param params.content {string} 公告内容
   * @param params.isImportant {boolean} 是否是重要公告
   */
  openGroupBulletinDetail: function(params) {
    link.openGroupBulletinDetail([params]);
  },

  /**
   * 打开群公告发表界面
   * @method linkapi.startGroupBulletinEdit
   * @param params {object} 参数
   * @param params.groupId {string} 公告所属的群组id
   * @param params.title {string} 公告标题
   * @param params.content {string} 公告内容
   * @param params.isImportant {boolean} 是否是重要公告
   */
  startGroupBulletinEdit: function(params) {
    link.startGroupBulletinEdit([params]);
  },

  // /**
  //  * @class 部门
  //  */

  /**
   * 打开部门列表
   * @method linkapi.openOrgList
   * @param orgId {string} 部门id
   */
  openOrgList: function(orgId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "OrganizationList",
          orgId: orgId || ""
        }
      ],
      null,
      null
    );
  },

  /**
   * 查看部门名片页
   * @method linkapi.openOrgCard
   * @param orgId {string}
   */
  openOrgCard: function(orgId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "OrganizationCard",
          orgId: orgId
        }
      ],
      null,
      null
    );
  },

  // /**
  //  * @class 服务号
  //  */

  /**
   * 发送服务号公告
   * @method linkapi.sendServiceAccountNotice
   * @param accountId {string} 服务号id
   * @param bulletinType {number} 公告类型(1文字,2图片,3语音) | 不传此参数时先进入公告类型选择页面
   */
  sendServiceAccountNotice: function(accountId, bulletinType) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "SendBulletin",
          accountId: accountId,
          bulletinType: bulletinType
        }
      ],
      null,
      null
    );
  },

  /**
   * 查看服务号名片页
   * @method linkapi.openServiceAccountCard
   * @param accountId {string} 服务号id
   */
  openServiceAccountCard: function(accountId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "ServiceAccountCard",
          accountId: accountId
        }
      ],
      null,
      null
    );
  },

  /**
   * 查看已关注服务号列表
   * @method linkapi.openServiceAccountList
   */
  openServiceAccountList: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "ServiceAccountList"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开添加服务号页面
   * @method linkapi.addServiceAcccount
   */
  addServiceAcccount: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "AddServiceAccount"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开服务号聊天界面
   * @method linkapi.startServiceAccountChat
   * @param accountId {String} 服务号id
   * @param accountName {String} 服务号名 (可选)
   */
  startServiceAccountChat: function(accountId, accountName) {
    link.startServiceAccountChat([accountId, accountName]);
  },

  // /**
  //  * @class 组织
  //  */

  /**
   * 根据部门id获取用户信息以及子部门信息
   * @method linkapi.getChildListByOrgId
   * @param orgId {string} 部门id
   * @param page {number} 页码，从1开始
   * @param pagesize {number} 页数
   * @param success {function} 成功，返回某部门下的用户以及子部门
   * @param error {function} 失败回调函数，返回错误字符串
   */
  getChildListByOrgId: function(orgId, page, pagesize, success, error) {
    link.getChildListByOrgId([orgId, page, pagesize], success, error);
  },

  /**
   * 根据部门id获取该部门的信息
   * @method linkapi.getDeptInfoById
   * @param orgId {String} 部门id
   * @param success {function} 成功，返回部门信息
   * @param error {function} 失败回调函数，返回错误字符串
   */
  getDeptInfoById: function(orgId, success, error) {
    link.getDeptInfoById([orgId], success, error);
  },

  /**
   * 执行同步服务
   * @method linkapi.execSyncService
   * @param type{number} 同步类型。 0：用户信息同步，1：群组信息同步，2：部门信息同步，3：服务号信息同步，4：好友企业同步，5：应用同步
   * @param success {function} 成功，返回状态
   * @param error {function} 失败回调函数，返回错误字符串
   */
  execSyncService: function(type, success, error) {
    link.execSyncService([type], success, error);
  },

  // /**
  //  * @class 通讯录
  //  */

  /**
   * 调用平台选人界面(单选)
   * @method linkapi.startContactSingleSelector
   * @param  {string} title  选人界面说明文本
   * @param  {number} dataType  选项: 1-用户,2-群组,3-用户+群组,4-部门(组织),5-用户+组织,8-服务号
   * @param  {object} extraParams 扩展参数
   * @param  {function} success 成功回调函数,返回用户信息
   * @param  {function} error   失败回调函数,返回失败原因
   * @return {object}  包含字段: name,type,id(即userId)
   */
  startContactSingleSelector: function(
    title,
    dataType,
    extraParams,
    success,
    error
  ) {
    extraParams = extend(
      {
        isIncludeDisableUser: false,
        hasLatelyChatConversation: true
      },
      extraParams
    );
    link.startContactSingleSelector(
      [title, dataType, extraParams],
      success,
      error
    );
  },

  /**
   * 调用平台选人界面(多选)
   * @method linkapi.startContactMulitSelector
   * @param  {string} title  选人界面说明文本
   * @param  {number} dataType  选项: 1-用户,2-群组,3-用户+群组,4-部门(组织),5-用户+组织,8-服务号
   * @param  {object} extraParams 扩展参数
   * @param  {array} extraHeadItems 扩展界面参数，例如新增选项项目，可自定义指令 [{title:'xx',action:'xx'}]
   * @param  {function} success 成功回调函数,返回用户信息
   * @param  {function} error   失败回调函数,返回失败原因
   * @return {object}  包含字段: 1-{user:[{name:,userId:}]",2-{group:[{name:,groupId:}]},3-{user:[{name:,userId:}],group:[{name:,groupId:}]},4-{organization:[{name:,orgId:}]},5-{user:[{name:,userId:}],organization:[{name:,orgId:}]},8-4-{account:[{name:,accountId:}]}
   */
  startContactMulitSelector: function(
    title,
    dataType,
    extraParams,
    success,
    error,
    extraHeadItems
  ) {
    extraParams = extend(
      {
        userSelected: [],
        groupSelected: [],
        organizationSelected: [],
        userIgnore: [],
        groupIgnore: [],
        organizationIgnore: [],
        isIncludeDisableUser: false
      },
      extraParams
    );
    extraHeadItems = extraHeadItems || {};
    link.startContactMulitSelector(
      [title, dataType, extraParams, extraHeadItems],
      success,
      error
    );
  },

  /**
   * 选人界面扩展方法:获取已选择的人
   * @method linkapi.getSelectedListContactSelector
   * @param callback {function} callback
   */
  getSelectedListContactSelector: function(callback) {
    link.getSelectedList_ContactSelector([], callback);
  },

  /**
   * 选人界面扩展方法:添加选择的人
   * @method linkapi.addSelectedContactSelector
   * @param model {object} id,name,icon,type
   */
  addSelectedContactSelector: function(model) {
    link.addSelected_ContactSelector([model]);
  },

  /**
   * 选人界面扩展方法:移除选择的人
   * @method linkapi.removeSelected_ContactSelector
   * @param model {object} id,name,icon,type
   */
  removeSelected_ContactSelector: function(model) {
    link.removeSelected_ContactSelector([model]);
  },

  /**
   * 选人界面扩展事件：监听全局移除事件
   * @event linkapi.onRemoveFromSelectedArea
   * @param model {object} 选择的model，包含id,name,icon,type
   */

  /**
   * 打开指定userId用户的名片
   * @method linkapi.startUserCard
   * @param  {string} id 用户userId
   */
  startUserCard: function(id) {
    link.startUserCard([id], null, null);
  },

  /**
   * 打开通讯录页面
   * @method linkapi.openContactPage
   */
  openContactPage: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "Contact"
        }
      ],
      null,
      null
    );
  },

  // /**
  //  * @class 消息
  //  */

  /**
   * 打开消息中心页面
   * @method linkapi.openMsgCenter
   */
  openMsgCenter: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "MessageCenter"
        }
      ],
      null,
      null
    );
  },

  /**
   * 获取未读消息总数
   * @method linkapi.getUnreadMessageCount
   * @param success {function} 成功回调，返回数字
   * @param error {function} 失败回调,返回失败信息
   */
  getUnreadMessageCount: function(success, error) {
    link.getUnreadMessageCount([], success, error);
  },

  /**
   * 该方法用于获取指定帐号id的未读消息数
   * @method linkapi.getUnreadMessageCountById
   * @param callback {function} 回调函数，返回未读消息数
   * @param talkWithId {string} 这里的帐号包括：用户的id，服务号的id，部门的id，群组的id
   */
  getUnreadMessageCountById: function(talkWithId, callback) {
    link.getUnreadMessageCountById([talkWithId], callback);
  },

  /**
     * 发送邀约消息（主要用在消息窗口）
     * @method linkapi.sendInviteMessage
     * @param params {Object} 详情如下
     toId:,toType:,title:,desc:,action_params:
     */
  sendInviteMessage: function(params, success, error) {
    params = params || {};
    link.sendInviteMessage([params], success, error);
  },

  // /**
  //  * @class 动态
  //  */

  /**
   * 发表动态
   * @param options {object} 动态参数
   * @param options.authorID {string} 发表动态的对象id ， 可以是用户或用户运营的服务号 （不写默认是当前用户）
   * @param options.content {string} 动态内容
   * @param options.privateType {number}  私密类型 ， 0 群组，  1 部门， 2 个人 ， 3 项目  ， 4公开 （默认类型）
   * @param options.privateInstanceID {string}  私密对象id
   * @param options.privateName {string} 私密对象名称
   * @param options.labelIds {string} 'id1,id2,id3'动态的标签id（可选）
   * @param success {function} 成功回调
   * @param error {function} 失败回调
   */
  publishMicroblog: function(options, success, error) {
    var params = extend(
      {
        code: "OpenBuiltIn",
        key: "PublishMicroBlog"
      },
      options
    );
    link.launchLinkServiceWithDictionary([params], success, error);
  },

  /**
   * 打开某人动态主页
   * @method linkapi.openUserMicroblog
   * @param userId {string} 用户id
   */
  openUserMicroblog: function(userId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "BlogCard",
          accountId: userId
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开某群组动态主页
   * @method linkapi.openGroupMicroblog
   * @param groupId {string} 群组id
   */
  openGroupMicroblog: function(groupId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "GroupBlogList",
          groupId: groupId
        }
      ],
      null,
      null
    );
  },

  // *
  //  * 打开项目
  //  * @method linkapi.startProjectDetail
  //  * @param projectId {string} 项目id

  startProjectDetail: function(projectId, success, error) {
    link.startProjectDetail([projectId], success, error);
  },

  /**
   * 打开某服务号动态主页
   * @method linkapi.openServiceAccountMicroblog
   * @param serviceId {string} 服务号id
   */
  openServiceAccountMicroblog: function(serviceId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "BlogCard",
          accountId: serviceId,
          accountType: 3
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开某话题动态主页
   * @method linkapi.openTopicMicroblog
   * @param topic {string} 话题名称
   */
  openTopicMicroblog: function(topic) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "TopicBlogList",
          topic: topic
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开动态详情
   * @method linkapi.openMicroblogDetail
   * @param blogId {string} 动态id
   */
  openMicroblogDetail: function(blogId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "BlogDetail",
          blogId: blogId
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开我的动态主页
   * @method linkapi.openMyMicroblog
   */

  openMyMicroblog: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "MyBlogCard"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开动态主页
   * @method linkapi.openMicroblogCenter
   */
  openMicroblogCenter: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "DcMicroBlog"
        }
      ],
      null,
      null
    );
  },

  // /**
  //  * @class 应用
  //  */

  /**
   * 该方法用于app里面启动app
   * @method linkapi.runApp
   * @param params{object} 启动应用的参数
   * @param params.appObj {object} 启动应用时的额外参数，可传可不传
   * @param params.appCode {string} 应用市场中填写的编码
   * @param params.appUrl {string} 启动页面地址
   * @param params.data {object} 启动目标应用后，通过getPageParams获取
   * @param params.recordAction {bool} 记录操作行为,默认false，设置为 true 的时候只使用appCode，其他参数无效
   */
  runApp: function(params, success, error) {
    var dataStr = "";
    var url = params.appUrl || "";
    var urlParams = "";
    var recordAction = params.recordAction || false;
    if (params.data) {
      for (var key in params.data) {
        dataStr += "\n" + key + "=" + params.data[key];
        urlParams += key + "=" + encodeURIComponent(params.data[key]) + "&";
      }
    }
    //weex应用才将参数加到url后面
    if (url.endsWith("js")) {
      if (params.appUrl) {
        if (url.indexOf("?") < 0) {
          url += "?";
        }
        url += urlParams;
      }
    }
    //应用启动的时候，在后台会记录操作情况,用于统计
    var isSupport = weex.supports("@module/LinkModule.startApp");
    if (recordAction && isSupport) {
      if(params.appObj) link.startApp([params.appCode, params.appObj], success, error);
      else link.startApp([params.appCode], success, error);
      return;
    }
    params =
      "[OpenApp]\nappCode=" +
      params.appCode +
      (params.appUrl ? "\nappUrl=" + url : "") +
      dataStr;
    link.launchLinkService([params], success, error);
  },

  /**
   * 执行指令的接口
   * @method linkapi.launchLinkService
   */
  launchLinkService: function(params, success, error) {
    link.launchLinkService([params], success, error);
  },

  /**
   * 打开应用中心
   * @method linkapi.openAppMarket
   */
  openAppMarket: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "DcService"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开收藏应用中心
   * @method linkapi.openServiceMarketDesktop
   */
  openServiceMarketDesktop: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "ServiceMarketDesktop"
        }
      ],
      null,
      null
    );
  },

  /**
   * 获取本地收藏的应用
   * @method linkapi.getFavoriteApp
   * @param success {function} 成功获取数据回调
   * @param error {function} 失败回调
   */
  getFavoriteApp: function(success, error) {
    var successCallback = function(resp) {
      if (typeof resp == "string") {
        resp = JSON.parse(resp);
        success(resp);
      } else if (typeof resp == "object") {
        success(resp);
      }
    };
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "Data",
          key: "GetFavoriteService"
        }
      ],
      successCallback,
      error
    );
  },

  // /**
  //  * @class 签到定位
  //  */

  /**
   * 打开“我要签到”界面
   * @method linkapi.startCheckIn
   */
  startCheckIn: function() {
    var params = "[StartCheckin]\npushToListOnComplete=false";
    link.launchLinkService([params], null, null);
  },

  /**
   * 打开“签到列表”界面
   * @method linkapi.openCheckInList
   */
  openCheckInList: function() {
    var params = "[OpenBuiltIn]\nkey=MyCheckIn";
    link.launchLinkService([params], null, null);
  },

  /**
   * 打开签到详情页面
   * @method linkapi.openCheckInDetail
   * @param checkinId {string} 签到id
   */
  openCheckInDetail: function(checkinId) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "CheckinDetail",
          checkinId: checkinId
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开地理定位界面，选择后返回
   * @method linkapi.startLocationSelect
   * @param params {object} 参数
   *   @param params.canDrag {bool} 是否可以通过拖动改变位置,默认false
   *   @param params.canSearch {bool} 是否具备搜索功能,默认true
   *   @param params.title {string} 标题栏文本
   * @param success {function} 成功回调, 返回对象 {'longitude':42.2935494597,'latitude'116.0595516834,'addr':'具体位置'}
   * @param error {function} 失败回调
   */
  startLocationSelect: function(params, success, error) {
    var successCallback = function(resp) {
      if (typeof resp == "string") {
        resp = JSON.parse(resp);
        success(resp);
      } else if (typeof resp == "object") {
        success(resp);
      }
    };
    params.canDrag = params.canDrag || false;
    params.canSearch = params.canSearch || true;
    link.startLocationSelect([params], successCallback, error);
  },

  // /**
  //  * @class 我的
  //  */

  /**
   * 打开个人信息修改页面
   * @method linkapi.openPersonEdit
   */
  openPersonEdit: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "EditPersonInfo"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开个人设置页面
   * @method linkapi.openSetting
   */
  openSetting: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenSubMenu",
          key: "setting",
          module: "MySelf"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开个人设置页面
   * @method linkapi.openMe
   */
  openMe: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          module: "MySelf"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开关于页面
   * @method linkapi.openAbout
   */
  openAbout: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "MyAbout"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开设置消息通知页面
   * @method linkapi.openStNotification
   */
  openStNotification: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StNotification"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开设置手势锁屏页面
   * @method linkapi.openStGestureLock
   */
  openStGestureLock: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StGestureLock"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开手势锁屏页面，如果没有设置，会先弹出设置界面，如果有设置，则直接弹出解锁页面
   * @method linkapi.checkGestureLock
   */
  checkGestureLock: function(success, error) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "CheckGestureLock"
        }
      ],
      success,
      error
    );
  },

  /**
   * 打开设置字体大小页面
   * @method linkapi.openStFont
   */
  openStFont: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StFont"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开设备管理页面
   * @method linkapi.openStDevice
   */
  openStDevice: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StDevice"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开手工同步页面
   * @method linkapi.openStSync
   */
  openStSync: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StSync"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开清除缓存页面
   * @method linkapi.openStCleanCache
   */
  openStCleanCache: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StCleanCache"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开修改密码页面
   * @method linkapi.openStModifyPassword
   */
  openStModifyPassword: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StModifyPassword"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开邀请好友页面
   * @method linkapi.openStInvite
   */
  openStInvite: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "InviteUser"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开二维码页面
   * @method linkapi.openStQrcode
   */
  openStQrcode: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StQrcode"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开注销页面
   * @method linkapi.logout
   */
  logout: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StLogout"
        }
      ],
      null,
      null
    );
  },

  // /**
  //  * @class 流程
  //  */

  /**
   * 打开自由流程页面
   * @param processId {string} 流程id
   * @param serviceName  {string} 流程名称
   */
  startProcess: function(processId, serviceName) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenProcess",
          processId: processId,
          serviceName: serviceName
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开我的工作页面
   * @method linkapi.openProcessMywork
   */
  openProcessMywork: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "MyWork"
        }
      ],
      null,
      null
    );
  },

  /**
   * 日程，调用系统的日程接口
   * @method linkapi.insertOrUpdateSchedule
   * @param scheduleinfo {object}
   */
  insertOrUpdateSchedule: function(scheduleinfo, callback) {
    schedule.insertOrUpdate(scheduleinfo, callback);
  },
  /**
   * 删除某条日程记录
   * @method linkapi.deleteSchedule
   */
  deleteSchedule: function(scheduleinfo, callback) {
    schedule.deleteSchedule(scheduleinfo, callback);
  },
  /**
   * 查询某条日程记录
   * @method linkapi.querySchedule
   */
  querySchedule: function(scheduleinfo, callback) {
    schedule.querySchedule(scheduleinfo, callback);
  },

  /**
   * 全部日程记录
   * @method linkapi.querySchedule
   */
  queryAllSchedule: function(successCallback, failCallback) {
    schedule.queryAllSchedule(successCallback, failCallback);
  },

  /**
   * 分享内容到Link
   * @method linkapi.share
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
   *
   * @example
   * 分享网页
   * {
   *    title:"标题",
   *    type:"WEBSITE",
   *    content:"http://domain/path",
   * }
   *
   * 分享打开应用
   * {
   *    title:"标题",
   *    type:"ACTION",
   *    content:"[OpenApp]\nappCode=xxxx\nappUrl=xxxx"
   * }
   */
  share: function(params, success, error) {
    if (params.type == "picture") params.icon = params.content;
    params = extend(
      {
        content: "",
        title: ""
      },
      params
    );
    link.share([params], success, error);
  },

  /**
   * 内容分享到聊天（个人/群组)
   * @method linkapi.shareToMessage
   * @param params {object} 分享参数
   * @param params.title {string} 分享标题
   * @param params.brief {string} 分享的内容简要
   * @param params.content {string} 分享内容，可以是指令/url/文本内容
   * @param params.pcHomeUrl {string} 分享链接 link pc端使用
   * @param params.icon {string} 分享图标链接
   * @param params.type {string} 类型 ACTION 使用指令/WEBSITE(打开网站)/PICTURE(分享图片)
   * @param success {function} 分享成功后回调
   * @param error {function}  分享失败后回调
   */
  shareToMessage: function(params, success, error) {
    if (params.type == "picture") params.icon = params.content;
    params = extend(
      {
        content: "",
        title: ""
      },
      params
    );
    link.shareToMessage([params], success, error);
  },

  /**
   * 内容分享到动态
   * @method linkapi.shareToBlog
   * @param params.title {string} 分享标题
   * @param params.brief {string} 分享的内容简要
   * @param params.content {string} 分享内容，可以是指令/url/文本内容
   * @param params.pcHomeUrl {string} 分享链接 link pc端使用
   * @param params.icon {string} 分享图标链接
   * @param params.type {string} 类型 ACTION 使用指令/WEBSITE(打开网站)/PICTURE(分享图片)
   * @param params.action_content {string} json字符串，需要用JSON.stringify(action_content)
   * 参考:
   * var action_content = {
      android:"[OpenUrl]\nurl=https://www.baidu.com",
      ios:"[OpenUrl]\nurl=https://www.baidu.com",
      pc:JSON.stringify({"urlParams":"https://www.baidu.com"})
    };
   * @param success {function} 分享成功后回调
   * @param error {function}  分享失败后回调
   */
  shareToBlog: function(params, success, error) {
    if (params.type == "picture") params.icon = params.content;
    params = extend(
      {
        content: "",
        title: ""
      },
      params
    );
    link.shareToBlog([params], success, error);
  },

  // /**
  //  * @class 云盘
  //  */

  /**
   * 打开云盘选择文件(单选)
   * @method linkapi.chooseDiskFile
   * @param success {function} 成功选择文件回调,返回 id、name、size
   * @param error {function} 失败回调
   */
  chooseDiskFile: function(success, error) {
    link.chooseDiskFile([], success, error);
  },

  /**
     * 创建云盘分享
     * @param id {string} 云盘文件id
     * @param success {function} 成功回调，返回{Object} 公开分享
     具体参数：shareId、shareName、baseUrl、password、shareHref
     * @param error {function} 失败回调
     */
  createDiskFileShare: function(id, success, error) {
    link.createDiskFileShare([id], success, error);
  },

  /**
   * 查看云盘文件详情
   * @param diskFileId {string} 云盘文件id
   * @param diskShare {Object} 云盘文件分享信息
   */
  openDiskFileDetail: function(diskFileId, shareInfo, success, error) {
    link.openDiskFileDetail([diskFileId, shareInfo], success, error);
  },

  /**
   * 打开云盘
   */
  openDisk: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "StartNewDisk",
          naviStyle: 3
        }
      ],
      null,
      null
    );
  },

  // /**
  //  * @class 网络请求
  //  */

  /**
   * 发送请求
   * @method linkapi.fetch
   * @param method linkapi.{string} 请求方式，支持 GET,POST,DELETE,PUT
   * @param params {object} 请求参数
   * @param params.url {string} 请求的URL
   * @param params.headers {object} 请求头
   * @param params.type {string} 响应类型, json(默认),text
   * @param params.data {object} 请求数据，自动拼接到url后面
   * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
   */
  fetch: function(method, params) {
    return this.getToken().then(res => {
      let token = res["accessToken"];
      params.headers = params.headers || {};
      params.headers["Authorization"] = "Bearer" + token;
      return ajax.exec(method, params).catch((status, statusText) => {
        if (status == 401) {
          return this.refreshToken().then(res => {
            token = res["accessToken"];
            params.headers = params.headers || {};
            params.headers["Authorization"] = "Bearer" + token;
            return ajax.exec(method, params);
          });
        } else {
          return Promise.reject(status, statusText);
        }
      });
    });
  },

  /**
   * 发送GET请求
   * @method linkapi.get
   * @param params {object} 请求参数
   * @param params.url {string} 请求的URL
   * @param params.headers {object} 请求头
   * @param params.type {string} 响应类型, json(默认),text
   * @param params.data {object} 请求数据，自动拼接到url后面
   * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
   */
  get: function(params) {
    return this.fetch("GET", params);
  },

  /**
   * 发送POST请求
   * @method linkapi.post
   * @param params {object} 请求参数
   * @param params.url {string} 请求的URL
   * @param params.headers {object} 请求头, Content-Type默认值是 application/x-www-form-urlencoded
   * @param params.type {string} 响应类型, json(默认),text
   * @param params.data {object} 请求数据，带到 HTTP body中
   * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
   */
  post: function(params) {
    return this.fetch("POST", params);
  },

  /**
   * 发送DELETE请求
   * @method linkapi.delete
   * @param params {object} 请求参数
   * @param params.url {string} 请求的URL
   * @param params.headers {object} 请求头
   * @param params.type {string} 响应类型, json(默认),text
   * @param params.data {object} 请求数据，自动拼接到url后面
   * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
   */
  delete: function(params) {
    return this.fetch("DELETE", params);
  },

  /**
   * 发送PUT请求
   * @method linkapi.put
   * @param params {object} 请求参数
   * @param params.url {string} 请求的URL
   * @param params.headers {object} 请求头, Content-Type默认值是 application/x-www-form-urlencoded
   * @param params.type {string} 响应类型, json(默认),text
   * @param params.data {object} 请求数据，带到 HTTP body中
   * @return {Promise.<TResult>} 成功: resolve(data, status, statusText), 失败: reject(status, statusText)
   */
  put: function(params) {
    return this.fetch("PUT", params);
  },

  // /**
  //  * @class 其他
  //  */

  /**
   * 更新消息的角标
   * @method linkapi.updateTabBadge
   * @param badgeValue {number}
   */
  updateTabBadge: function(badgeValue) {
    link.updateTabBadge([badgeValue], null, null);
  },

  /**
   * 获取当前Link的主题颜色值
   * @method linkapi.getThemeColor
   * @param success {function} 成功回调，返回颜色值
   */
  getThemeColor: function(success) {
    var callback = function(result) {
      //result.background_color = "#" + result.background_color.substring(3);
      success(result); //"#ff0072c6"
    };
    link.getThemeColor([], callback, null);
  },

  /**
   * 打开录制小视频
   * @method linkapi.openVideoRecord
   */
  openVideoRecord: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "VideoCapture"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开二维码扫码(自动解析指令，自动跳转)
   * @method linkapi.scanCode
   */
  scanCode: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "ScanCode"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开二维码扫码(可设置直接返回扫码内容，不自行解析)
   * @param options {object} 扫码参数
   * @param options.isHandleResult {bool} 是否处理结果,默认false
   * @param success {function} 成功扫码后回调
   * @param error {function} 失败回调
   */
  scanCodeHandle: function(options, success, error) {
    link.scanCode([options], success, error);
  },

  /**
   * 打开Link内置浏览器
   * @method linkapi.openLinkBroswer
   * @param title {string} 标题栏文本
   * @param url {string} 打开的url
   */
  openLinkBroswer: function(title, url) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenUrl",
          title: title,
          url: url
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开BT容器，传入url
   * @method linkapi.openBtBroswer
   * @param url {string} 打开的url
   */
  openBtBroswer: function(url) {
    var params = "[BingoTouch]\nurl=" + url;
    link.launchLinkService([params], null, null);
  },

  /**
   * 打开pdf文件：url支持本地以及远程的地址
   * @method linkapi.openPdfBroswer
   * @param title {string} 标题栏文本
   * @param url {string} 打开的url
   */
  openPdfBroswer: function(title, url) {
    var params = {
      name: title,
      uri: url
    };
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
   * @method linkapi.chooseFile
   * @param callback {function} 选择文件成功回调
   */
  chooseFile: function(callback) {
    link.chooseFile([], callback, null);
  },

  /**
   * 获取当前语言环境
   * @method linkapi.getLanguage
   * @param callback {function} 获取语言环境回调
   */
  getLanguage: function(callback) {
    link.getLanguage([], callback, null);
  },

  /**
   * 发起选择文件资源
   * @method linkapi.selectFiles
   * @param type {number} 范围0~5，0：拍照 1：选择图片  2 本地文件单选  3：云盘文件  4: 界与聊天里的文件跳转后界面相同，选择最近聊天文件和本地文件(仅支持安卓)  5: 本地文件多选(仅支持安卓)
   * @param success {function} 成功回调函数
   * @param error {function} 失败回调函数
   */
  selectFiles: function(type, success, error) {
    try {
      link.selectResourceFiles([type], success, error);
    } catch (e) {}
  },

  /**
   * 发起资源上传
   * @method linkapi.uploadFiles
   * @param resArray {array} 从selectFiles获取到的对象
   * @param success {function} 成功回调函数
   * @param error {function} 失败回调函数
   */
  uploadFiles: function(resArray, success, error) {
    try {
      link.uploadResourceFiles(resArray, success, error);
    } catch (e) {}
  },

  /**
   * 打开/浏览上传后的资源
   * @method linkapi.openFile
   * @param res {object} 资源对象，从selectFiles获取到的对象
   */
  openFile: function(res) {
    try {
      link.openResourceFile([res]);
    } catch (e) {}
  },

  /**
   * 注册广播接收器。注册后可以通过key监听全局消息
   * @method linkapi.registerReceiver
   * @param type {number} 聊天类型 私聊=1 群组=2 部门=4 服务号=5
   * @param key {string} 广播接收器的code，可以传入服务号的code,type=5时, 为服务号的code,否则为talkWithId
   */
  registerReceiver: function(type, key) {
    try {
      link.registerReceiver([type, key]);
    } catch (e) {}
  },

  /**
   * 更新消息界面tab的角标
   * @method linkapi.updateMessageTabBadge
   * @param params {object} 参数
   * @param params.appCode {string} 编码,如业务大厅编码businesscenter
   * @param params.unReadCount {number}  消息数量
   */
  updateMessageTabBadge: function(params) {
    try {
      link.updateMessageTabBadge([params]);
    } catch (e) {}
  },

  // *
  //  * 发送退出应用事件
  //  * @method linkapi.sendExitEvent
  //  * @param code {string} 应用appcode

  sendExitEvent: function(code) {
    try {
      link.sendExitEvent([code]);
    } catch (e) {}
  },

  /**
   * 取消指定聊天对象的通知栏信息
   * @method linkapi.cancelMsgNtf
   * @param id {string}  可以是私聊、群组、服务号等聊天对象Id
   */
  cancelMsgNtf: function(id) {
    try {
      link.cancelMsgNtf([id]);
    } catch (e) {}
  },

  /**
   * 根据类型清除通知栏的通知
   * @method linkapi.cancelMsgNtfByCategoryId
   * @param categoryId
   */
  cancelMsgNtfByCategoryId: function(categoryId) {
    try {
      link.cancelMsgNtfByCategoryId([categoryId]);
    } catch (e) {}
  },

  /**
   * 设置聊天界面右上角的气泡未读数
   * @method linkapi.setChatActionTip
   * @param id {string} 可以是私聊、群组、服务号等聊天对象Id
   * @param tip {string} 未读数或者文本
   */
  setChatActionTip: function(id, tip) {
    try {
      link.setChatActionTip([id, tip]);
    } catch (e) {}
  },

  /**
   * 发送消息通用方法
   * @method linkapi.sendMessage
   * @param msgObj {object}
   * @param msgObj.toCompany {string} 对应企业code
   * @param msgObj.toId {string} 指定对象id
   * @param msgObj.toName {string} 指定对象名称
   * @param msgObj.toType {string} 指定对象类型
   * @param msgObj.content {string} 消息体（todo)
   * @param msgObj.msgType {string} 消息类型 (todo)
   */
  sendMessage: function(msgObj, success, error) {
    try {
      link.sendMessage([msgObj], success, error);
    } catch (e) {}
  },

  /**
   * 读取文件文本内容
   * @method linkapi.readTextFromFile
   * @param filePath {string} 文件路径，远程或者本地
   * @param charset {string} 编码方式 utf-8 或者 gb2312
   * @param success {function} 成功回调函数，返回文本内容
   * @param error {function} 失败回调函数，返回错误信息
   */
  readTextFromFile: function(filePath, charset, success, error) {
    if (filePath.startsWith("http")) {
      ajax
        .exec("GET", { url: filePath })
        .then(success)
        .catch(error);
    } else {
      try {
        filePath = filePath.replace("file:", "");
        link.readTextFromFile(
          [filePath, charset],
          res => {
            try {
              if (typeof res == "string") {
                res = JSON.parse(res);
              }
              success(res);
            } catch (e) {
              error(e);
            }
          },
          error
        );
      } catch (e) {
        error(e);
      }
    }
  },

  /**
   * 打开搜索界面
   * @method linkapi.startSearch
   * @param keyword {string} 关键字
   */
  startSearch: function(keyword) {
    try {
      link.startSearch([keyword], null, null);
    } catch (e) {}
  },

  /**
   * 打开语音助手
   * @method linkapi.speechAssistant
   */
  speechAssistant: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "SpeechAssistant"
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开语音助手
   * @method linkapi.openSpeechAssistant
   */
  openSpeechAssistant: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "SpeechAssistant"
        }
      ],
      null,
      null
    );
  },

  /**
   * 获取Link登录的cookie信息
   * @method linkapi.getLoginCookies
   * @param success {function} 成功回调函数
   * @param error {function} 失败回调函数，返回错误信息
   */
  getLoginCookies: function(success, error) {
    link.getLoginCookies([], success, error);
  },

  /**
   * 获取需要授权认证的url
   * @method linkapi.getDomainRequireAuthUrls
   * @param success {function} 成功回调函数
   * @param error {function} 失败回调函数，返回错误信息
   */
  getDomainRequireAuthUrls: function(success, error) {
    link.getDomainRequireAuthUrls([], success, error);
  },

  /**
   * 获取link图片物理地址,根据内部定的协议获取真实的物理地址
   * @method linkapi.getImage
   * @param image {string} 图片标识例如 dist://xxx.png, store://xxx.png ,  iconxxx.png
   * @param {function} success 返回图片路径
   * @param {function} error 错误信息
   */
  getImage: function(image, success, error) {
    link.getImage([image], success, error);
  },

  /**
   * 发起聊天
   * @method linkapi.startChat
   */
  startChat: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "StartChat" //固定参数
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开待办待阅
   * @method linkapi.unityTodo
   * @params params {object}
   * @param params.defaultIndex 0(待办)/1（待阅）/2（已办）
   */
  openTodo: function(params) {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "UnityTodo", //固定参数
          defaultIndex: params.defaultIndex
        }
      ],
      null,
      null
    );
  },

  /**
   * 打开邮箱
   * @method linkapi.startEmail
   */
  startEmail: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn", //固定参数
          key: "StartEmail"
        }
      ],
      null,
      null
    );
  },

  /**
   * 获取未读邮箱条数
   * @method linkapi.startEmail
   * @param success {function} 成功回调函数，返回文本内容
   * @param error {function} 失败回调函数，返回错误信息
   */
  getEmailUnreadCount: function(success, error) {
    link.getEmailUnreadCount(success, error);
  },

  /**
   * 打开在线客服
   * @method linkapi.openOnlineServicer
   */
  openOnlineServicer: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "OnlineServicer"
        }
      ],
      null,
      null
    );
  },

  /**
   * 获取配置的服务器地址
   * @param success {function} 成功回调函数，返回json对象
   * @param error {function} 失败回调函数，返回错误信息
   * @method linkapi.getServerConfigs
   */
  getServerConfigs: function(success, error) {
    link.getServerConfigs([], success, error);
  },

  /**
   * 关闭 keyboard
   * @method linkapi.hideKeyboard
   */
  hideKeyboard: function() {
    app.hideKeyboard();
  },

  /**
   * 获取 IMEI(android)
   * @method linkapi.getIMEI
   * @param success {function} 成功回调函数
   */
  getIMEI: function(success) {
    app.getIMEI(success);
  },

  /**
   * 拨打电话
   * @method linkapi.call
   * @param {string} phoneNum 电话号码
   */
  call: function(phoneNum) {
    app.call(phoneNum);
  },

  /**
   * 显示加载中
   * @method linkapi.showLoading
   * @param {object} params
   * @param {string} params.title 标题文本
   */
  showLoading: function(params) {
    app.showLoading(params);
  },

  /**
   * 隐藏加载中
   * @method linkapi.hideLoading
   */
  hideLoading: function() {
    app.hideLoading();
  },

  /**
   * 显示成功提示
   * @method linkapi.showSuccess
   * @param {object} params
   * @param {string} params.title 标题文本
   */
  showSuccess: function(params) {
    app.showSuccess(params);
  },

  /**
   * 显示错误提示
   * @method linkapi.showError
   * @param {object} params
   * @param {string} params.title 标题文本
   */
  showError: function(params) {
    app.showError(params);
  },

  /**
   * @callback cameraCallback
   * @param {Object} info 返回的结果对象
   * @param {string} [info.status] "success"表示操作成功, "fail"表示失败, "cancel"表示用户取消操作
   * @param {number} [info.code] 100: 成功, 101:摄像头不可用, 102:摄像头无权限, 103:图片保存失败, 400: 参数错误
   * @param {string} [info.message] 相应的文字描述信息
   * @param {Array} [info.filePaths] 图片路径数组
   */

  /**
   * 拍照
   * @method linkapi.captureImage
   * @param {object} [params] - 配置
   * @param {string} [params.cameraDirection = 'back'] - "front"使用前置摄像头，"back"使用后置摄像头。默认后置。
   * @param {boolean} [params.saveToPhotoAlbum = true] - 是否保存到系统相册，默认 true。
   * @param {number} [params.quality=100] - 可选 1 - 100。尺寸不变，清晰度改变。数值越大越清晰，100 为原始清晰度。 TODO: 更详细文档
   * @param  {number} [params.targetWidth] - 图片输出实际宽度
   * @param  {number} [params.targetHeight] - 图片输出实际高度
   * @param  {boolean} [params.isCrop=true] - 是否裁剪，默认 true。cropWidth 和 cropHeight 只有在 isCrop 为 true 时生效。如果 cropWidth 与 cropHeight 只传一个，另外一个默认与这个相同。
   * @param  {number} [params.cropWidth] - 裁剪框宽度，默认屏幕宽度。
   * @param  {number} [params.cropHeight] - 裁剪框高度，默认与宽度一致。
   * @param {cameraCallback} [callback] - 回调函数
   */
  captureImage: function(params, callback) {
    camera.captureImage(params, callback);
  },

  /**
   * 选择图片
   * @method linkapi.selectImage
   * @param  {Object} [params] - 配置
   * @param  {number} [params.maxSelect=1] - 最多选择的图片张数。参数 isCrop, cropWidth, cropHeight 只有在 maxSelect = 1 时有效。
   * @param  {number} [params.quality=100] - 质量，尺寸不变，清晰度改变。
   * @param  {boolean} [params.isCrop=true] - 是否裁剪，默认 true。cropWidth 和 cropHeight 只有在 isCrop 为 true 时生效。如果 cropWidth 与 cropHeight 只传一个，默认另外一个与这个相同。
   * @param  {number} [params.cropWidth] - 裁剪框宽度，默认屏幕宽度。
   * @param  {number} [params.cropHeight] - 裁剪框高度，默认与宽度一致。
   * @param {cameraCallback} [callback] - 回调函数
   */
  selectImage: function(params, callback) {
    camera.selectImage(params, callback);
  },

  /**
   * 裁剪图片
   * @method linkapi.cropImage
   * @param  {Object} [params] - 配置
   * @param  {string} [params.sourcePath] - 源文件
   * @param  {boolean} [params.savePath] - 保存路径
   * @param  {number} [params.quality=100] - 质量，尺寸不变，清晰度改变。
   * @param  {number} [params.cropWidth] - 裁剪框宽度，默认屏幕宽度。
   * @param  {number} [params.cropHeight] - 裁剪框高度，默认与宽度一致。
   * @param {cameraCallback} [callback] - 回调函数
   */
  cropImage: function(params, callback) {
    camera.cropImage(params, callback);
  },

  /**
   * 压缩图片
   * @method linkapi.compressImage
   * @param  {Object} [params] - 配置
   * @param  {string} [params.sourcePath] - 源文件
   * @param  {boolean} [params.savePath] - 保存路径
   * @param  {number} [params.targetWidth] - 图片输出实际宽度
   * @param  {number} [params.targetHeight] - 图片输出实际高度
   * @param  {number} [params.quality=100] - 质量，尺寸不变，清晰度改变。
   * @param {cameraCallback} [callback] - 回调函数
   */
  compressImage: function(params, callback) {
    camera.compressImage(params, callback);
  },

  /**
   * 图片转成base64
   * @method linkapi.imgToBase64
   * @param  {object} params  配置
   * @param  {string} params.imgPath 图片路径
   * @param  {string} params.quality 质量，默认50
   * @param  {function} success 成功回调，返回转换后的base64字符串
   * @param  {function} error    失败回调，返回错误信息
   */
  imgToBase64: function(params, success, error) {
    camera.imgToBase64(params, success, error);
  },

  /**
   * 错误回调函数
   * @callback errorCallback
   * @param {string} error 错误信息
   */

  /**
   * 打开文件,office,pdf等，使用系统中能打开的软件打开该文件
   * @method linkapi.fileOpenFile
   * @param {String} uri - 文件的 uri
   * @param {Object} [params] - 打开文件参数
   * @param {bool} [params.showChooser=false] - 是否显示应用选择器，默认为 false
   * @param {string} [params.chooserTitle] - 当 option.showChooser 为 true 且平台为 Android 时有效，设置选择器的标题
   * @param {Function} [success] - 成功回调函数 ,无返回结果
   * @param {errorCallback} [error] - 失败回调函数，返回错误原因
   */
  fileOpenFile: function(uri, params, success, error) {
    file.openFile(uri, params, success, error);
  },

  /**
   * 选择文件回调函数
   * @callback selectFileCallback
   * @param {string} path 选中文件的路径
   */

  /**
   * 打开文件选择器。Android 上打开文件管理器，可以选择各种类型的文件，iOS 上打开 Photos 应用，只能选择图片或视频。
   * @method linkapi.selectFile
   * @param {selectFileCallback} [success] - 成功回调函数，如果用户取消操作，则返回参数为空字符串
   * @param {errorCallback} [error] - 失败回调函数，返回错误原因，例如无权限
   */
  selectFile: function(success, error) {
    file.selectFile(success, error);
  },

  /**
   * 文件是否存在
   * @method linkapi.exist
   * @param {String} [file] - 文件本地路径
   * @param {function} [callback] - 成功回调函数，返回true/false
   */
  exist: function(filePath, callback) {
    file.exist(filePath, callback);
  },

  /**
   * 获取应用能够读写的目录
   * @method linkapi.getAppDirectroy
   * @param {function} [callback] - 回调函数，返回应用能够读写的目录
   */
  getAppDirectroy: function(callback) {
    file.getAppDirectroy(callback);
  },

  /**
   * @callback progressCallback
   * @param {Object} progressInfo - 进度信息对象
   * @param {number} progressInfo.current - 当前进度（in byte）
   * @param {number} progressInfo.total - 总共数据（in byte）
   */

  /**
   * @callback successCallback
   * @param {Object} successInfo
   * @param {Object} successInfo.headers - HTTP response header
   * @param {number} successInfo.code - HTTP 状态码
   * @param {string} successInfo.path - 文件保存路径 (only for download)
   * @param {string} successInfo.response - HTTP response body (only for upload)
   */

  /**
   * @callback errorCallback
   * @param {Object} errorInfo
   * @param {string} errorInfo.error - 错误信息
   * @param {Object} [errorInfo.headers] - HTTP response header
   * @param {number} [errorInfo.code] - HTTP 状态码
   * @param {string} [errorInfo.response] - HTTP response body
   */

  /**
   * 下载文件到指定位置
   * @method linkapi.download
   * @param {String} url - 要下载的文件 url
   * @param {Object} [params] - 配置参数
   * @param {Object} [params.saveDir] - 保存的目录，默认保存到应用目录下
   * @param {Object} [params.filename] - 保存的文件名，默认使用系统建议的文件名
   * @param {Object} [params.headers] - HTTP request header
   * @param {string} [params.method="GET"] - HTTP method
   * @param {progressCallback} [progress] - 过程回调函数
   * @param {successCallback} [success] - 成功回调函数
   * @param {errorCallback} [error] - 失败回调函数
   */
  download: function(url, params, progress, success, error) {
    fileTransfer.download(url, params, progress, success, error);
  },

  /**
   * 暂停下载
   * @method linkapi.pauseDownload
   * @param  {string} url 下载中的 url
   */
  pauseDownload: function(url) {
    fileTransfer.pauseDownload(url);
  },

  /**
   * 恢复下载
   * @method linkapi.resumeDownload
   * @param  {string} url 下载中的 url
   */
  resumeDownload: function(url) {
    fileTransfer.resumeDownload(url);
  },

  /**
   * 取消下载
   * @method linkapi.cancelDownload
   * @param  {string} url 下载中的 url
   */
  cancelDownload: function(url) {
    fileTransfer.cancelDownload(url);
  },

  /**
   * 上传文件到指定服务器
   * @method linkapi.upload
   * @param {string} [file] - 本地文件路径
   * @param {string} [serverUrl] - 服务器 url
   * @param {Object} [options] - 配置参数
   * @param {string} [options.name] - form data multi-part 对应的 name 属性，注意不是 filename 属性
   * @param {Object} [options.headers] - HTTP request header
   * @param {string} [options.method] - HTTP method
   * @param {progressCallback} [progress] - 过程回调函数
   * @param {successCallback} [success] - 成功回调函数
   * @param {errorCallback} [error] - 失败回调函数
   */
  upload: function(file, serverUrl, params, progress, success, error) {
    fileTransfer.upload(file, serverUrl, params, progress, success, error);
  },

  /**
   * 取消上传
   * @method linkapi.cancelUpload
   * @param  {string} serverUrl 上传中的 url
   */
  cancelUpload: function(serverUrl) {
    fileTransfer.cancelUpload(serverUrl);
  },

  /**
   * TODO: 目前底层需要一个唯一 id 作为任务标记，使得在下载或上传过程中有机会取消指定任务。
   * 目前使用的 id 是任务的 url 地址，因此造成限制：同时间只能下载同一个 url 或者上传同一个 url。
   * 如果将 id 改为别的，就不会有这个限制。
   */

  /**
   * 打开数据库，在进行其他数据库操作之前调用
   * @method linkapi.open
   * @param {String} [dbName] - 数据库名称
   * @param {function} [success] - 成功回调函数
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.open("test.db",
   *     function(){console.log("open db success!"); },
   *     function(errMsg){console.log("open db error: " + errMsg);}
   * );
   */
  open: function(dbName, success, error) {
    sqlite.open(dbName, success, error);
  },

  /**
   * 关闭数据库
   * @method linkapi.close
   * @param {String} [dbName] - 数据库名称
   * @param {function} [success] - 成功回调函数
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.close("test.db",
   *     function(){console.log("close db success!"); },
   *     function(errMsg){console.log("close db error: " + errMsg);}
   * );
   */
  close: function(dbName, success, error) {
    sqlite.close(dbName, success, error);
  },

  /**
   * 使用SQL查询数据库记录
   * @method linkapi.execQuery
   * @param {String} [dbName] - 数据库名称
   * @param {String} [sql] - 需要执行的查询SQL语句
   * @param {function} [success] - 成功回调函数，dataList表示查询到数据列表
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.execQuery("test.db", "select * from Persons",
   *     function(dataList){
   *         if(dataList){
   *             console.log("query " + dataList.length + " result:");
   *             for(var i = 0; i < dataList.length; ++i){
   *                 console.log("  " + i + ":" + JSON.stringify(dataList[i]))
   *             }
   *         }else{
   *             console.log("query 0 result:");
   *         }
   *     },
   *     function(errMsg){
   *         console.log("query error: " + errMsg);
   *     }
   * );
   */
  execQuery: function(dbName, sql, success, error) {
    sqlite.execQuery(dbName, sql, success, error);
  },

  /**
   * 使用SQL添加/修改/删除数据库、记录（除了查询）
   * @method linkapi.execSQL
   * @param {String} [dbName] - 数据库名称
   * @param {String} [sql] - 需要执行的SQL语句
   * @param {function} [success] - 成功回调函数，无参数
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.execSQL("test.db", "CREATE TABLE Persons (LastName varchar(255), FirstName varchar(255), Age int, Address varchar(255), City varchar(255))",
   *     function(){console.log("create table success!");},
   *     function(errMsg){console.log("create table error: " + errMsg);}
   * );
   */
  execSQL: function(dbName, sql, success, error) {
    sqlite.execSQL(dbName, sql, success, error);
  },

  /**
   * 查询数据
   * @method linkapi.query
   * @param {String} [dbName] - 数据库名称
   * @param {String} [tableName] - 表名
   * @param {Array} [columns] - 要查询的字段列表
   * @param {String} [whereClause] - 查询条件， 如："Age=30"; 如果没有传入""
   * @param {function} [success] - 成功回调函数，dataList表示查询到数据列表
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * var columns = ['FirstName', 'LastName'];
   * linkapi.query("test.db", "Persons", columns, "",
   *     function(dataList){
   *         if(dataList){
   *             console.log("query " + dataList.length + " result:");
   *             for(var i = 0; i < dataList.length; ++i){
   *                 console.log("  " + i + ":" + JSON.stringify(dataList[i]))
   *             }
   *         }else{
   *             console.log("query 0 result:");
   *         }
   *     },
   *     function(errMsg){
   *         console.log("query error: " + errMsg);
   *     }
   * );
   */
  query: function(dbName, tableName, columns, whereClause, success, error) {
    sqlite.query(dbName, tableName, columns, whereClause, success, error);
  },

  /**
   * 插入一条数据
   * @method linkapi.insert
   * @param {String} [dbName] - 数据库名称
   * @param {String} [tableName] - 表名
   * @param {Object} [values] - 字段名对应值
   * @param {function} [success] - 成功回调函数，返回rowId
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.insert("test.db", "Persons", {LastName:"c", FirstName:"sx", Age:30, Address:"test adress", City:"gz"},
   *     function(rowId){
   *         console.log("insert data sucess: " + rowId);
   *     },
   *     function(errMsg){
   *         console.log("insert data error: " + errMsg);
   *     }
   * );
   */
  insert: function(dbName, tableName, values, success, error) {
    sqlite.insert(dbName, tableName, values, success, error);
  },

  /**
   * 根据条件更新表记录
   * @method linkapi.update
   * @param {String} [dbName] - 数据库名称
   * @param {String} [tableName] - 表名
   * @param {Object} [values] - 字段名对应值
   * @param {String} [whereClause] - 指定更新条件， 如："Age=30"; 如果没有传入""
   * @param {function} [success] - 成功回调函数，返回count成功更新的记录数
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.update("test.db", "Persons", {FirstName:'c', LastName:"sx"}, "Age=30",
   *     function(count){
   *         console.log("update data row count: " + count)
   *     },
   *     function(errMsg){
   *         console.log("update error: " + errMsg);
   *     }
   * );
   */
  update: function(dbName, tableName, values, whereClause, success, error) {
    sqlite.update(dbName, tableName, values, whereClause, success, error);
  },

  /**
   * 根据条件删除记录
   * @method linkapi.deleteSqlite
   * @param {String} [dbName] - 数据库名称
   * @param {String} [tableName] - 表名
   * @param {String} [whereClause] - 指定更新条件， 如："Age=30"; 如果没有传入""
   * @param {function} [success] - 成功回调函数，返回count成功删除的记录数
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.deleteSqlite("test.db", "Persons", "FirstName='shixin'",
   *    function(count){
   *        console.log("delete row count: " + count);
   *    },
   *    function(errMsg){
   *        console.log("delete error: " + errMsg);
   *    }
   * );
   */
  deleteSqlite: function(dbName, tableName, whereClause, success, error) {
    sqlite.delete(dbName, tableName, whereClause, success, error);
  },

  /**
   * 在同一个事务中批量执行SQL
   * @method linkapi.transaction
   * @param {String} [dbName] - 数据库名称
   * @param {List} [sqls] - SQL列表
   * @param {function} [success] - 成功回调函数，无返回值
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * var sqls = [];
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * sqls[sqls.length++] = ("INSERT INTO Persons(LastName, FirstName, Age, City, Address) VALUES('sx', 'chen', 30, 'gz', 'test address')");
   * linkapi.transaction("test.db", sqls,
   *     function(){
   *         console.log("transaction success");
   *     },
   *     function(errMsg){
   *         console.log("transaction error: " + errMsg);
   *     }
   * );
   */
  transaction: function(dbName, sql, success, error) {
    sqlite.transaction(dbName, sql, success, error);
  },

  /**
   * 删除表
   * @method linkapi.dropTable
   * @param {String} [dbName] - 数据库名称
   * @param {String} [tableName] - 表名
   * @param {function} [success] - 成功回调函数
   * @param {function} [error] - 失败回调函数, errMsg 表示失败原因
   * @example
   * linkapi.dropTable("test.db", "Persons",
   *    function(){
   *        console.log("drop table success!");
   *    },
   *    function(errMsg){
   *        console.log("drop table error: " + errMsg);
   *    }
   * );
   */
  dropTable: function(dbName, tableName, success, error) {
    sqlite.dropTable(dbName, tableName, success, error);
  },

  /**
   * 浏览多媒体资源，包括图片、视频(android)
   * @method linkapi.browseMultiMedia
   * @param {object} params 参数
   * @param {array} params.data 媒体数据对象数组，数据对象{url:"",thumbUrl:"",fileSize:100,fileType:1} fileType: 1图片2视频
   * @param {integer} params.position 初始化位置，默认是0
   * @param {bool} params.isVideoMuteOnFirstPlay 是否静音播放点击进来的视频，默认 false
   * @param {bool} params.isOptionEnable  是否允许进行保存网盘，分享聊天等操作，默认 true
   */
  browseMultiMedia: function(params) {
    params = extend(
      {
        data: [],
        position: 0,
        isVideoMuteOnFirstPlay: false,
        isOptionEnable: true
      },
      params
    );
    link.browseMultiMedia(params);
  },

  /**
   * 获取当前位置信息
   * @method linkapi.getLocation
   * @param {function} success 成功回调函数，返回对象 {latitude:23.177897,longitude:113.420305,address:"中国广东省广州市天河区天政街"}
   * @param {function} error 失败回调函数，返回错误信息
   */
  getLocation: function(success, error) {
    link.getLocation([], success, error);
  },

  /**
   * 获取注册事件返回的消息体、cmd值
   * @method linkapi.getLocation
   * @param {function} success 成功回调函数，返回值cmd 、消息体。
   */
  getMsgCmd: function(registerReceiverName, success) {
    globalEvent.addEventListener(registerReceiverName, res => {
      var newMsg = JSON.parse(JSON.stringify(res));
      var msgObj = {};
      msgObj = newMsg;
      res = JSON.parse(res.message);
      msgObj.message = JSON.parse(newMsg.message);
      if (WXEnvironment && WXEnvironment.platform === "android") {
        msgObj.message.content = JSON.parse(msgObj.message.content);
        msgObj.message.content.params = JSON.parse(
          msgObj.message.content.params
        );
        res = JSON.parse(res.content).cmd;
      } else {
        if (typeof res.cmdInfo == "string") res = JSON.parse(res.cmdInfo);
        else res = res.cmdInfo;
        msgObj.message.cmdInfo = res;
        msgObj.message.cmdInfo.params = JSON.parse(res.params);
        res = res.cmdType;
      }
      success && success(res, msgObj);
    });
  },
  /**
   * 打开我的页面
   * @method linkapi.openMySelf
   */
  openMySelf: function() {
    link.launchLinkServiceWithDictionary(
      [
        {
          code: "OpenBuiltIn",
          key: "MySelf"
        }
      ],
      null,
      null
    );
  },

  /**
   * 获取sdcard目录
   * @method linkapi.getSdcardAppDir
   * @param success
   * @param error
   */
  getSdcardAppDir: function(success, error) {
    link.getSdcardAppDir([], success, error);
  },

  /**
   * 保存图片到相册
   * @method linkapi.saveFileToGallery
   * @param obj 对应前端应该是一个json对象，需要path字段，另外还有一个type字段，如果是图片type字段可以不传
   * @param success
   * @param error
   */
  saveFileToGallery: function(obj, success, error) {
    link.saveFileToGallery([obj], success, error);
  },

  /**
   * 添加用户行为日志
   * @param {Object} params 参数对象
   * @param {String} moduleCategory 模块分类
   * @param {String} moduleName 模块名称
   * @param {String} eventType 事件类型
   * @param {String} eventEntry 事件入口
   * @param {String} eventParams 事件参数
   * @param {String} targetId 操作对象id（userid/groupid等)
   * @param {String} targetName 操作对象名称
   */
  addAnalysisLog: function(params) {
    link.addAnalysisLog([params],null,null);
  }
};

/**
 * @namespace globalEvent
 */

/**
 * var globalEvent = weex.requireModule("globalEvent");
 */

/**
 * 网络状态
 * @event globalEvent.networkStatus
 * @type {object}
 * @property {string} [status] 三种网络状态，分别是 'offline','wifi','mobile'
 * @example
 * var globalEvent = weex.requireModule('globalEvent');
 * globalEvent.addEventListener("networkStatus", function (e) {
 *       console.log(e.status)
 * });
 */

/**
 * 键盘状态
 * @event globalEvent.keyboardStatus
 * @type {object}
 * @property {string} [status] 分别是 'show' 和 'hide'
 * @example
 * var globalEvent = weex.requireModule('globalEvent');
 * globalEvent.addEventListener("keyboardStatus", function (e) {
 *       console.log(e.status)
 * });
 */

/**
 * 返回
 * @event globalEvent.androidback
 * @type {object}
 * @example
 * var globalEvent = weex.requireModule('globalEvent');
 * globalEvent.addEventListener("androidback", function (e) {
 *       console.log(e)
 * });
 */

module.exports = linkapi;
