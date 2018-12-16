import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TokenEx from '@/components/TokenEx.vue'
import Post from '@/components/Post.vue'
import Profile from '@/components/Profile.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/tokenEx',
      name: 'TokenEx',
      component: TokenEx
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
