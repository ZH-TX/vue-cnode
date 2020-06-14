<template>
    <footer class="footer">

        <ul class="flex">
            <li :class="{ active: item.name == $route.name }" v-for="item in list" :key="item.index">
                <router-link :to="{ name: item.name }">
                    <i class="iconfont" :class="[ item.icon ]"></i>
                    <em>{{ item.title }}</em>
                    <div class="count" v-if="item.name == 'self-messages' ">{{ 1 }}</div>
                </router-link>
            </li>
        </ul>
    </footer>

</template>


<script>


    export default {
     
        data() {
            return {
                list: [{
                        title: '首页',
                        name: 'home',
                        icon: 'icon-index'
                    },
                    {
                        title: '发表',
                        name: 'create',
                        icon: 'icon-edit'
                    },
                    {
                        title: '消息',
                        name: 'message',

                        icon: 'icon-msg'
                    },
                    {
                        title: '我的',
                        name: 'myself',
                        icon: 'icon-user'
                    }
                ]
            }
        }
    }
</script>
<style scoped>
    /* @import "assets/font/iconfont.css"; */

    .footer {
        position: fixed;
        background: #fff;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 50;
        height: 49px;
        text-align: center;
        border-top: 1px solid #ddd;

    }

    .footer ul {
        padding: 5px 0;
        margin: 0;
    }

    .flex {
        display: flex;

    }
    ul li{
        flex-grow: 1;
    }
    ul li a {
        position: relative;
        display: block;
        text-decoration: none;
        color: #222;
    }

    i {
        display: block;
        line-height: 24px;
    }

    em {
        line-height: 16px;
        font-size: 13px;
        font-style: normal;
    }

    .count {
        position: absolute;
        top: 0;
        left: 50%;
        z-index: 2;
        padding: 1px 4px;
        line-height: 12px;
        border-radius: 50%;
        text-align: center;
        font-size: 12px;
        opacity: 0.9;
        color: #fff;
        background: red;
    }


    .active i {
        color: #80bd01;
    }

    .active em {
        color: #80bd01;
    }
</style>