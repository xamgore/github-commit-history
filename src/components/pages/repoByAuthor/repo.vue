<template>
  <div class="repo" @click="goto(rep.name)">

    <div class="repo__title">
      <span class="repo__name">
        {{ rep.name }}

        <span v-if="rep.stargazers_count" class="repo__stars">
          ⭐{{ rep.stargazers_count }}
        </span>

        <span v-if="rep.watchers_count" class="repo__watchers">
          👀{{ rep.watchers_count }}
        </span>
      </span>
    </div>


    <div class="repo__desc">
      {{ rep.description }}
    </div>

    <div class="repo__other" style="margin-top: 0.5em">
      <span v-if="rep.language" class="repo__lang">{{ rep.language }}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'repo',
  props: ['rep'],
  methods: {
    goto(rep) { console.log(rep); },
  },
};
</script>

<style>
  .repo {
    padding: 1em;
    border: 1px solid #ddd;
    border-radius: 0.2em;
    line-height: 1.5em;
    max-width: 420px;
    width: 100%;
  }

  .repo:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }

  .repo__name {
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
    /*color: #1976d2;*/
    color: #5C6BC0;
  }

  .repo__stars, .repo__watchers {
    color: #555;
  }

  .repo__desc {
    color: gray;
  }

  .repo__lang {
    color: #9e9e9e;
    font-size: 0.9em;
  }
</style>
