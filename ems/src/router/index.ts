import DashboardView from '@/views/DashboardView.vue'
import AppraisalFormView from '@/views/AppraisalFormView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
    },
    {
      path: '/calendars',
      name: 'Calendars',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/CalendarsView.vue'),
    },
    {
      path: '/appraisals',
      name: 'Appraisals',
      component: () => import('@/views/AppraisalsView.vue'),
      children: [
        {
          path: 'form',
          component: AppraisalFormView,
        },
      ],
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import('@/views/ReportsView.vue'),
    },
    {
      path: '/discuss',
      name: 'Discuss',
      component: () => import('@/views/DiscussView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
    },
  ],
})

export default router
