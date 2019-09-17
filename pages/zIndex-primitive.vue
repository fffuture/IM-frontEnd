<template>
    <div class="page-index">
        <h2>LAVAS</h2>
        <h4>[ˈlɑ:vəz]</h4>

        <router-link to="/swiper"  tag="div" style="width:70%;height: 3rem;border:.1rem solid gray;text-align: center;line-height: 3rem;border-radius: 1rem;margin:0 auto">
            进入微信
        </router-link>
        <!--<div  tag="div" style="width: 100%;height: 3rem;border:.1rem solid gray;">-->
            <!--进入微信-->
        <!--</div>-->
    </div>
</template>

<script>
function setState(store) {}

export default {
    name: 'index',
    metaInfo: {
        title: 'Home',
        titleTemplate: '%s - Lavas',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    async asyncData({store, route}) {
        setState(store);
    },
    mounted:function(){
        // this.$router.push({
        //         "name": "swiper",
        //         "path": "/swiper",
        //     });
    }
};
</script>

<style lang="stylus" scoped>

/*.page-index
    display flex
    justify-content center
    align-items center
    flex-direction column

    h2
        font-size 46px
        font-weight 500
        margin-bottom 0*/

</style>
