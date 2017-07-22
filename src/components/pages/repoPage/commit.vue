<template>
  <div class="commit">

    <router-link :to="{ name: 'byAuthor', params: { author: cm.author.login }}" class="commit__avatar__link">
      <img :src="avatar" alt="avatar" class="commit__avatar">
    </router-link>

    <div class="commit__information">
      <div class="commit__message">
        <a :href="cm.html_url" class="commit__message__link" :title="cm.commit.message">
          {{ cm.commit.message | first50letters }}
        </a>
      </div>

      <div class="commit__meta">
        <span class="commit__author" v-text="cm.author.login" :title="view"/>
        commited
        <span class="commite__date" :title="cm.commit.author.date" v-text="ago"/>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'commit',
  props: ['cm'],
  filters: {
    first50letters: s => s.split('\n')[0],
  },
  computed: {
    avatar() {
      return `${this.cm.author.avatar_url}&s=72`;
    },
    view() {
      return `View all commits by ${this.cm.commit.author.name}`;
    },
    date() {
      return new Date(this.cm.commit.author.date);
    },
    diffTime() {
      return (new Date() - this.date) / (24 * 3600 * 1000);
    },
    ago() {
      let phraze;

      if (this.diffTime < 7) {
        phraze = `${Math.floor(this.diffTime)} days ago`;
      } else {
        const opt = { day: 'numeric', month: 'short' };

        if (this.diffTime > 365) {
          opt.year = 'numeric';
        }

        phraze = `on ${this.date.toLocaleDateString('en-US', opt)}`;
      }

      return phraze;
    },
  },
};
</script>

<style>

.commit {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.6em;
}

.commit:hover {
  background-color: #f6f6f6;
}

.commit__avatar {
  width: 2.3em;
  border-radius: 100%;
  margin-right: 0.5em;
}

.commit__avatar__link {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.commit__information {
  display: flex;
  flex-direction: column;
}

.commit__message {
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  width: 500px;
  white-space: nowrap;
}

.commit__message__link {
  color: #111;
  text-decoration: none;
}

.commit__message__link:hover {
  text-decoration: underline;
}

.commit__meta {
  font-size: 0.75em;
  color: #777;
}

.commit__author {
  font-weight: 600;
}

.commit__author:hover {
  text-decoration: underline;
  cursor: pointer;
}

</style>
