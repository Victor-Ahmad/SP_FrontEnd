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
const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
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
      },
      {
        path: "register",
        component: WizardForm,
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
        path: "/chats",
        name: "ChatListPage",
        component: ChatListPage,
      },
      {
        path: "/chats/:chatId",
        name: "MessageInterfacePage",
        component: MessageInterfacePage,
        props: true,
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
        meta: { requiredsAuth: true },
      },
      {
        path: "/house/:id",
        component: HouseDetail,
        name: "HouseDetail",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.token) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
