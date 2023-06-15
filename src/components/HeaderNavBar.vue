<template>
<v-card class="ma-2">
  <v-row justify="space-between">
    <v-col cols="1" class="d-flex justify-start"><v-img src="@/assets/full_logo_blue.png" height="100"></v-img></v-col>
    <v-col cols="7" class="d-flex justify-left align-center">
      <v-btn-group>
<!--        <v-hover>-->
<!--          <template v-slot="{ hover }">-->
            <v-btn class="mx-5 text-primary hover-effect text-h6" variant="flat">Parcourir</v-btn>
            <v-btn class="mx-5 text-primary hover-effect text-h6" variant="flat">Favoris</v-btn>
            <v-btn class="mx-5 text-primary hover-effect text-h6" variant="flat">Nous soutenir</v-btn>
<!--          </template>-->
<!--        </v-hover>-->
      </v-btn-group>
    </v-col>
    <v-col cols="3" class="d-flex justify-space-around align-center">
        <v-btn class="text-primary hover-effect text-h6" append-icon="mdi-login-variant" variant="flat" size="large">
          Se connecter
        </v-btn>
        <v-btn
          size="large"
          variant="outlined"
          class="text-primary text-h6 hover-effect"
          color="primary"
          elevation="5"
        >
          S'enregistrer
        </v-btn>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="7">
      <v-text-field variant="solo" bg-color="background" label="Rechercher un outils...">
        <template #append-inner>
          <v-btn append-icon="mdi-magnify" color="primary" class="text-body-2" elevation="5" size="large">Chercher</v-btn>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
export default {
  name: "HeaderNavBar"
}
</script>

<style lang="scss">
.hover-effect:hover {
  color: #FFCACA !important;
}
</style>
