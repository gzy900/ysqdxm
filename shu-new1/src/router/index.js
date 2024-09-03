import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory('daping'),
    routes: [
        {
            path: "/loading",
            name: "loading",
            component: () => import('../views/loading.vue')
        },
        {
            path: "/list",
            name: "list",
            component: () => import('../views/list.vue')
        },
        {
            path: "/textLysis",
            name: "textLysis",
            component: () => import('../views/textLysis.vue')
        },
        {
            path: "/liusha",
            name: "liusha",
            component: () => import('../views/liusha.vue')
        },
        {
            path: "/lyric",
            name: "lyric",
            component: () => import('../views/lyric.vue')
        },
        {
            path: "/big",
            name: "big",
            component: () => import('../views/big.vue')
        },
        {
            path: "/doc",
            name: "doc",
            component: () => import('../views/doc.vue')
        },
        {
            path: "/doc1",
            name: "doc1",
            component: () => import('../views/doc1.vue')
        },
        {
            path: "/doc2",
            name: "doc2",
            component: () => import('../views/doc2.vue')
        },
        {
            path: "/tup",
            name: "tup",
            component: () => import('../views/tup.vue')
        },
    ]
});

export default router;
