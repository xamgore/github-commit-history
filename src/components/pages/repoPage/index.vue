<template>
  <div class="page page__repository">

    <div class="page__repository__title">
      <h2 class="repository__author">
        <router-link :to="{name: 'byAuthor', params: { author }}" v-text="author"/>
        / {{ repo }}
      </h2>

    </div>

    <div class="page__repository__content">
      <branches :author="author" :repo="repo" :selected="branch"/>

      <div class="history">
        <template v-for="bunch, date in groupedByDateCommits">

          <date :date="date"/>
          <commit v-for="cm in bunch" :key="cm.sha" :cm="cm" class="commit"/>

        </template>
      </div>
    </div>

  </div>
</template>

<script>
import groupBy from 'lodash.groupby';
import branches from './branches';
import commit from './commit';
import date from './date-label';
// #f06292 //#c2185b
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
    commits: {
      default: [],
      get() {
        const filter = Object.entries(this.$route.query).map(([k, v]) => `&${k}=${v}`).join('');

        return this.axios.get(`https://api.github.com/repos/${this.author}/${this.repo}/commits?sha=${this.branch}&client_id=07e0ab8ddd5a2a83cc80&client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e${filter}`)
          .then((res) => { console.log(res.data); return res.data; });
      },
    },
  },
};
</script>

<style>

.page__repository {
  padding: 2em;
}

.page__repository__title {
  margin-left: 1em;
  padding-bottom: 1em;
  /*border-bottom: 2px solid #f9f9f9;*/
  font-size: 0.9em;
}

.page__repository__content {
  margin-top: 1em;
  display: flex;
  flex-direction: row;
}

.page__repository__content .branches {
  border-right: 2px solid lightgray;
  margin-right: 1em;
  padding-right: 2.5em;
  font-size: 0.75em;
}

.repository__author {
  font-family: 'Open Sans';
  margin: 0;
  padding: 0;
  color: #444;
}

</style>
