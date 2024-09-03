import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory('clothesh5'),
    routes: [
        {
            path: "/report/:type/:id/:simple/:share?/",
            name: "report",
            component: () => import('../views/report/report.vue')
        },
        {
            path: "/week/:uuid/:startTime/:endTime?/:share?",
            name: "week",
            component: () => import("../views/report/week.vue")
        },
        {
            path: "/doctor/:id/:share?",
            name: "doctor",
            component: () => import("../views/report/doctor.vue")
        },
        {
            path: "/agree/user",
            name: "agree-user",
            component: () => import("../views/agree/user.vue")
        },
        {
            path: "/agree/private",
            name: "private",
            component: () => import("../views/agree/private.vue")
        },
        {
            path: "/agree/private-roundup",
            name: "private-roundup",
            component: () => import("../views/agree/private-roundup.vue")
        },
        {
            path: "/agree/info-share",
            name: "info-share",
            component: () => import("../views/agree/info-share.vue")
        },
        {
            path: "/manual/operating",
            name: "manual-operating",
            component: () => import("../views/manual/operating.vue")
        },
        {
            path: "/ECG1/user",
            name: "ECG1-user",
            component: () => import("../views/ECG1-agree/user.vue")
        },
        {
            path: "/ECG1/private",
            name: "ECG1-private",
            component: () => import("../views/ECG1-agree/private.vue")
        },
        {
            path: "/ECG1/report/:type/:id/:simple/:share?/",
            name: "ECG1-report",
            component: () => import("../views/report/ecg1-report.vue")
        }
    ]
});

export default router;
