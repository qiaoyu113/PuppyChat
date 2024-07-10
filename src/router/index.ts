// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/Home.vue')  // 确保路径正确
  },
  {
    path: '/video',
    name: 'Video',
    // component: () => import('@/components/Video.vue')  // 确保路径正确
    component: () => import('@/components/VideoLayout.vue')  // 确保路径正确
  },
  {
    path: '/youtube',
    name: 'Youtube',
    // component: () => import('@/components/Video.vue')  // 确保路径正确
    component: () => import('@/components/Youtube.vue')  // 确保路径正确
  }
];

const router = createRouter({
  history: createWebHistory('/puppychat/'),
  routes
});

export default router;
