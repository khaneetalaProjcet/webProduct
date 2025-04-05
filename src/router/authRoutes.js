import OTPView from '../views/auth/OTPView.vue';
import LoginView from '../views/auth/LoginView.vue';
import IdentityView from '../views/auth/IdentityView.vue';
import IdentityInfoView from '../views/auth/identityInfoView.vue'
import RuleView from '../views/dashboard/RuleView.vue'

export default [
    {
        path: '/Login',
        name: 'Login',
        component: LoginView,
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },
    {
        path: '/OTP',
        name: 'OTP',
        component: OTPView,
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },
    {
        path: '/Identity',
        name: 'Identity',
        component: IdentityView,
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },
    {
        path: '/IdentityInfo',
        name: 'IdentityInfo',
        component: IdentityInfoView,
        meta: { layout: "AuthenticationLayout", transition: 'fade' },
    },

    {
        path: '/Rule',
        name: 'Rule',
        component: RuleView,
        meta: { layout: "DefaultLayout", transition: 'fade' },
    },

]