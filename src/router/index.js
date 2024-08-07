import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Home from "@/pages/Home.vue";
import About from "@/pages/About.vue";
import Login from "@/pages/Login.vue";
import Swaps from "@/pages/Swaps.vue";
import ChatPage from "@/pages/ChatPage.vue";
import Notifications from "@/pages/Notifications.vue";
import ProfileCompletion from "@/pages/ProfileCompletion.vue";
import HouseDetail from "@/pages/HouseDetail.vue";
import store from "@/store";
import Profile from "@/pages/profile.vue";
import WizardForm from "@/components/WizardForm.vue";
import ChatListPage from "@/pages/ChatList.vue";
import MessageInterfacePage from "@/pages/MessageInterface.vue";
import ForgetPassword from "@/pages/ForgetPassword.vue";
import OtpVerification from "@/pages/OtpVerification.vue";
import ResetPassword from "@/pages/ResetPassword.vue";
import TriangleSwapDetails from "@/pages/TriangleSwapDetails.vue";
import LandingPage from "@/views/LandingPage.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
      },
      {
        path: "home",
        component: Home,
        meta: { requiresAuth: true },
      },
      {
        path: "wizardForm",
        component: WizardForm,
      },
      {
        path: "about",
        component: About,
      },
      {
        path: "login",
        component: Login,
        meta: { requiresGuest: true },
      },
      {
        path: "register",
        component: WizardForm,
        meta: { requiresGuest: true },
      },
      {
        path: "swaps",
        component: Swaps,
        meta: { requiresAuth: true },
      },
      {
        path: "chatPage",
        component: ChatPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/chatslist",
        name: "ChatListPage",
        component: ChatListPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/chats/:chatId",
        name: "MessageInterfacePage",
        component: MessageInterfacePage,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "profile",
        component: Profile,
        meta: { requiresAuth: true },
      },
      {
        path: "notifications",
        component: Notifications,
        meta: { requiresAuth: true },
      },
      {
        path: "profileCompletion",
        name: "ProfileCompletion",
        component: ProfileCompletion,
        meta: { requiresAuth: true },
      },
      {
        path: "/house/:id",
        component: HouseDetail,
        name: "HouseDetail",
        meta: { requiresAuth: true },
      },
      {
        path: "forget-password",
        component: ForgetPassword,
      },
      {
        path: "otp-verification",
        name: "OtpVerification",
        component: OtpVerification,
        props: true,
      },
      {
        path: "reset-password",
        name: "ResetPassword",
        component: ResetPassword,
        props: true,
      },
      {
        path: "/triangle-swap-details",
        name: "TriangleSwapDetails",
        component: TriangleSwapDetails,
        props: (route) => ({ triangle: route.query.triangle }),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.token;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (isAuthenticated) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
