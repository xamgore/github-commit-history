import Vue from 'vue';
import Router from 'vue-router';
import repoPage from '@/components/pages/repoPage';
import repoByAuthor from '@/components/pages/repoByAuthor';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/:author?', name: 'byAuthor', props: true, component: repoByAuthor },
    { path: '/:author/:repo/:branch?', name: 'repo', props: true, component: repoPage },
  ],
});
