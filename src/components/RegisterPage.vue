<template>
  <v-card>
    <v-card-title class="my-5">
      Se créer un compte
    </v-card-title>
    <v-row justify="space-around">
      <v-col cols="5">
        <v-text-field v-model="username" variant="solo-filled" label="Pseudo" bg-color="background"></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="password" variant="solo-filled" label="Mot de passe"
                      bg-color="background"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="11">
        <v-text-field v-model="email" variant="solo-filled" label="Adresse mail" bg-color="background"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="5">
        <v-text-field v-model="firstname" variant="solo-filled" label="Prénom" bg-color="background"></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field v-model="lastname" variant="solo-filled" label="Nom" bg-color="background"></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="message_error" justify="center">
      <v-col cols="11">
        <v-alert color="error" class="text-center" closable>{{ message_error }}</v-alert>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="mb-2">
      <v-col cols="5">
        <custom-button :level="3" content="Annuler" icon="mdi-arrow-u-left-top" @action="cancel()"/>
      </v-col>
      <v-col cols="5" class="d-flex align-center justify-end">
        <custom-button :level="2" content="Créer un compte" icon="mdi-account-plus" @action="signin()"/>
      </v-col>
    </v-row>
    <v-row v-if="loading" justify="center">
      <v-col cols="12" class="d-flex justify-center align-center mb-4">
        <v-progress-circular color="primary" indeterminate/>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import CustomButton from "@/components/CustomButton.vue";
import {createUser, getToken} from "@/services/account";

export default {
  name: "RegisterPage.vue",
  components: {CustomButton, HeaderNavBar},

  data() {
    return {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      message_error: "",
      loading: false,
    }
  },

  methods: {
    cancel() {
      this.$router.push('/')
    },

    async signin() {
      this.loading = true
      try {
        let user = await createUser({
          username: this.username,
          password: this.password,
          email: this.email,
          first_name: this.firstname,
          last_name: this.lastname,
        })
        let tokens = await getToken({
          password: this.password,
          username: this.username
        })
        window.localStorage.setItem("user", JSON.stringify(user))
        window.localStorage.setItem("token", JSON.stringify(tokens))
        this.$router.push('/')
      } catch (e) {
        this.message_error = e.message
      } finally{
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
