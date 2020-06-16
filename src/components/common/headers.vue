<template>
    <div>
        <div class="page" @touchmove.prevent @onScoll.prevent>
            <div class="tab-nav" v-show="isShow">
                <div class="tab-content">
                    <!-- <div class="back" @click="goback"> 返回>>>></div> -->
                    <router-link class="login" tag="div" to="/login">登录</router-link>
                    
                    <div class="tab-nav-item"
                        :class="currentIndex === index ? 'active' : ''"  
                        v-for="(item,index) in list" 
                        :key="item.tab"
                        :data-index="index"
                        :data-tab="item.tab"  
                        :data-name="item.name" 
                        @click="tabTo">
                        {{item.name}}
                    </div>
                </div>
            </div>
            <div @click="changeBar">菜单</div>
            <div>
                {{tabName}}
                
            </div>
            <div >
                <router-link tag="div" to="/login">登录</router-link>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isShow: false,
                tabName:'全部',
                currentIndex: 0,
                list:[
                    {name:'全部',tab:'all'},
                    {name:'精华',tab:'good'},
                    {name:'分享',tab:'share'},
                    {name:'问答',tab:'ask'},
                    {name:'招聘',tab:'job'}
                ]
            }
        },
        methods: {
            tabTo(e) {
            // let that = this;
            // console.log(this);
            // console.log(e.target.dataset);
            // console.log(e.currentTarget.dataset.index);
            this.currentIndex = +e.currentTarget.dataset.index;
            let tab = e.currentTarget.dataset.tab
            let name=e.currentTarget.dataset.name
            this.isShow= !this.isShow,
            this.tabName= name
            this.$emit('my-event', {tab})
        

        },
        goback(){
            this.$router.go(-1)
            setTimeout(()=>{
                this.$router.go(0)
            },500)
            
        },

        // 取反；
        changeBar(e){
            // console.log(this);
            this.isShow=!this.isShow
        }


        },
    }
</script>

<style lang="scss" scoped>

.page{
    display: flex;
    border-bottom: 2px solid rgb(214, 210, 210); 
    box-shadow: 0 0 4px rgba(0,0,0,0.25);
    align-items: center;
    justify-content: space-between;
    background:#fff;
    z-index: 9;


    /* 定位 */

    height: 44px;
    position: fixed;
    top: 0;
    left:0;
    right: 0;
    padding: 0 20px;
    overflow: hidden;
}
.back{
    position: absolute;
    top: 0;
    left: 0;
}


.login{
    height: 100px;
    padding: 50px;
    border-bottom: 1px solid rgb(255, 255, 255);
}
.tab-nav{
    position: fixed; 
    top: 0;
    left: 0;
	bottom: 0;
	background: rgb(117, 103, 103);
	margin-top: 44px;
	width: 100%;
	border-top: 1px solid #d4d4d4;
	background: rgba(46, 44, 44, 0.8);
	color: #dbdada;
	transition: all 0.3s ease;
}
.tab-content {
	width: 70%;
	height: 100%;
	color: #000000;
	background: #7a7e83;
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	/* justify-content: center; */
}
.tab-nav-item{
    font-size: 14px;
    font-weight: 200;
    padding: 9% 0;
    text-align: left;
    text-indent: 1px;
    line-height: 15px;
    font-weight: 700;

}

.active {
	color: #80bd01;
}


</style>