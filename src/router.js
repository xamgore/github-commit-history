import Vue from 'vue';
import Router from 'vue-router';
import repoPage from '@/components/pages/history';
import repoByAuthor from '@/components/pages/profile';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/:author?', name: 'byAuthor', props: true, component: repoByAuthor },
    { path: '/:author/:repo/:branch?', name: 'repo', props: true, component: repoPage },
  ],
});
