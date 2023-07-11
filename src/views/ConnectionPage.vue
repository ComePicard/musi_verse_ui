<template>
<header-nav-bar/>
  <v-row justify="space-around" class="mt-8">
    <v-col cols="5">
      <register-page/>
    </v-col>
    <v-col cols="5">
      <login-page/>
    </v-col>
  </v-row>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import LoginPage from "@/components/LoginPage.vue";

export default {
  name: "ConnectionPage",
  components: {RegisterPage, HeaderNavBar, LoginPage}
}
</script>

<style scoped>

</style>
