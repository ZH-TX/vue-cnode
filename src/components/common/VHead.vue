<template>
	<header class="header">
		<div class="lf-icon">
			<slot  name="left">
				<div class="item"></div>
			</slot>
		</div>
		
		<h2 class="title">{{ title }}</h2>
		<div class="lf-icon">
			<slot name="right">
				<div class="item"></div>
			</slot>
		</div>
		
	</header>
</template>
<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>
<style lang="scss" scoped>

	.lf-icon{
		padding: 0 10px;
	}
	.header {
		position: fixed;
		right: 0;
		left: 0;
		z-index: 99;
		height: 49px;
		line-height: 49px;
		background: rgb(246, 246, 246);
		border-bottom: 1px solid #ddd;
		display: flex;
		justify-content: space-between;

		.item {
		
			// width: 50px;
		}

		.title {
			overflow: hidden;
			padding: 0;
			margin: 0;
			text-align: center;
			font-size: 16px;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>