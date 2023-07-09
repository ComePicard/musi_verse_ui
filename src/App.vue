<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: 'Varela Round';
  src: url('~@/assets/VarelaRound-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

html{
  overflow-y: hidden;
}

.app {
  font-family: 'Varela Round', sans-serif;
  /* Autres styles */
}

/* Autres styles de votre application */
</style>

<script>
export default {
  name: 'App',
  // Composants, méthodes, etc.
}
</script>

