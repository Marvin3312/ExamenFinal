import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import ChatView from '../views/ChatView.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/chat',
    name: 'Chat',
    component: ChatView,
    meta: { requiresAuth: true }, // Add meta field for protected routes
  },
  {
    path: '/',
    redirect: '/chat', // Redirect to chat by default
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('authToken');

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    // If the route requires auth and the user is not logged in, redirect to login
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isLoggedIn) {
    // If the user is logged in and tries to access the login page, redirect to chat
    next({ name: 'Chat' });
  } else {
    // Otherwise, allow navigation
    next();
  }
});

export default router;
