<template>
  <div class="page page__by-author">

    <div class="search-wrapper">
      <input type="text" class="search-author" placeholder="nickname"
         @input="updateURL" v-model="input" autofocus>
     </div>

    <repositories :repos="repos" :err="error"/>

    <infinite-loading v-show="author" :on-infinite="fetchMoreRepos" ref="infiniteLoading" :distance="400">
      <span slot="no-more"/>
      <span slot="no-results"/>
    </infinite-loading>

  </div>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading';
import { debounce, throttle } from '@/util/debounce'; // eslint-disable-line
import repositories from './repositories';

export default {
  name: 'page-by-author',
  components: { repositories, infiniteLoading },
  props: ['author'],
  data: () => ({
    error: '',
    page: 0,
    repos: null,
    input: '',
  }),
  watch: {
    author() {
      this.page = 0;
      this.repos = null;
      this.input = this.author;

      // calls fetchMoreRepos
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
    },
  },
  methods: {
    updateURL: debounce(function (e) {
      this.$router.push({ name: 'byAuthor', params: { author: e.target.value } });
    }, 600),

    fetchMoreRepos: throttle(function () {
      this.error = '';

      if (!this.author.length) return;

      this.page += 1;
      const author = encodeURI(this.author.trim());
      const clientId = 'client_id=07e0ab8ddd5a2a83cc80';
      const clientSecret = 'client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e';
      const url = `https://api.github.com/users/${author}/repos?page=${this.page}&sort=pushed&${clientId}&${clientSecret}`;

      this.axios.get(url)
        .then((res) => {
          this.repos = (this.repos || []).concat(res.data);
          const status = (res.data.length === 30 && 'loaded') || 'complete';
          this.$refs.infiniteLoading.$emit(`$InfiniteLoading:${status}`);
        })
        .catch((err) => {
          this.error = err.response && err.response.status === 404
            ? 'User is not found' : 'Cannot connect to server';
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        });
    }, 300, { leading: false }),
  },
};
</script>

<style>
  .page__by-author {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search-author {
    width: 100%;
    max-width: calc(415px + 2em);
    padding: 0.3em;
    line-height: 1.5em;
    font-size: 1.2em;
    font-family: 'Roboto Mono'
  }

  @media screen and (min-width: 460px) {
    .search-author { margin: 2em 0 }
  }

  .search-wrapper {
    padding: 1em;
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
