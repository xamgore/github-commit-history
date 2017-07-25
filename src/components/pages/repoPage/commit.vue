<template>
  <div class="commit">

    <router-link :to="{ name: 'byAuthor', params: { author }}" class="commit__avatar__link">
      <img :src="avatar" alt="avatar" class="commit__avatar">
    </router-link>

    <div class="commit__information">
      <div class="commit__message">
        <a :href="cm.html_url" class="commit__message__link" :title="cm.commit.message">
          {{ cm.commit.message | first50letters }}
        </a>
      </div>

      <div class="commit__meta">
        <router-link v-text="author" :title="view" class="commit__author"
          :to="{ query: { author } }"/>
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
    author() {
      const author = this.cm.author && this.cm.author.login;
      const commiter = this.cm.commit.author.name;
      return author || commiter;
    },
    avatar() {
      const author = this.cm.author && this.cm.author.avatar_url;
      const commiter = this.cm.commiter && this.cm.commiter.avatar_url;
      const ava = author || commiter;

      const transparent = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
      return ava ? `${ava}&s=72` : transparent;
    },
    view() {
      return `View all commits by ${this.cm.commit.author.name}`;
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
  height: 2.3em;
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
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  white-space: nowrap;
  width: 100%;
}

.commit__message {
  font-size: 0.9em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
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
  color: inherit;
  text-decoration: inherit;
}

.commit__author:hover {
  text-decoration: underline;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .commit { margin: 0 -0.3em; }
  .commit__message, .commit__information {
    white-space: inherit;
  }
}

</style>
