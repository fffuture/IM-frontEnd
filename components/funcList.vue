<template>
  <div class="funcList">
    <ul v-for="(items,index) in selects" :key="index">
      <router-link v-for=" (item,indexs) in items " :key="indexs" tag="li" :to="item.target">
        <div>
          <img v-if=" item.img != '' && !!item.img " :src="item.img" alt />
          <svg v-else-if=" item.svg != '' && !!item.svg ">
            <use :xlink:href="item.svg" />
          </svg>
          <!--<svg style="width:2rem;height:2rem;" @click="exit">
                            <use xlink:href="#exit" />
          </svg>-->

          <span>{{ item.title }}</span>
          <span class="mark" v-show="item.isNew">New</span>
        </div>
        <div v-if="!item.redPoint"></div>
        <div v-else class="red-point">
          <span class="color-gray">首发抢2888红包</span>
          <!-- <img src="../static/img/icons/touxiang.jpeg" alt=""> http://47.103.151.107:8080/images/otherImg.jpg -->
          <img src="http://47.103.151.107:8081/images/otherImg.jpg" alt />
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["systemSelects"],
  data() {
    return {
      selects: this.systemSelects
    };
  },
  created: function() {},
  mounted: function() {
    // let that = this;
    //console.log(that.selects);
    //    console.log("不存在的对象",!!this.selects[0].a );
  }
};
</script>
<style scoped>
ul {
  box-sizing: border-box;
  padding: 0 0.75rem;
  margin: 1rem 0 0 0;
  display: block;
  width: 100%;
  list-style: none;
  background: white;
}
ul li {
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  height: 3rem;
}
ul li:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.036rem;
  background-color: rgb(190, 190, 190);
  transform: scaleY(0.5);
  z-index: 1;
}
ul li:last-child:after {
  display: none;
}
ul li div {
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  align-items: center;
  width: 50%;
  height: 100%;
}
ul li div:last-child {
  justify-content: flex-end;
  flex-shrink: 1;
  font-size: 0.75rem;
}
ul img,
ul svg {
  display: inline-block;
  flex-shrink: 0;
  padding: 0;
  margin: auto 0.75rem auto 0.25rem;
  width: 2.2rem;
  height: 1.75rem;
  border: 0;
}
ul img:last-child {
  margin: auto 0 auto 0.5rem;
  width: 2rem;
  height: 2rem;
}
.red-point {
  position: relative;
}
.red-point:after {
  position: absolute;
  right: -0.2rem;
  top: 0.35rem;
  display: block;
  content: "";
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50% 50%;
  background: red;
  z-index: 999;
}
ul div .mark {
  padding: 0 0.5rem;
  margin-left: 0.3rem;
  display: block;
  height: 1.1rem;
  line-height: 1.15rem;
  background: rgb(255, 62, 62);
  color: white;
  border: 0;
  border-radius: 1.5rem;
  font-weight: 800;
  font-size: 0.6rem;
}
</style>

