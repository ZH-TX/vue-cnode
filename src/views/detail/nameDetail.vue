<template>
	<div>
		<goback title="用户主页"/>
		<div class="main">
			<div class="header-bg">
				<img class="avatar" :src="self.avatar_url" />
				<div class="username">用户名:{{ self.loginname }}</div>
				<div class="user-info">
					<div class="">注册时间:{{ self.create_at | fliter }}</div>
					<div class="">用户积分:{{ self.score }}</div>
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
		</div>
	</div>
</template>

<script>
// import {getDateDiff} from '../../../static/assets/js/util.js'
import goback from 'components/content/goback.vue'


export default {
	components: {goback},
	
	async created() {
	
		console.log(this.$route.query.id);
		this.name=this.$route.query.id
		await this.getDetail()
		this.recent=this.self.recent_topics
		console.log(this.recent);
	},
	filters: {
		fliter(e) {
			// console.log(e);
			// return getDateDiff(new Date(e));
		}
	},
	data() {
		return {
			isLogin: false,
			currentIndex:0,
			name:'',
			self: '',
			recent:[]
			
		};
	},
	methods: {
		
		async getDetail() {
			
			
			await this.$axios
			
				.get(`https://cnodejs.org/api/v1/user/${this.name}`)
				.then(res => {
					console.log(res);
					let data = res.data;
					this.self = data.data;
				})
				.catch(err => {
					console.log(err);
				});

		},
		handleTap(e){
			this.currentIndex=e
			this.recent=!e?this.self.recent_topics:this.self.recent_replies
		},
		navDetail(e){
			this.$router.push({
				path: `/detail/${e}`,
			});
		}
	}
};
</script>

<style scoped>
.main{
	/* margin-top: 44px; */
}
.page-body {
	/* padding: 50px 15px; */
	min-height: 400px;
	background-color: #fff;
}

.page-body .txt {
	/* padding: 12px ; */
	/* border: none; */
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
	padding-top: 44px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column;
	background: #87c701;
	color: #fff;
}
.username {
	padding: 10px;
}
.user-info {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.user-info div {
	padding: 10px;
}

.detail-info {
	display: flex;
	justify-content: center;
	align-items: center;
	position: sticky;
	top: 44px;
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
