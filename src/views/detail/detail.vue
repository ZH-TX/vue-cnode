<template>
    <div>
       
        <div class="container" >
             <headers/>
            <div class="title">
                <span>{{article.title}}</span>
            </div>
            <div class="info">
                <img class="author-face"  :src="article.author.avatar_url"/>
                
                <div class="text">
                    <span>作者：{{article.author.loginname}}</span>
                    <span>发布于：{{article.create_at}}</span>
                    <span>浏览次数：{{article.visit_count}}</span>
                    <span>最后一次编辑：{{article.last_reply_at}}</span>
                    <span class="article.tab">来自：{{article.tabspan}}</span>
                </div>
                <div class="mark" v-if="article.mark">{{article.mark}}</div>
            </div>
            <div class="content">
                <div class="markdown-body" v-html="article.content">{{article.content}}</div>
                <!-- <template is="entry" data="{{...article.content}}"/>  -->
            </div>
            <div class="reply" v-if="article.replies.length > 0">
                <div  v-for="reply in article.replies" :key="reply.index" >
                    <div class="reply-item">

                        <div class="reply-first">
                            <img class="reply-author-face"  :src="reply.author.avatar_url" />
                            <div class="reply-info">
                                <span class="reply-name">{{reply.author.loginname}}</span>
                                <span class="reply-time">{{reply.create_at}}</span>
                            </div>
                        </div>
                        <div class="reply-two">
                            <span class="reply-content markdown-body" v-html="reply.content">{{reply.content}}</span>
                        </div>                    
                    </div>
                </div>
            </div>
            <loading />
            <backtop  />
        </div>
        
    </div>
</template>

<script>
    import headers from 'components/common/headers'
    import loading from 'components/common/loading.vue';
    import backtop from 'components/common/backtop.vue';

    import {getHomeData,getDetailData} from 'network/home.js'

    const util=require('assets/js/util.js')


    export default {
        name:'detail',
        components: {headers,loading,backtop},
        data() {
            return {
                article: [],
            }
        },
        created () {
            this.getData();
        },
        methods: {
            getData() {
                let topicId=this.$route.params.id
                getDetailData(topicId,res=>{
                    this.article=res.data
                    console.log(this.article)
                    this.article.map( topic =>{
                        topic.create_at = util.formatTime(new Date(topic.create_at));
                        const last_reply_at = +new Date(topic.last_reply_at);
                        topic.last_reply_at = !last_reply_at ? topic.last_reply_at : util.getDateDiff(last_reply_at);
                        return topic
                    })
                
                })
                
            }
        },
    }
</script>

<style lang="scss" scoped>


.container{
  padding: 40px 10px;
}
.title{
  padding-top: 10px;
  font-size: 20px;
  font-weight: bold;
}
.info{
  padding: 15px 0 10px 100px;
  /* width: 100%; */
  border-bottom: 1px solid #cccccc;
  overflow: hidden;
  position: relative;
}
.reply-first{
  display: flex;
  padding: 10px 5px;

}
/* .reply-first image{
  padding: 0 20px;
  border-radius: 20px;
} */
.reply-two{
  padding: 10px 5px;

}
.reply-info{
    flex: 1;
}
.author-face{
  float: left;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  margin-left: -50px;
}
.text text{
  display: block;
  padding-top: 6px;
  font-size: 14px;
}
.mark{
  padding: 2px 5px;
  position: absolute;
  border: 1px dotted darkred;
  color: darkred;
  font-weight: bold;
  /* font-size: 80rpx; */
  top: 25px;
  right: 15px;
  transform: rotate(45deg);
}
.content{
  /* padding: 20rpx 0; */
  /* overflow: auto; */
  /* word-break: break-all; */
  /* overflow: hidden; */
  border-bottom: 1px solid #cccccc;
}
.ask{
  color: gray;
}
.share{
  color: #00b4ff;
}
.job{
  color: #ff2ccf;
}
.reply{
  padding: 10px 0;
}
.reply-item{
  /* padding: 20rpx 0 20rpx 80rpx; */
  border-bottom: 1px dotted #cccccc;
  width: 100%;
  margin: 10px 0;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
}
.reply-author-face{
  display: inline-block;
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 10px;
}
.reply-name{
  color: #00b4ff;
  /* display: inline-block;
  width: 68%; */
}
/* .reply-name::after{
  content: "";
  height: 4px;
  width: 4px;
  display: inline-block;
  border-radius: 2px;
  background: #00b4ff;
  margin: 0 6px 0 4px;
  position: relative;
  top: -2px;
} */
.reply-content{
  /* border: 0; */
  font-size: 100%;
  /* vertical-align: baseline; */
  margin: 0;
  padding: 5px 10px;

}

</style>