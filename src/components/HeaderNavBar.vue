<template>
<v-card class="ma-1">
  <v-row justify="space-between">
    <v-col cols="1" class="d-flex justify-start mt-2">
      <v-btn icon variant="flat" to="/" height="60" width="60">
        <v-img src="@/assets/full_logo_blue.png" height="60"></v-img>
      </v-btn>
    </v-col>
    <v-col cols="7" class="d-flex justify-left align-center">
      <v-btn-group>
        <custom-button margin="mx-5" content="Publier un article" :level="3" icon="mdi-plus" @action="to_create()"/>
      </v-btn-group>
    </v-col>
    <v-col cols="4" class="d-flex justify-space-around align-center">
        <custom-button margin="mx-5" content="Se connecter" :level="3" icon="mdi-login-variant" @action="$router.push('/connection')"/>
        <custom-button margin="mx-5" content="S'enregistrer" :level="2" :icon="null" @action="$router.push('/connection')"/>
    </v-col>
  </v-row>
  <v-row v-if="search" justify="center" class="mt-0">
    <v-col cols="7">
      <v-text-field variant="solo" bg-color="background" label="Rechercher un outils...">
        <template #append-inner>
          <custom-button content="Chercher" :level="1" icon="mdi-magnify"/>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import customButton from "@/components/CustomButton"

export default {
  name: "HeaderNavBar",

  components:{
    customButton
  },

  props: {
    search: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    to_create(){
      this.$router.push("/create")
    }
  }
}
</script>

<style lang="scss">
.hover-effect:hover {
  color: #FFCACA !important;
}
</style>
