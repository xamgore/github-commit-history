<template>
  <div>

    <div v-if="repos && repos.length">
      <repo v-for="rep in repos" :rep="rep"/>
    </div>

    <div v-else-if="repos">
      no repositories, sorry
    </div>

    <!-- TODO: pagination -->

  </div>
</template>

<script>
import repo from '@/components/repo';

export default {
  name: 'repositories',
  props: ['repos'],
  components: { repo },
};
</script>

<style>
  .repo:not(:last-child) {
    margin-bottom: 1em;
  }
</style>
