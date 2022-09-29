import { createRouter, createWebHistory } from "vue-router"
import Home from '../views/Home.vue'
import Match from '../views/Match.vue'

// We'll talk about nested routes later.
const routes = [
	{ path: '/', component: Home },
	{ path: '/match', component: Match}
]


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
	// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
	history: createWebHistory(),
	routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
	next()
})

export default router