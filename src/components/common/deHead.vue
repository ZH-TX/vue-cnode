<template>
    <div>
        <div class="page">
            <div>
                <img src="" alt="">
            </div>
            <div>
                详情页
            </div>
            <div >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isShow: false,
                tabName:'全部'
            }
        },
        methods: {
            tabTo(e) {
            // let that = this;
            // console.log(this);
            // console.log(e.target.dataset);
            // console.log(e.currentTarget.dataset.tab);

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
    padding: 0 40px;
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
    margin-top: 44px ;
    width: 70%;
    border-top: 1px solid #d4d4d4;
    background: rgba(46, 44, 44, 0.8);
    color: #dbdada;
    transition: all .3s ease;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    // justify-content: center;
   

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




</style>