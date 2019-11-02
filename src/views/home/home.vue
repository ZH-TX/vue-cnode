<template>
    <div> 
        
        
        <div class="container">
            <!-- 头部 -->
            <headers @my-event='changebar' />

            <loading v-show="isLoadShow" />
           
            <!-- 主体部分 -->
            <Bscroll class="content"
                ref="scroll"
                @scroll="contentScroll"
                @pullingDown="refresh"
                @pullingUp="loadMore"
                :data="showData"
                :pull-up-load="true"
                :probe-type="3">
                <div class="scroll-content">
                    <div>
                    <!-- 进入刷新 -->
                    <div class="refresh-font" v-show="isRefresh">
                        加载中...
                    </div>
                    <!-- 主体内容 -->
                    <div v-for="topic in homeData" :key="topic.index">
                        <router-link tag="div" :to="'/detail/'+topic.id" class="topic-item" >
                            <!-- 判断类型 -->
                            <div class="topic-h"  data-id="topic.id">
                                
                                <span class="topic-type top" v-if="topic.top === true">置顶</span>
                                <span class="topic-type jh" v-if="topic.good === true">精华</span>
                                <span class="topic-type ask" v-if="topic.tab === 'ask'">问答</span>
                                <span class="topic-type share" v-if="topic.tab === 'share'">分享</span>
                                <span class="topic-type job" v-if="topic.tab === 'job'">招聘</span>
                                {{topic.title}}
                                <!-- <span class="topic-title" :tap="divDetail" data-id="{{topic.id}}">
                                {{topic.title}}
                                </span> -->
                            </div>
                            <div class="topic-more"  data-id="topic.id" >
                                <img class="author-face" :src="topic.author.avatar_url"/>
                                <div class="span">
                                    <span>{{topic.author.loginname}}</span>
                                    <div class="topic-re-vi fr">
                                        <span class="re">{{topic.reply_count}}</span>/{{topic.visit_count}}
                                        
                                    </div>
                                </div>
                                <div class="span">
                                    <span class="time">时间：{{topic.create_at}} ,</span>
                                    <span class="fr"> {{topic.last_reply_at}}</span>
                                </div>
                            </div>
                        </router-link>

                        <!-- <router-view></router-view> -->
                    </div>
                    <!-- 加载 -->
                    <div class="refresh-font">
                        <span v-show="isLoadMore">正在加载更多数据...</span>
                    </div>
                    
                    </div>
                </div>
            </Bscroll>
            <!-- 回到顶部 -->   
        </div>
        <transition name="fade">
            <backtop @backtop="backTop" v-show="showBackTop" />
        </transition>
        
        <footers></footers>
       
       <!-- <button @click="test">点击我有惊喜</button> -->
    </div>
</template>

<script>

    import headers from 'components/common/headers.vue';
    import loading from 'components/common/loading.vue';
    import backtop from 'components/common/backtop.vue';
    import Bscroll from 'components/common/bscroll.vue'
    import footers from 'components/common/footer.vue';
    import {getHomeData,getDetailData} from 'network/home.js'

    const util=require('assets/js/util.js')


    export default {
        name:'home',
        components:{headers,loading,backtop,Bscroll,footers},
        data(){ 
            return{
                page: 1,
                tab: 'all',
                homeData: [],
                showBackTop:false,
                isLoadShow:true,
                isRefresh:false,
                isLoadMore:false
            }
            

        },
        created () {
            // console.log("xuexi");
            
            this.getData()
            setTimeout(()=>{
                this.isLoadShow=false
            },1500)
            
        },
        mounted() {
            // console.log('hhh');
            
        },
        updated () {
            
        },
        computed: {
            showData() {
                return this.homeData
            }
        },
        methods: {

            refresh(){
                this.isRefresh=true
                this.getData()
            },
           
            getData(page){
                getHomeData({
                    page:page,
                    tab:this.tab
                },res=>{
                    // console.log(res);
                    this.homeData=this.isLoadMore?this.homeData.concat(res.data):res.data
                    // console.log(this.homeData)

                    // 处理数据,时间 
                    this.homeData.map( (topic) =>{
                        topic.create_at = util.formatTime(new Date(topic.create_at));
                        const last_reply_at = +new Date(topic.last_reply_at);
                        topic.last_reply_at = !last_reply_at ? topic.last_reply_at : util.getDateDiff(last_reply_at);
                    
                        // console.log(topic);
                        // this.topicId=topic.id
                        return topic;
                    })
                    // console.log(this.homeData)
                    this.isRefresh=false
                    this.isLoadMore=false
                   
                })
                
            },
            contentScroll(e) {
		        
                // 2.决定backTop是否显示
                // console.log(e);
                
                this.showBackTop = e.y < -500
            },
            // 只会执行一次???
            loadMore() {
                console.log('hhhh');
                
                this.isLoadMore=true
                this.page+=1
                console.log(this.page);
                this.getData(this.page)
            },
            // 回到顶部,在300毫秒之类;
            backTop() {
                this.$refs.scroll.scrollTo(0, 0, 300)
            },
            test(e){
                console.log(e);
            },


            changebar(e) {
                console.log(e);
                this.tab=e.tab
                this.getData()
                
            }
        },
    }
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 100px 0;
    // background: rgba(0, 0, 0.8);
    box-sizing: border-box;
} 
.content {
    /* 利用定位来达到内容全部塞满/也可以使用calc()计算属性来达到相同的效果 */
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
// .scroll-content {
//     position: absolute;
//     top: 36px;
//     bottom: 0;
//     width: 100%;
// }

.tab-nav-item {
    display: inline-block;
    width: 20%;
    color: #80bd01;
    text-align: center;
    line-height: 36px;
    font-size: 14px;
    position: relative;
}

.current::after {
    content: "";
    height: 5px;
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: -3px;
    background: #80bd01;
}
.refresh-font{
    text-align: center;
    background: rgb(235, 231, 231);
}

.is-refresh {
    padding-top: 10px;

}
.topic-item:nth-child(1){
    border-top: 1px solid rgb(201, 200, 200);
}

.topic-item {
    padding: 15px 10px;
    border-bottom: 1px solid #cccccc;
}

.topic-h {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 25px;
    padding-right: 10px;
    overflow: hidden;
    word-break: break-all;
    margin-bottom: 8px;
}

.topic-type {
    font-size: 15px;
    height: 10px;
    width: 20px;
    border-radius: 5px;
    color: white;
    padding: 2px 4px;
    margin-right: 4px;
}

.top {
    background: #e74c3c;
   
}

.jh {
    background: #e67e22;
}

.ask {
    background: gray;
}

.share {
    background: #00b4ff;
}

.job {
    background: #ff2ccf;
}

.topic-title {
    font-weight: bold;
    font-size: 28rpx;
    line-height: 40rpx;
}

.topic-more {
    padding-left: 50px;
    overflow: hidden;
}

.author-face {
    float: left;
    height: 40px;
    width: 40px;
    overflow: hidden;
    border-radius: 20px;
    margin-left: -50px;
}

.span {
    display: flex; 
    justify-content: space-between;
    padding: 10px 5px;
    line-height: 20px;
}
.time{
    width: 60%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.re {
    color: green;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
}

</style>