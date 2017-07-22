<template>
  <div class="repo" @click="goto(rep.name)">

    <div class="repo__title">
      <span class="repo__name">
        {{ rep.name }}

        <span v-if="rep.stargazers_count" class="repo__stars">
          ⭐{{ rep.stargazers_count }}
        </span>

        <!-- <span v-if="rep.watchers_count" class="repo__watchers">
          👀{{ rep.watchers_count }}
        </span> -->
      </span>
    </div>


    <div class="repo__desc">
      {{ rep.description }}
    </div>

    <div class="repo__other">
      <span v-if="rep.language" class="repo__lang">
        <span :style='{"background-color": color}' class="repo__lang__circle"/>
        {{ rep.language }}
      </span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'repo',
  props: ['rep', 'colors'],
  computed: {
    color() {
      return this.colors[this.rep.language].color;
    },
  },
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
    display: flex;
    flex-direction: column;
  }

  .repo:hover {
    background-color: #f6f6f6;
    cursor: pointer;
  }

  .repo__name {
    font-family: 'Roboto Mono', monospace;
    font-weight: 500;
    color: #5C6BC0;
  }

  .repo__stars, .repo__watchers {
    color: #555;
  }

  .repo__desc {
    color: gray;
    margin-bottom: 0.5em;
  }

  .repo__lang {
    color: #9e9e9e;
    font-size: 0.9em;
  }

  .repo__lang__circle {
    display:inline-block;
    width:1em;
    height:1em;
    border-radius:50%;
    position: relative;
    top: 0.14em;
    margin-right:0.1em;
  }

  .repo__other {
    margin-top: auto;
  }
</style>
