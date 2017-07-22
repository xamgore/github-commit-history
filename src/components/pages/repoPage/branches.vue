<template>
  <div class="branches">

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
  props: ['branches', 'selected'],
};
</script>

<style>

.branches {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
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
}

.branch.branch--selected {
  background: #5C6BC0;
  color: white;
}

.branch:not(.branch--selected):hover {
  text-decoration: underline;
  cursor: pointer;
}

</style>
