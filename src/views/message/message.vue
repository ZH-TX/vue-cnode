<template>
	<div>
		<v-header title="消息"></v-header>

		<div class="msg-box" v-if="messages.list.length">
			<ul class="list">
				<li flex="box:first" v-for="(item, index) in messages.list" :key="index">
					<router-link class="user" :to="{ name: 'user-detail',params: { username: item.author.loginname } }">
						<div class="user-headimg" :style="{ backgroundImage: 'url(' + item.author.avatar_url +')' }">
						</div>
					</router-link>
					<div>
						<div class="name">{{ item.author.loginname }}
							<time>{{ item.create_at | formatDate }}</time>
						</div>
						<div v-if="item.type == 'at'">
							在话题
							<router-link :to="{ name: 'detail', params: { id: item.topic.id } }">
								{{ item.topic.title }}
							</router-link> 中 @了你
						</div>
						<div v-if="item.type == 'reply'">
							回复你了的话题
							<router-link :to="{ name: 'detail', params: { id: item.topic.id } }">
								{{ item.topic.title }}
							</router-link>
						</div>
						<div class="markdown-body" v-html="item.reply.content"></div>
					</div>
					<div class="weidu">
						<i class="iconfont icon-weidu"></i>
					</div>
				</li>
			</ul>
		</div>
		<div class="nomessage">暂时消息哦,快去发表吧</div>

		<footers></footers>
	</div>
</template>
<script>
	import VHeader from 'components/common/VHead'
	import footers from 'components/common/footer'

	export default {

		components: {
			VHeader,
			footers
		},
		data() {
			return {
				messages: {
					list: {}
				}

			}
		},
	}
</script>
<style lang="scss" scoped>
	.msg-box {
		.list {
			padding: 0;
			margin: 0;

			li {
				position: relative;
				padding: 10px;
				list-style: none;
				border-bottom: 1px solid #eee;
				background: #fff;

				.name {
					font-weight: bold;
					line-height: 28px;

					time {
						padding-left: 5px;
						font-size: 12px;
						font-weight: normal;
						color: #999;
					}
				}

				.content {
					padding: 5px 0;
				}

				.weidu {
					position: absolute;
					top: 0;
					right: 0;
					z-index: 1;
					width: auto;
					text-align: right;

					.iconfont {
						font-size: 60px;
						color: #222;
					}
				}
			}
		}
	}

	.nomessage {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.user-headimg {
		width: 38px;
		height: 38px;
		margin-right: 10px;
		border-radius: 50%;
		border: 1px solid #ddd;
		background-size: cover;
		background-color: #eee;
	}


	.markdown-body {
		padding: 5px;
		margin-top: 10px;
		border-radius: 5px;
		background: #eee;
	}
</style>