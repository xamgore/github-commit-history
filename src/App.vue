<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
  * { box-sizing: inherit; }

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  @media screen and (max-width: 460px) {
    body { font-size: 0.78em; }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  input {
    background: white;
    border: solid 1px #c9c9c9;
    border-radius: 0;
  }
</style>
