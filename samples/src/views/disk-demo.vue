<template>
    <div>
        <bui-header
                title="云盘"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="chooseDiskFile" :title="'打开云盘选择文件(单选)(chooseDiskFile)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="createDiskFileShare" :title="'创建云盘分享(createDiskFileShare)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openDiskFileDetail" :title="'查看云盘文件详情(openDiskFileDetail)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="openDisk" :title="'打开云盘(openDisk)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
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
            chooseDiskFile(){
                this.linkapi.chooseDiskFile((res)=>{
                    //成功选择文件回调,返回 id、name、size
                    this.$alert(res);
                });
            },
            createDiskFileShare(){
                this.linkapi.chooseDiskFile((res)=>{
                    //成功选择文件回调,返回 id、name、size
                    this.linkapi.createDiskFileShare(res.id, (resp)=>{
                        //成功回调，返回{Object} 公开分享具体参数：shareId、shareName、baseUrl、password、shareHref
                        this.$alert(resp);
                    });
                });
            },
            openDiskFileDetail(){
                this.linkapi.openDiskFileDetail("986d4e2b-6966-496e-82af-ab9770cb96f7", {}, (resp)=>{
                    this.$alert("成功回调");
                    this.$alert(resp);
                }, (error)=>{
                    this.$alert("失败回调");
                    this.$alert(error);
                });
            },
            openDisk(){
                this.linkapi.openDisk();
            }
        }
    }
</script>
