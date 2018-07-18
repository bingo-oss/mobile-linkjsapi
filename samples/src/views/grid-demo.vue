<template>
    <div>
        <bui-header
                title="组织"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="getChildListByOrgId" :title="'根据部门id获取用户信息以及子部门信息(getChildListByOrgId)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="getDeptInfoById" :title="'根据部门id获取该部门的信息(getDeptInfoById)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="execSyncService" :title="'执行同步服务(execSyncService)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            getChildListByOrgId(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.getChildListByOrgId(res.orgId, 1, 2, (resp)=>{
                        this.$alert(resp);
                    }, (error)=>{
                        this.$alert(error);
                    });
                });
            },
            getDeptInfoById(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.getDeptInfoById(res.orgId, (resp)=>{
                        this.$alert(resp);
                    }, (error)=>{
                        this.$alert(error);
                    });
                });
            },
            execSyncService(){
                //type 同步类型。 0：用户信息同步，1：群组信息同步，2：部门信息同步，3：服务号信息同步，4：好友企业同步，5：应用同步
                this.linkapi.execSyncService(0, (resp)=>{
                    this.$alert(resp);
                }, (error)=>{
                    this.$alert(error);
                });
            }
        },
        mounted: function () {

        }
    }
</script>
