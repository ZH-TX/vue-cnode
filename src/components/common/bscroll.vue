<template>
    <!-- ref 相当于id的标志符 -->
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

	export default {
		name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            data: {
                type: Array,
                default: () => {
                return []
                }
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: {}
            }
        },
        // 依旧是为了保证加载时的已经挂载完成;
        mounted() {
            setTimeout(this.__initScroll, 20)
        },
        methods: {
            __initScroll() {
                // 1.初始化BScroll对象
                if (!this.$refs.wrapper) return
                this.scroll = new BScroll(this.$refs.wrapper, {

                // 将属性设置为一个参数
                probeType: this.probeType,
                click: true, //控制div之类的东西需要设置为true;
                pullUpLoad: this.pullUpLoad,
                pullDownRefresh:{
                    threshold: 50,
                    stop: 20
                }
            })

            // 2.将监听事件回调
            this.scroll.on('scroll', pos => {
            this.$emit('scroll', pos)
            })
            // 3.上拉刷新
            this.scroll.on('pullingDown', () => {
                console.log('上拉加载');
                this.$emit('pullingDown')
                setTimeout(() => {
                    this.scroll.finishPullDown();
                }, 1500);
            })

            // 4.监听上拉到底部
            this.scroll.on('pullingUp', () => {
                console.log('上拉加载');
                this.$emit('pullingUp')
                setTimeout(() => {
                    this.scroll.finishPullUp();
                }, 1500);
            })
        },

        // 这里需要都为值时,才能进行,保证挂载成功;
        refresh() {
            this.scroll && this.scroll.refresh && this.scroll.refresh()
        },
        finishPullUp() {
                this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp()
        },
        scrollTo(x, y, time) {
                this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
        }
        },
        // 防止刷新过快,进行防抖;
        watch: {
            data() {
                setTimeout(this.refresh, 20)
            }
        }
	}
</script>

<style scoped>

</style>