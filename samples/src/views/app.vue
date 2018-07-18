<template>
  <div class="flex-column center">
    <bui-image src="/image/logo.png" width="150px" height="150px"></bui-image>
    <text class="h2">BUI-Weex-linkapi</text>
    <text class="h4">提供基于小程序开发的link接口</text>
    <bui-button type="primary" value="快速体验" @click="jumpTo"></bui-button>
  </div>
</template>


<style lang="sass" src="bui-weex/src/css/buiweex.scss"></style>

<script>
  import linkapi from 'linkapi';
  const globalEvent = weex.requireModule('globalEvent');
  let linkRoot = '';
  export default {
    data() {
        return {

        }
      },
      methods: {

          jumpTo () {
              var url = "index.weex.js";
              this.$push(url);
          }



      },
      mounted() {
          globalEvent.addEventListener("androidback",(e)=> {
              this.$pop();
          });





      }
  }
</script>
