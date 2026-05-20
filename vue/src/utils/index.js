import { createRouter, createWebHashHistory } from "vue-router";
import Beranda from "../pages/Beranda.vue";
import Film from "../pages/Film.vue";
import Sutradara from "../pages/Sutradara.vue";
import Aktor from "../pages/Aktor.vue";
import FilmDetail from "../pages/FilmDetail.vue";
import SutradaraDetail from "../pages/SutradaraDetail.vue";
import AktorDetail from "../pages/AktorDetail.vue";

const routes = [
    {
        path : "/",
        component : Beranda,
        name : "Beranda"
    },
    {
        path : "/film",
        component : Film,
        name : "Film"
    },
    {
        path: "/sutradara",
        component : Sutradara,
        name: "Sutradara"
    },
    {
        path: "/aktor",
        component : Aktor,
        name: "Aktor"
    },
    {
        path: "/film/detail",
        component : FilmDetail,
        name: "FilmDetail"
    },
    {
        path: "/sutradara/detail",
        component : SutradaraDetail,
        name: "SutradaraDetail"
    },
    {
        path: "/aktor/detail",
        component : AktorDetail,
        name: "AktorDetail"
    }
]

const route = createRouter({
    history: createWebHashHistory(),
    routes
})

export default route