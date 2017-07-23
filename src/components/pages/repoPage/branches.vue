<template>
  <div v-if="branches.length" class="branches">

    <router-link v-for="br in branches" :key="br.name"
      :to="{ name: 'repo', params: { branch: br.name } }"
      :class="['branch', { 'branch--selected': br.name == selected }]">
      {{ br.name }}
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'branches',
  props: ['author', 'repo', 'selected'],
  asyncComputed: {
    branches: {
      default: [],
      get() {
        const clientId = 'client_id=07e0ab8ddd5a2a83cc80';
        const clientSecret = 'client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e';
        return this.axios.get(`https://api.github.com/repos/${this.author}/${this.repo}/branches?${clientId}&${clientSecret}`)
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

.branches {
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1em;
}

.branch {
  color: #283593;
  padding: 0.2em 0.4em;
  margin: 0.5em 0;
  font-family: 'Roboto Mono';
  cursor: default;
  text-decoration: none;
  cursor: pointer;
}

.branch.branch--selected {
  text-decoration: none;
  background: #5C6BC0;
  color: white;
}

.branch:not(.branch--selected):hover {
  text-decoration: underline;
}

</style>
