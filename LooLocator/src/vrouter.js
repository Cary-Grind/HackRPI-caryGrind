import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../src/components/login.vue';
import SignupPage from '../src/components/SignupForm.vue';
import ContactUs from '../src/components/ContactUs.vue';
import MainPage from '../src/components/MainPage.vue';
import FindToilets from '../src/components/FindToilets.vue';
import AboutUs from '../src/components/About.vue';

const routes = [
{ path: '/login', name: 'Login', component: LoginForm },
{ path: '/signup', name: 'Signup', component: SignupPage },
{ path: '/contact', name: 'Contact', component: ContactUs },
{ path: '/findtoilets', name: 'FindToilets', component: FindToilets },
{ path: '/mainpage', name : 'MainPage', component: MainPage },
{ path: '/about', name : 'About', component: AboutUs },
];

const router = createRouter({
history: createWebHistory(),
routes
});

export default router;