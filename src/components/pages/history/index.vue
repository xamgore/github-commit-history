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
        <input v-model="input" @input="updateURL" type="text" class="search"
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
import { debounce, throttle } from '@/util';
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
    input: '',
  }),

  watch: {
    '$route.query.q': function () {
      this.input = this.$route.query.q || '';
    },
  },

  created() {
    this.input = this.$route.query.q || '';
  },

  methods: {
    updateURL: debounce(function (e) {
      const query = e.target.value ? { q: e.target.value } : {};
      this.$router.push({ query });
    }, 600),

    fetchCommits: throttle(function () {
      if (!this.branch) return;
      this.error = '';

      const page = (this.pages[this.branch] || 0) + 1;
      this.$set(this.pages, this.branch, page);

      const clientId = 'client_id=07e0ab8ddd5a2a83cc80';
      const clientSecret = 'client_secret=c78ac83e552cf858af63a8c8cde812a2a778fd7e';
      const filter = Object.entries(this.params).map(([k, v]) => `&${k}=${v}`).join('');
      const url = `https://api.github.com/repos/${this.author}/${this.repo}/commits?page=${page}&per_page=${this.per_page}&sha=${this.branch}&${clientId}&${clientSecret}${filter}`;

      this.axios.get(url).then((res) => {
        this.$set(this.commits, this.branch, (this.commits[this.branch] || []).concat(res.data));
        const status = (res.data.length === this.per_page && 'loaded') || 'complete';
        this.$refs.infiniteLoading.$emit(`$InfiniteLoading:${status}`);
      })
      .catch(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete'));
    }, 300, { leading: false }),
  },

  computed: {
    params() {
      const q = this.$route.query.q || '';
      const params = { search: '' };

      const regexp = /(author|path):[^:\s]+/g;
      params.search = q.replace(regexp, '').trim();

      const filters = (q.match(regexp) || []).map(p => p.split(':'));
      if (filters.length) { this.pages = {}; this.commits = {}; }
      filters.forEach((p) => { params[p[0]] = p[1]; });

      // calls fetchCommits()
      this.$nextTick(() => this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset'));
      return params;
    },

    groupedCommits() {
      const search = this.params.search;
      let commits = this.commits[this.branch] || [];

      if (search !== '' && commits) {
        const s = new jsSearch.Search('sha');
        s.addIndex(['commit', 'message']);
        s.addDocuments(commits);
        commits = s.search(search);
        commits.sort((x, y) => y.commit.author.date.localeCompare(x.commit.author.date));
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
  padding-right: 1.5em;
  font-size: 0.75em;
  line-height: 1.25em;
  max-width: 230px;
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
  max-width: 480px;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .page__repository { padding: 1em }
  .page__repository__title { padding-bottom: 0 }
  .page__repository__content { flex-direction: column }
  .page__repository__content .branches {
    border-right: 0;
    margin-bottom: 3em;
    padding-right: 0;
    margin-right: 0;
    max-width: inherit;
  }
}

</style>
