<template>
	<div>
		<!-- <headers/> -->
		<goback title="详情页"/>
		<div class="container">

			<div class="title">
				<span>{{article.title}}</span>
			</div>
			<div class="info">
				<img class="author-face" v-lazy="article.author.avatar_url" />

				<div class="text">
					<span style="color:#4078c0" @click="handleDetail(article.author.loginname)">作者：{{article.author.loginname}}</span>
					<span>发布于：{{article.create_at}}</span>
					<span>浏览次数：{{article.visit_count}}</span>
					<span>最后一次编辑：{{article.last_reply_at}}</span>
					<!-- <span class="article.tab">来自：{{article.tabspan}}</span> -->
				</div>
				<div class="mark" v-if="article.mark">{{article.mark}}</div>
			</div>
			<div class="content">
				<div class="markdown-body" v-html="article.content">{{article.content}}</div>

			</div>
			<div class="reply" v-if="article.replies.length > 0">
				<div v-for="reply in article.replies" :key="reply.index">
					<div class="reply-item">

						<div class="reply-first">
							<img class="reply-author-face" :src="reply.author.avatar_url" />
							<div class="reply-info">
								<div class="reply-name" @click="handleDetail(reply.author.loginname)">{{reply.author.loginname}}</div>
								<div class="reply-time">{{reply.create_at}}</div>
							</div>
						</div>
						<div class="reply-two ">
							<span class="reply-content markdown-body" v-html="reply.content">{{reply.content}}</span>
						</div>
					</div>
				</div>
			</div>
			<loading v-if="isLoadShow" />
			<transition name="fade">
				<backtop @click.native="backTop" v-show="isShow" />
			</transition>

		</div>

	</div>
</template>

<script>
	import headers from 'components/common/headers'
	import VHeader from 'components/common/VHead'
	import loading from 'components/common/loading.vue';
	import backtop from 'components/common/backtop.vue';
	import goback from  'components/content/goback.vue'
	import {
		getHomeData,
		getDetailData
	} from 'network/home.js'

	const util = require('assets/js/util.js')


	export default {
		name: 'detail',
		components: {
			VHeader,
			loading,
			goback,
			backtop
		},
		data() {
			return {
				isShow: false,
				isLoadShow: true,
				scrollTop: 0,
				article: {
					author: {}, //不加这个初始时会报错
					replies: []
				},


			}
		},
		mounted() {
			window.addEventListener('scroll', this.getScroll);
			this.getData();
			setTimeout(() => {
				this.isLoadShow = false
			}, 1500)
		},
		destroyed() {
			window.removeEventListener('scroll', this.getScroll);
		},
		methods: {
			handleDetail(e){
				// console.log(e,this.$route);
				
				this.$router.push({path:'/namedetail',query:{id:e}})
			},

			getData() {
				let topicId = this.$route.params.id
				getDetailData(topicId, res => {
					this.article = res.data
					// console.log(this)

					this.article.create_at = util.formatTime(new Date(this.article.create_at));
					const last_reply_at = new Date(this.article.last_reply_at);
					this.article.last_reply_at = !last_reply_at ? this.article.last_reply_at : util.getDateDiff(
						last_reply_at);

					this.article.replies.map((topic) => {
						topic.create_at = util.getDateDiff(new Date(topic.create_at));
						// const last_reply_at = +new Date(topic.last_reply_at);
						// topic.last_reply_at = !last_reply_at ? topic.last_reply_at : util.getDateDiff(last_reply_at);
					})

					return this.article


				})

			},
			getScroll() {
				this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				// console.log(document.documentElement.scrollTop);

				this.isShow = this.scrollTop > 500

			},

			backTop(e) {
				// console.log(e,this);
				let timer
				timer = setInterval(function () {
					let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
					let ispeed = Math.floor(-scrollTop / 5);
					document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed;

					if (scrollTop == 0) {
						clearInterval(timer)

					}
				}, 30)

				// document.body.scrollTop = 0
				// document.documentElement.scrollTop = 0

			}
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 40px 10px;
	}

	.title {
		padding-top: 10px;
		font-size: 20px;
		font-weight: bold;
	}

	.info {
		display: flex;
		border-bottom: 1px solid #cccccc;
		padding: 10px;

	}

	.reply-first {
		display: flex;
		padding: 10px 5px;

	}

	/* .reply-first image{
  padding: 0 20px;
  border-radius: 20px;
} */
	.reply-two {
		height: auto;

	}

	.reply-info {
		flex: 1;
	}

	.author-face {

		height: 70px;
		width: 70px;
		border-radius: 35px;

	}

	.text span {
		display: block;
		padding-left: 15px;
		padding-top: 6px;
		font-size: 14px;
	}

	.mark {
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

	.content {
		/* padding: 20rpx 0; */
		/* overflow: auto; */
		/* word-break: break-all; */
		/* overflow: hidden; */
		border-bottom: 1px solid #cccccc;
	}

	.ask {
		color: gray;
	}

	.share {
		color: #00b4ff;
	}

	.job {
		color: #ff2ccf;
	}

	.reply {
		padding: 10px 0;
	}

	.reply-item {
		/* padding: 20rpx 0 20rpx 80rpx; */
		border-bottom: 1px dotted #cccccc;
		width: 100%;
		margin: 10px 0;
		padding: 0 10px;
		display: flex;
		flex-direction: column;
	}

	.reply-author-face {
		display: inline-block;
		width: 45px;
		height: 45px;
		margin-right: 10px;
		border-radius: 10px;
	}

	.reply-name {
		color: #00b4ff;
		/* display: inline-block;
  width: 68%; */
	}

	.reply-time {
		color: #acafb1
	}

	.reply-content {
		/* border: 0; */
		font-size: 100%;
		/* vertical-align: baseline; */
		margin: 0;
		padding: 5px;

	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 2s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
</style>