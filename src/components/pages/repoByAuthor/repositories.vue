<template>
  <div>

    <div v-if="message">
      {{ message }}
    </div>

    <div v-else class="repositories">
      <repo v-for="rep in sorted" :rep="rep" :key="rep.id"/>
    </div>

    <!-- TODO: pagination -->

  </div>
</template>

<script>
import repo from './repo';

export default {
  name: 'repositories',
  props: ['repos', 'err'],
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
};
</script>

<style>
  .repo:not(:last-child) {
    margin-bottom: 1em;
  }

  .repositories {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-right: -1em;
  }

  .repo {
    margin-right: 1em;
    box-sizing: content-box;
  }
</style>
