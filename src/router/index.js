import Vue from 'vue';
import Router from 'vue-router';
import repoByAuthor from '@/components/pages/repoByAuthor';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/:nickname?', name: 'byAuthor', props: true, component: repoByAuthor },
  ],
});
