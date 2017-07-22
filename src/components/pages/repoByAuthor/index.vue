<template>
  <div class="page page__by-author">

    <input type="text" class="search-author" placeholder="nickname"
      @input="setAuthor" value="github" autofocus>

    <repositories :repos="repos" :err="error"/>

    <infinite-loading v-show="author" :on-infinite="fetchMoreRepos" ref="infiniteLoading" :distance="400">
      <span slot="no-more"/>
      <span slot="no-results"/>
    </infinite-loading>

  </div>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading';
import { debounce } from '@/util/debounce';
import repositories from './repositories';

export default {
  name: 'page-by-author',
  components: { repositories, infiniteLoading },
  data: () => ({
    author: 'github',
    error: '',
    page: 0,
    repos: null,
  }),
  methods: {
    setAuthor: debounce(function (e) {
      this.author = e.target.value;

      // fetchMoreRepos will be called automatically
      this.page = 0;
      this.repos = null;
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
    }, 500),
    fetchMoreRepos: debounce(function () {
      this.error = '';

      if (!this.author.length) return;

      this.page += 1;
      const author = encodeURI(this.author);
      const clientId = 'client_id=07e0ab8ddd5a2a83cc80';
      const clientSecret = 'client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e';
      const url = `https://api.github.com/users/${author}/repos?page=${this.page}&sort=pushed&${clientId}&${clientSecret}`;

      this.axios.get(url)
        .then((res) => {
          this.repos = (this.repos || []).concat(res.data);
          const status = (res.data.length && 'loaded') || 'complete';
          this.$refs.infiniteLoading.$emit(`$InfiniteLoading:${status}`);
        })
        .catch((err) => {
          this.error = err.response && err.response.status === 404
            ? 'User is not found' : 'Cannot connect to server';
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        });
    }, 100, true),
  },
};
</script>

<style>
  .page__by-author {
    display: flex;
    flex-direction: column;
  }

  .search-author {
    width: 100%;
    max-width: 440px;
    margin: 2em auto 2em;
    padding: 0.3em;
    box-sizing: content-box;
    line-height: 1.5em;
    font-size: 1.2em;
    font-family: 'Roboto Mono'
  }
</style>
