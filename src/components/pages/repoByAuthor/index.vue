<template>
  <div class="page page__by-author">

    <input type="text" class="search-author" placeholder="nickname"
      @input="setAuthor" value="github" autofocus>

    <repositories :repos="repos" :err="error"/>

  </div>
</template>

<script>
import debounce from '@/util/debounce';
import repositories from './repositories';

export default {
  name: 'page-by-author',
  components: { repositories },
  data: () => ({
    author: 'github',
    error: '',
  }),
  methods: {
    setAuthor: debounce(function (e) {
      this.author = e.target.value;
    }, 500),
  },
  asyncComputed: {

    repos: {
      default: null,
      get() {
        this.error = '';
        if (!this.author) return null;
        const author = encodeURI(this.author);
        const url = `https://api.github.com/users/${author}/repos?sort=pushed&client_id=07e0ab8ddd5a2a83cc80&client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e`;
        return this.axios.get(url).then(res => res.data)
          .catch((err) => {
            this.error = err.response && err.response.status === 404
              ? 'User is not found' : 'Cannot connect to server';
          });
      },
    },

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
    margin: 1em auto 2em;
    padding: 0.3em;
    box-sizing: content-box;
    line-height: 1.5em;
    font-size: 1.2em;
    font-family: 'Roboto Mono'
  }
</style>
