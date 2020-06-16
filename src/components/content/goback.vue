<template>
    <div>
        <v-header :title="title">
			<div @click="goback" slot="left">
				<div class="icon">
					<i class="iconfont icon-back" style="color: #222;"></i>
				</div>

			</div>
		</v-header>
    </div>
</template>

<script>
    import VHeader from 'components/common/VHead.vue'

    export default {
        components:{
            VHeader,
        },
        props: {
			title: {
				type: String,
				default: ''
			}
		},
        data(){
            return{

            }
        },
        methods: {
            goback() {
               this.$router.go(-1) 
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>