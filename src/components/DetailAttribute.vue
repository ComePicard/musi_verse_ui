<template>
  <v-row align="center" justify="center">
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-chip variant="outlined" color="success">Nom attribute</v-chip>
    </v-col>
    <v-col cols="1">
      <span :class="`text-${colorScore}`">{{ }}</span>
    </v-col>
    <v-col cols="1">
      <v-btn icon variant="flat" density="compact">
        <v-icon icon="mdi-arrow-up"/>
      </v-btn>
    </v-col>
    <v-col cols="1">
      <v-btn icon variant="flat" density="compact">
        <v-icon icon="mdi-arrow-down"/>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DetailAttribute",

  props: {
    attribute: {
      type: Object,
      required: true,
    }
  },

  computed: {
    colorScore(){
      return this.attribute?.article_votes?.votes_diff >= 5 ? "success" :
        this.attribute?.article_votes?.votes_diff > 0 ? "warning" :
          "error"
    }
  }
}
</script>

<style scoped>

</style>
