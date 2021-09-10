import Vue from "vue";
import VueRouter from "vue-router";
import Boards from "@/views/Boards";
import Lists from "@/views/Lists";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Boards",
    component: Boards,
  },
  { 
    path: '/board/:id', 
    name: "Lists",
    component: Lists,
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ "../views/About.vue");
  //   },
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
