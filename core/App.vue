<template>
    <div id="app" class="app">
        <svg-icon></svg-icon>
        <!--<transition
            :name="pageTransitionEffect"
            @before-enter="handleBeforeEnter"
            @after-enter="handleAfterEnter"
            @before-leave="handleBeforeLeave">
            <keep-alive
                :include="[...keepAlivePages]">
                <router-view
                    :key="routerViewKey"
                    :class="['app-view', pageTransitionClass]"
                    :data-page-id="$route.fullPath">
                </router-view>
            </keep-alive>
        </transition>-->
        <router-view></router-view>
       <update-toast></update-toast>
       <!-- <webrtc-page></webrtc-page> -->
    </div>
</template>

<script>
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';
import UpdateToast from '@/components/UpdateToast';
import {keepAlivePages} from '@/.lavas/router';
import svgIcon from '@/components/SVG-icon.vue'

import webrtcPage from '@/pages/main/webrtc';


const ENABLE_SCROLL_CLASS = 'app-view-scroll-enabled';

export default {
    name: 'app',
    components: {
        UpdateToast,
        svgIcon,
        // webrtcPage
    },
    computed: {
        ...mapState('pageTransition', {
            pageTransitionType: state => state.type,
            pageTransitionEffect: state => state.effect
        }),

        ...mapState('scrollBehavior', {
            scrollPostionMap: state => state.scrollPostionMap
        }),

        pageTransitionClass() {
            return `transition-${this.pageTransitionType}`;
        },

        // https://github.com/lavas-project/lavas/issues/119
        routerViewKey() {
            let {name, params} = this.$route;
            let paramKeys = Object.keys(params);
            if (paramKeys.length) {
                return name + paramKeys.reduce((prev, cur) => prev + params[cur], '');
            }
            return null;
        }
    },
    data() {
        return {
            // https://github.com/lavas-project/lavas/issues/112
            keepAlivePages
        };
    },
    methods: {
        ...mapActions('scrollBehavior', [
            'savePageScrollPosition'
        ]),

        /**
         * make current page container scrollable,
         * and restore its scroll position.
         */
        restoreContainerScrollPosition(containerEl, scrollTop) {
            containerEl.classList.add(ENABLE_SCROLL_CLASS);
            containerEl.scrollTop = scrollTop;
        },

        /**
         * make body scrollable,
         * and restore its scroll position.
         */
        restoreBodyScrollPosition(containerEl, scrollTop) {
            containerEl.classList.remove(ENABLE_SCROLL_CLASS);
            document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
        },

        handleBeforeEnter(el) {
            let pageId = el.dataset.pageId;
            let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {};
            Vue.nextTick(() => {
                this.restoreContainerScrollPosition(el, scrollTop);
            });
        },

        handleAfterEnter(el) {
            let pageId = el.dataset.pageId;
            let {y: scrollTop = 0} = this.scrollPostionMap[pageId] || {};
            this.restoreBodyScrollPosition(el, scrollTop);
        },

        handleBeforeLeave(el) {
            let pageId = el.dataset.pageId;
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            this.restoreContainerScrollPosition(el, scrollTop);
            // save current scroll position in a map
            this.savePageScrollPosition({
                pageId,
                scrollPosition: {y: scrollTop}
            });
        }
    },
    mounted:function(){
        //此处可以使用中介者模式      
        this.$store.state.dataHandler.router = this.$router;
        console.log("首页router",this.$store.state.dataHandler.router );
        /*if(  this.$store.state.dataHandler.weChatId === ""  ){
			this.$router.replace("/login");
        }*/
        // console.log("首页router",this.$router);
    },
    created:function(){
        if(  this.$store.state.dataHandler.weChatId === ""  ){
            this.$router.replace("/login");
            console.log('swiper');
        }
    }
};
</script>

<style lang="stylus">
$page-transition-duration = 0.35s

body
    overflow hidden

.app
    height: 100%
    font-size: .9rem

.color-gray{
    color:rgb(150,150,150);
}
.chatDetails .swiper-pagination-bullet{
    margin:0 5px 0 0;
}

.chatDetails .emoji,.message .emoji{
    width: 1.5rem;
    height: 1.5rem;
    transform:translateY(.1rem);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
.message .emoji{
    width :1.2rem;
    height 1.2rem;
}
.chatDetails .container li .sendPic{
    max-width: 10rem;
    min-height: 0;
    background-size: cover;
    background-repeat: no-repeat;
}

/*.app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    height 100%

    .app-view
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        -webkit-overflow-scrolling touch
        background white

        &::-webkit-scrollbar
            width 0
            background transparent

        &.transition-slide
            transition transform $page-transition-duration cubic-bezier(0, 0, 0.2, 1)

            &.slide-left-enter
                transform translate(100%, 0)

            &.slide-left-enter-active
                box-shadow 0 0 16px 2px rgba(0, 0, 0, 0.3)

            &.slide-right-enter
                transform translate(-30%, 0)
                transition-timing-function linear

            &.slide-right-leave-active
                transform translate(100%, 0)
                box-shadow 0 0 16px 2px rgba(0, 0, 0, 0.3)
                z-index 99

            &.slide-left-leave-active
                transform translate(-30%, 0)
                transition-timing-function linear

            &.app-view-scroll-enabled,
            &.slide-left-enter-active,
            &.slide-left-leave-active,
            &.slide-right-enter-active,
            &.slide-right-leave-active
                overflow-y auto

        &.transition-fade
            opacity 1
            transition opacity 1s ease

            &.fade-enter
                opacity 0

            &.fade-leave-active
                opacity 0*/
</style>
