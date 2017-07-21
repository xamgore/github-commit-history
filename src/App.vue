<template>
  <div id="app" style="padding: 7em">
    <!-- <router-view></router-view> -->

    <input type="text" class="search-author" placeholder="nickname…" @input="setAuthor">

    <repositories :repos="repos"/>

  </div>
</template>

<script>
import repositories from '@/components/repositories';
import debounce from '@/util/debounce';

export default {
  name: 'app',
  components: { repositories },
  data: () => ({
    author: '',
  }),
  methods: {
    setAuthor: debounce(function (e) {
      this.author = e.target.value;
    }, 500),
  },
  asyncComputed: {

    repos: {
      default: [],
      get() {
        if (!this.author) return null;
        const author = encodeURI(this.author);
        const url = `https://api.github.com/users/${author}/repos?sort=pushed`;
        return this.axios.get(url).then(res => res.data);
      },
    },

  },
};
</script>

<style>
  * { box-sizing: inherit; }

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  .search-author {
    width: 100%;
    margin: 0 0 2em;
    padding: 0.3em;
    line-height: 1.5em;
    font-size: 1.2em;
    font-family: 'Roboto Mono'
  }
</style>
