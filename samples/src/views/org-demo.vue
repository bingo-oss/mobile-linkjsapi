<template>
    <div>
        <bui-header
                title="部门"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="openOrgList" :title="'打开部门列表(openOrgList)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openOrgCard" :title="'查看部门名片页(openOrgCard)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            openOrgList(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.openOrgList(res.orgId);
                });
            },
            openOrgCard(){
                this.linkapi.getUserInfoByCellphoneOrEmail('17900000016', (res)=>{
                    this.linkapi.openOrgCard(res.orgId);
                });
            }
        },
        mounted: function () {

        }
    }
</script>
