<template>
	<div>
		<v-header title="发表"></v-header>

		<form flex="dir:top" @submit.prevent="form.create()">
			<div class="title">
				<input type="text" placeholder="标题...">
			</div>
			<div class="select">
				<select>
					<option value="">请选择</option>
					<option value="share">分享</option>
					<option value="ask">问答</option>
					<option value="job">招聘</option>
					<option value="dev">开发</option>
				</select>
			</div>
			<div class="con" flex="dir:top" flex-box="1">
				<textarea flex-box="1" placeholder="内容..."></textarea>
			</div>
		</form>
		<footers></footers>

	</div>
</template>
<script>
	import VHeader from 'components/common/VHead'
	import footers from 'components/common/footer.vue';

	export default {
		components: {
			VHeader,
			footers,
		},
		data() {
			return {

			}
		},

	}
</script>

<style lang="scss" scoped>
	form {
		height: 100%;
	}


	.title {
		padding: 10px 10px;
		padding-top: 50px;
	}


	.select {
		padding: 5px 10px;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;

		select {
			padding: 0;
			border-radius: 5px;
			background: none;
		}
	}


	.con {
		padding: 5px 10px;

		textarea {
			line-height: 24px;
		}
	}


	input,
	select,
	textarea {
		box-sizing: border-box;
		width: 100%;
		height: 32px;
		padding: 0 5px;
		line-height: 28px;
		border: none;
		font-size: 14px;
		resize: none;
	}
</style>