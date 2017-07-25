<template>
  <div class="history__date">
    <span v-text="daysFromToday" :title="localizedDate" class="history__date__label"/>
  </div>
</template>

<script>
export default {
  name: 'date-label',
  props: ['date'],
  computed: {
    localizedDate() {
      return new Date(this.date).toLocaleDateString('en-US', {
        day: 'numeric', month: 'short', year: 'numeric',
      });
    },

    daysFromToday() {
      const date = new Date(this.date);
      const diff = new Date() - date;
      const days = diff / (24 * 3600 * 1000);

      const opt = { day: 'numeric', month: 'short' };
      let phraze;

      if (days < 1) {
        phraze = 'today';
      } else if (days < 2) {
        phraze = 'yesterday';
      } else if (days < 7) {
        phraze = `${Math.floor(days)} days ago`;
      } else {
        if (days > 30) { opt.year = 'numeric'; }
        phraze = `on ${date.toLocaleDateString('en-US', opt)}`;
      }

      return phraze;
    },
  },
};
</script>

<style>

.history__date {
  color: #586069;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  margin-bottom: 0.5em;
}

.history__date__label {
  cursor: help;
}

.history__date:not(:first-child) {
  margin-top: 1.7em;
}

</style>
