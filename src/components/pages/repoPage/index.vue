<template>
  <div class="page page__repository">

    <div class="page__repository__title">
      <h2 class="repository__author">
        <router-link :to="{name: 'byAuthor', params: { author }}" v-text="author"/>
        / {{ repo }}
      </h2>
    </div>

    <div class="page__repository__content">
      <branches :author="author" :repo="repo" :selected="branch"
        @change="$refs.infiniteLoading.$emit('$InfiniteLoading:reset')"/>

      <div class="history">
        <input :value="$route.query.q" @input="changeURL" type="text" class="search"
          placeholder="Add scrolling  author:xamgore path:app" autofocus>

        <template v-for="bunch, date in groupedCommits">
          <date :date="date"/>
          <commit v-for="cm in bunch" :key="cm.sha" :cm="cm" class="commit"/>
        </template>

        <infinite-loading v-show="branch" :on-infinite="fetchCommits" ref="infiniteLoading" :distance="400">
          <span slot="no-more"/>
          <span slot="no-results"/>
        </infinite-loading>
      </div>
    </div>

  </div>
</template>

<script>
import infiniteLoading from 'vue-infinite-loading';
import { throttle } from '@/util/debounce';
import groupBy from 'lodash.groupby';
import branches from './branches';
import commit from './commit';
import date from './date-label';

const jsSearch = require('js-search');


export default {
  name: 'repo-page',
  components: { branches, commit, date, infiniteLoading },
  props: ['author', 'repo', 'branch'],

  data: () => ({
    per_page: 100,
    commits: {},
    pages: {},
    filters: { search: '' },
    input: '',
  }),

  watch: {
    '$route.query': function (query) {
      console.log(`query: ${query.q}`);

      this.filters.search = query.q || '';
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');


      // look at the query: if author/path/since were found, reset the state
      if (query.q) {
        // this.filters.author = query.q;

        // this.pages = {};
        // this.commits = {};
      }
    },
  },

  methods: {
    changeURL: throttle(function (e) {
      console.log('changeURL');
      const query = e.target.value ? { q: e.target.value } : {};
      this.$router.push({ query });
    }, 50, { leading: false }),

    fetchCommits: throttle(function () {
      if (!this.branch) return;

      const page = (this.pages[this.branch] || 0) + 1;
      this.$set(this.pages, this.branch, page);

      const clientId = 'client_id=07e0ab8ddd5a2a83cc80';
      const clientSecret = 'client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e';
      const filter = Object.entries(this.filters).map(([k, v]) => `&${k}=${v}`).join('');
      const url = `https://api.github.com/repos/${this.author}/${this.repo}/commits?page=${page}&per_page=${this.per_page}&sha=${this.branch}&${clientId}&${clientSecret}${filter}`;

      this.axios.get(url).then((res) => {
        this.$set(this.commits, this.branch, (this.commits[this.branch] || []).concat(res.data));
        const status = (res.data.length === this.per_page && 'loaded') || 'complete';
        this.$refs.infiniteLoading.$emit(`$InfiniteLoading:${status}`);
        console.log(status);
      });
    }, 200, { leading: false }),
  },

  computed: {
    // add pause?
    groupedCommits() {
      const search = this.filters.search;

      let commits = this.commits[this.branch];
      if (search !== '') {
        const s = new jsSearch.Search('sha');
        s.addIndex(['commit', 'commiter', 'date']);
        s.addIndex(['commit', 'message']);
        s.addDocuments(commits);
        commits = s.search(search);
      }

      return groupBy(commits, (cm) => {
        const d = new Date(cm.commit.author.date);
        return d.setMilliseconds(0) && d.setSeconds(0) && d.setMinutes(0) && d.setHours(0) && d;
      });
    },
  },
};
</script>

<style>
/* #f06292 //#c2185b */

.page__repository {
  padding: 2em;
}

.page__repository__title {
  margin-left: 1em;
  padding-bottom: 1em;
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

.search {
  width: 100%;
  padding: 0.3em;
  line-height: 1.5em;
  font-size: 0.9em;
  font-family: 'Roboto Mono';
}

.history {
  width: 480px;
}

</style>
