import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../src/components/login.vue';
import SignupPage from '../src/components/SignupForm.vue';
import ContactUs from '../src/components/ContactUs.vue';
import MainPage from '../src/components/MainPage.vue';
import AboutUs from '../src/components/About.vue';
import ToiletReview from './components/ToiletReview.vue';

const routes = [
{ path: '/login', name: 'Login', component: LoginForm },
{ path: '/signup', name: 'Signup', component: SignupPage },
{ path: '/contact', name: 'Contact', component: ContactUs },
{ path: '/mainpage', name : 'MainPage', component: MainPage },
{ path: '/about', name : 'About', component: AboutUs },
{ path: '/newreview', name : 'ToiletReview', component: ToiletReview },
{ path: '/seereview', name : 'ToiletReview', component: ToiletReview },
];

const router = createRouter({
history: createWebHistory(),
routes
});

export default router;