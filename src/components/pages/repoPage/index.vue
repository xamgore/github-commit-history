<template>
  <div class="page page__repository">

    <branches v-if="branches.length" :branches="branches" :selected="branch"/>

    <div class="history">
      <commit v-for="cm in commits" :key="cm.sha" :cm="cm" class="commit"/>
    </div>

  </div>
</template>

<script>
import branches from './branches';
import commit from './commit';

export default {
  name: 'repo-page',
  components: { branches, commit },
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
        return this.axios.get(`https://api.github.com/repos/${this.author}/${this.repo}/commits?sha=${this.branch}`)
          .then((res) => { console.log(res.data); return res.data; });
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

.page__repository .branches {
  border-right: 2px solid lightgray;
  margin-right: 1em;
  padding-right: 2.5em;
  font-size: 0.75em;
}

.history {
  /*margin-left: 1em;*/
}

.commit {
  /*margin: 0.5em 0;*/
}

</style>
