<template>
    <div>
        <div class="to-top" @click="backtop" >回到顶部</div>
        
    </div>
</template>

<script>
    export default {
        // props:{
        //     backtop:{
        //         type:Function,
        //         required:true
        //     }
        // },
        methods: {
            backtop() {
                this.$emit('backtop')
            }
        },
    }
</script>

<style lang="scss" scoped>

.to-top {
    position: fixed;
    bottom: 15%;
    right: 0;
    width: 25px;
    color: #fff;
    padding: 5px;
    text-align: center;
    z-index: 20;
    font-size: 12px;
    border-radius: 20px 0 0 20px;
    background-color: #42b983;
    border: 1px solid #ccc;
    border-right: 0;

}


</style>