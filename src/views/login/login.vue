<template>
    <div>
        <goback title="登录"/>

        
        <div class="page-body">
           <div class="" v-if="!isLogin">
				<input  class="txt" placeholder="Access Token" v-model="val" />
				<button class="btn" @click="login">登录</button>
           </div>
		   <div class="" v-else>
			    <div class="header-bg">
					<img class="avatar" :src="self.avatar_url" mode=""/>
					<div class="username">
						用户名:{{self.loginname}}
					</div>
					<div class="user-info">
						<div class="">
							注册时间:{{self.create_at|fliter}}
						</div>
						<div class="">
							用户积分:{{self.score}}
						</div>
					</div>
			    </div>
			    
				
				<div class="detail-info">
					<div :class="{active:currentIndex==0}" @click="handleTap(0)">主题:{{ self.recent_topics.length }}</div>
					<div :class="{active:currentIndex==1}" @click="handleTap(1)">回复:{{ self.recent_replies.length }}</div>
					
				</div>
				
				<div class="detail-item" v-for="item in recent" :key="item.id" @click="navDetail(item.id)">
					<div class="item-content">
						{{item.title}}
					</div>
					<div class="" style="color: #ccc">
						{{item.last_reply_at| fliter}}
					</div>
					
				</div>

				<button class="btn" type="primary" @click="logout">退出登录</button>
				
		   </div>
			
        </div>



    </div>
</template>

<script>
	// import {getDateDiff} from '../../../static/assets/js/util.js'
    import goback from 'components/content/goback.vue'
    import {getDateDiff}from 'assets/js/util.js'

    export default {
        
        components: {
           goback
        },
		async created() {
			await this.getDetail()
			this.recent=this.self.recent_topics
			console.log(this.recent);
			this.isLogin=JSON.parse(localStorage.getItem('user')).success
			// this.getDetail()
		},
		filters:{
			fliter(e){
				// console.log(e);
				return getDateDiff(new Date(e))	
			}
		},
        data() {
            return {
				isLogin:false,
				self: {},
				recent:[],
				currentIndex:0,
				val:'',//ac836285-e3d9-47a1-98a4-9a544736dfee
            }
        },
        methods: {
            login(){
				// uni.setStorageSync('token',this.val)
				this.$axios.post('https://cnodejs.org/api/v1/accesstoken',{},{params:{
						accesstoken:this.val
					}
				}).then(res => {
					console.log(res);
					let data=res.data
					
					if(data.success){
						data.accesstoken=this.val
						localStorage.setItem('user',JSON.stringify(data))
						this.isLogin=true //如果需要将下次登录还是存在,需要将状态保存
						// this.$forceUpdate()	
						this.$nextTick(()=>{
							this.getDetail()
						})

						// uni.showToast({
						// 	title: '登录成功'
						// });
					}else{
						// uni.showToast({
						// 	title: data.error_msg,
						// 	icon:'none'
						// });
					}
				}).catch(err=>{
					console.log(err);
					// uni.showToast({
					// 	title: err.data.error_msg,
					// 	icon:'none'
					// });
				})
			},
        
			logout(){
				this.isLogin=false// 这样才会视图更新
				// uni.showToast({
				// 	title: '退出成功'
				// });
				localStorage.removeItem('user')
				
			},
			handleTap(e){
				this.currentIndex=e
				this.recent=!e?this.self.recent_topics:this.self.recent_replies
			},
			navDetail(e){
				this.$router.push({
					 path:`/detail/${e}`	
				});
			},
		
			async getDetail(){
                console.log(localStorage.getItem('user'));
                
				let name=JSON.parse(localStorage.getItem('user')).loginname
				await this.$axios.get(`https://cnodejs.org/api/v1/user/${name}`).then(res=>{
					console.log(res);
					
					let data=res.data
					if(data.success){
						this.self=data.data
					}
					
				}).catch(err=>{
					console.log(err);
				})
				
			}
		},
    }
</script>

<style >
    .page-body {
    	padding: 50px 0;
    	min-height: 400px;
    	background-color: #fff;
    }
    
    .page-body .txt {
    	padding: 12px ;
    	border: none;
    	border-bottom: 1px solid #4fc08d;
    	background-color: transparent;
    	width: 100%;
    	font-size: 14px;
    	color: #313131;
    }
    
    .btn {
    	display: inline-block;
    	width: 99%;
    	height: 42px;
    	line-height: 42px;
    	border-radius: 3px;
    	margin-top: 50px;
    	color: #fff;
    	font-size: 16px;
    	background-color: #87c701;
    	border: none;
    	border-bottom: 2px solid #87c701;
    	text-align: center;
    	vertical-align: middle;
    }
    .header-bg {
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	flex-flow: column;
    	background: #87c701;
    	color: #fff;
    }
    .username {
    	padding: 20rpx;
    }
    .user-info {
    	display: flex;
    	justify-content: space-between;
    	align-items: center;
    }
    .user-info div {
    	padding: 20rpx;
    }
    
    .detail-info {
    	display: flex;
    	justify-content: center;
    	align-items: center;
    
    	background: #eee;
    }
    .detail-info div {
    	height: 50px;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	flex: 1;
    	
    }
    .detail-item{
    	padding: 10px;
    	
    	border-bottom: 1px solid #eee;
    }
    	
    .item-content{
    	overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
    }
    .active{
    	border-bottom: 1px solid #87c701;
    	color: #87C701;
    }
    .avatar {
    	margin: 10px;
    	width: 100px;
    	height: 100px;
    	border-radius: 50%;
    	background: rgba(0, 0, 0, 0);
    }
</style>