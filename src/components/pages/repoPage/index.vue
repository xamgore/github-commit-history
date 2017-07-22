<template>
  <div class="page page__repository">

    <branches v-if="branches.length" :branches="branches" :selected="branch"/>

    <div class="history">
      <template v-for="bunch, date in groupedByDateCommits">

        <date :date="date"/>
        <commit v-for="cm in bunch" :key="cm.sha" :cm="cm" class="commit"/>

      </template>
    </div>

  </div>
</template>

<script>
import groupBy from 'lodash.groupby';
import branches from './branches';
import commit from './commit';
import date from './date-label';

export default {
  name: 'repo-page',
  components: { branches, commit, date },
  props: ['author', 'repo', 'branch'],
  computed: {
    groupedByDateCommits() {
      const round = (d) => {
        d.setMilliseconds(0); d.setSeconds(0); d.setMinutes(0); d.setHours(0);
        return d;
      };

      return groupBy(this.commits, cm => round(new Date(cm.commit.author.date)));
    },
  },
  asyncComputed: {
    branches: {
      default: [],
      get() {
        return this.axios.get(`https://api.github.com/repos/${this.author}/${this.repo}/branches?client_id=07e0ab8ddd5a2a83cc80&client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e`)
          .then(res => res.data);
      },
    },

    commits: {
      default: [],
      get() {
        return this.axios.get(`https://api.github.com/repos/${this.author}/${this.repo}/commits?sha=${this.branch}&client_id=07e0ab8ddd5a2a83cc80&client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e`)
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

</style>
