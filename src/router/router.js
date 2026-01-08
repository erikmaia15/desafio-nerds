import { createRouter, createWebHistory } from "vue-router";
import Cadastro from "../views/cadastro.vue";

const routes = [
  {
    path: "/",
    name: "Cadastro",
    component: Cadastro,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
