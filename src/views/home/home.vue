<template>
    <div> 
        
        <!-- index.wxml -->
        <div class="container">
            <!-- 头部 -->
            <headers @my-event='changebar' />

            <loading v-show="isLoadShow" />

            <!-- 主体部分 -->
            <div class="scroll-content">
                <div>
                <!-- 进入刷新 -->
                <div v-show="isRefresh">
                    <loading />
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
                <div class="">
                    <span v-if="isLoadMore">正在加载更多数据...</span>
                </div>
                
                </div>
            </div>
            <!-- 回到顶部 -->   
        </div>
        <backtop  />
       <!-- <button @click="test">点击我有惊喜</button> -->
    </div>
</template>

<script>

    import headers from 'components/common/headers';
    import loading from 'components/common/loading.vue';
    import backtop from 'components/common/backtop.vue';

    import {getHomeData,getDetailData} from 'network/home.js'

    const util=require('assets/js/util.js')


    export default {
        name:'home',
        components:{headers,loading,backtop},
        data(){ 
            return{
                page: 1,
                tab: 'all',
                homeData: [],
             
                isLoadShow:true,
                isRefresh:false,
                isLoadMore:false
            }
            

        },
        created () {
            this.getData()
            setTimeout(()=>{
                this.isLoadShow=false
            },1500)
            
        },
        methods: {
            getData(){
                getHomeData({
                    page:this.page,
                    tab:this.tab
                },res=>{
                    // console.log(res);
                    this.homeData=res.data
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
                    
                })
                
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
    box-sizing: border-box;
} 
.scroll-content {
    position: absolute;
    top: 36px;
    bottom: 0;
    width: 100%;
}

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


.is-refresh {
    padding-top: 10px;

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

</style>