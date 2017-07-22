<template>
  <div>

    <div v-if="message">
      {{ message }}
    </div>

    <div v-else class="repositories">
      <repo v-for="rep in repos" :rep="rep" :key="rep.id" :colors="colors"/>
    </div>

    <!-- TODO: pagination -->

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

  .repositories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 1em;
    padding-bottom: 2em;
  }

  @media screen and (max-width:420px) {
    .repositories {
      /*margin-right: 0;*/
    }

    .repo {
      /*margin: 1em;*/
    }
  }
</style>
