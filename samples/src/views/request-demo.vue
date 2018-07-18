<template>
    <div>
        <bui-header
                title="网络请求"
                :leftItem="leftItem"
                @leftClick="back">
        </bui-header>

        <scroller>
            <bui-cell @cellClick="fetch" :title="'发送请求(fetch)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="get" :title="'发送GET请求(get)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="post" :title="'发送POST请求(post)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="deleteFn" :title="'发送DELETE请求(delete)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
            <bui-cell @cellClick="put" :title="'发送PUT请求(put)'"><bui-icon slot="action" name="ion-ios-arrow-right"></bui-icon></bui-cell>
        </scroller>
    </div>
</template>

<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>

<script>
    let linkRoot = '';
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
            fetch(){
                this.$alert(this.linkapi.fetch('get', {
                    "url": linkRoot+'/v1/api/todos/count'
                }));
            },
            get(){
                this.$alert(this.linkapi.get({
                    "url": linkRoot+'/v1/api/todos/count'
                }));
            },
            post(){
                this.$alert("this.linkapi.post()");
            },
            deleteFn(){
                this.$alert("this.linkapi.delete()");
            },
            put(){
                this.$alert("this.linkapi.put()");
            }
        },
        mounted(){
            if(this.ENV === 2) {
                linkRoot = 'https://link.bingocc.cc:5443/todosrv'
            }
        }
    }
</script>
