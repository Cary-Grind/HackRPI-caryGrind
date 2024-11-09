import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../src/components/login.vue';
import SignupPage from '../src/components/SignupForm.vue';

const routes = [
{ path: '/login', name: 'Login', component: LoginPage },
{ path: '/signup', name: 'Signup', component: SignupPage }
];

const router = createRouter({
history: createWebHistory(),
routes
});

export default router;