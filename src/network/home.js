import axios from './axios.js'


//感觉还是直接在页面中调用比较好


    function getHomeData (options,callback){
        return axios({
            url:'/topics',
            params:{
                page: options.page || 1,
                limit: options.limit || 10,
                tab: options.tab || 'all',
                mdrender: true  // true, 默认值渲染Markdown的格式；
            }
        }).then(callback)
    }


    function getDetailData(topicId,callback){
        return axios({
            url:'/topic/'+topicId,
            params:{
                mdrender:true,
                accesstoken: ''
            }
        }).then(callback)

    }
    // 用户信息
    function getUserData(loginname,callback){
        return axios({
            url:'/topic/'+loginname,
           
        }).then(callback)

    }
    
    // 主题收藏
    function getTopicDetailData(opt,callback){
        return axios({
            method:'post',
            url:'/topic_collect/collect',//de_collect
            params:{
                topic_id:opt.id||'',
                accesstoken:opt.accesstoken|| ''
            }
           
        }).then(callback)

    }







export{
    getHomeData,
    getDetailData
}