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
        const url = `https://api.github.com/repos/${this.author}/${this.repo}/branches?${clientId}&${clientSecret}&per_page=100`;

        return this.axios.get(url).then((res) => {
          // add /master to url if a branch was not set
          if (!this.selected || !this.selected.length) {
            this.$router.replace({ name: 'repo', params: { ...this.$data, branch: res.data[0].name } });
          }

          return res.data;
        });
      },
    },
  },
  watch: {
    selected() { this.$emit('change', null); },
  },
};
</script>

<style>

.branches {
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 1em;
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

@media screen and (max-width: 768px) {
  .branches {
    flex-direction: row;
    border-right: none;
    margin-bottom: 3em;
  }

  .branch { margin: 0.5em 0.5em 0 0; }
}

</style>
