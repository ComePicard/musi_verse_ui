<template>
<v-card class="ma-2">
  <v-row justify="space-between">
    <v-col cols="1" class="d-flex justify-start"><v-img src="@/assets/full_logo_blue.png" height="100"></v-img></v-col>
    <v-col cols="7" class="d-flex justify-left align-center">
      <v-btn-group>
        <custom-button margin="mx-5" content="Parcourir" :level="3" :icon="null"/>
        <custom-button margin="mx-5" content="Favoris" :level="3" :icon="null"/>
        <custom-button margin="mx-5" content="Nous soutenir" :level="3" :icon="null"/>
      </v-btn-group>
    </v-col>
    <v-col cols="4" class="d-flex justify-space-around align-center">
        <custom-button margin="mx-5" content="Se connecter" :level="3" icon="mdi-login-variant"/>
        <custom-button margin="mx-5" content="S'enregistrer" :level="2" :icon="null"/>
    </v-col>
  </v-row>
  <v-row justify="center">
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
  }
}
</script>

<style lang="scss">
.hover-effect:hover {
  color: #FFCACA !important;
}
</style>
