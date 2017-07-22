<template>
  <div class="page page__repository">

    <branches v-if="branches.length" :branches="branches" :selected="branch"/>

    <div class="history">
      
    </div>

  </div>
</template>

<script>
import branches from './branches';

export default {
  name: 'repo-page',
  components: { branches },
  props: ['author', 'repo', 'branch'],
  asyncComputed: {
    branches: {
      default: [],
      get() {
        return this.axios.get(`https://api.github.com/repos/${this.author}/${this.repo}/branches`)
          .then(res => res.data);
      },
    },

    commits: {
      default: [],
      get() {
        return this.axios.get(`https://api.github.com/repos/${this.author}/${this.repo}/commits`)
          .then(res => res.data);
      },
    },
  },
  created() {
    // add /master if a branch was not set
    if (!this.branch || !this.branch.length) {
      this.$router.replace({ name: 'repo', params: { ...this.$data, branch: 'master' } });
    }
  },
};
</script>

<style>

.page__repository {
  padding: 2em;
  display: flex;
  flex-direction: row;
}

.branches {
  border-right: 2px solid lightgray;
}

</style>
