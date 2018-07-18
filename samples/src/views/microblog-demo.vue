<template>
    <div>
        <bui-header
                title="动态"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="publishMicroblog" :title="'发表动态(publishMicroblog)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openUserMicroblog" :title="'打开某人动态主页(openUserMicroblog)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openGroupMicroblog" :title="'打开某群组动态主页(openGroupMicroblog)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openServiceAccountMicroblog" :title="'打开某服务号动态主页(openServiceAccountMicroblog)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openTopicMicroblog" :title="'打开某话题动态主页(openTopicMicroblog)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openMicroblogDetail" :title="'打开动态详情(openMicroblogDetail)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openMyMicroblog" :title="'打开个人动态主页(openMyMicroblog)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openMicroblogCenter" :title="'打开动态主页(openMicroblogCenter)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            publishMicroblog(){
                this.linkapi.getLoginInfo((res)=>{
                    this.linkapi.publishMicroblog({
                        'authorID': res.userId,
                        'content': '发现了其中的奥妙~赞',
                        'privateType': 2
                    }, (resp)=>{
                        this.$alert(resp);
                    });
                });

            },
            openUserMicroblog(){
                this.linkapi.getLoginInfo( (res)=>{
                    this.linkapi.openUserMicroblog(res.userId);
                });
            },
            openGroupMicroblog(){
                this.linkapi.openGroupMicroblog('a6018ac0-b462-427e-9838-722d4ccfd6a2');
            },
            openServiceAccountMicroblog(){
                this.linkapi.openServiceAccountMicroblog('70975e19-6b70-46ec-86a6-9788f1eb5457');
            },
            openTopicMicroblog(){
                this.linkapi.openTopicMicroblog('发进卡里的交罚款');
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
