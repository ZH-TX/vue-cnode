import axios from './axios.js'



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






export{
    getHomeData,
    getDetailData
}