import { createRouter, createWebHistory } from 'vue-router';
import CountrySearch from '../components/CountrySearch.vue';
import CountryDetailsPage from '../components/CountryDetailsPage.vue';

const routes = [
  {
    path: '/',
    name: 'CountrySearch',
    component: CountrySearch,
  },
  {
    path: '/country/:name',
    name: 'CountryDetails',
    component: CountryDetailsPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
