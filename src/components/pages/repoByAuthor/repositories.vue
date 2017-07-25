<template>
  <div class="repositories">

    <div v-if="message" class="repositories__message">
      {{ message }}
    </div>

    <div v-else class="repositories__container">
      <repo v-for="rep in repos" :rep="rep" :key="rep.id" :colors="colors"/>
    </div>

  </div>
</template>

<script>
import repo from './repo';

export default {
  name: 'repositories',
  props: ['repos', 'err'],
  data: () => ({ colors: {} }),
  components: { repo },
  computed: {
    sorted() {
      return this.repos.slice(0).sort((y, x) =>
        x.stargazers_count - y.stargazers_count ||
        x.watchers_count - y.watchers_count ||
        x.pushed_at.localeCompare(y.pushed_at));
    },
    message() {
      return this.err ||
        (this.repos && !this.repos.length && 'There are no repositories, sorry');
    },
  },
  created() {
    this.axios.get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json')
      .then((res) => { this.colors = res.data; });
  },
};
</script>

<style>
  .repo {
    margin-right: 1em;
    box-sizing: content-box;
  }

  .repo:not(:last-child) {
    margin-bottom: 1em;
  }

  .repositories__container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 1em;
    padding-bottom: 2em;
  }

  .repositories__message {
    text-align: center;
  }

</style>
