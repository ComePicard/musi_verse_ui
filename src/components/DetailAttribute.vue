<template>
  <v-row align="center" justify="center">
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-chip variant="outlined" :color="colorChips">{{attribute?.attribute_name}}</v-chip>
    </v-col>
    <v-col cols="1">
      <span :class="`text-${colorScore}`">{{ attribute?.article_votes.votes_diff }}</span>
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
        this.attribute?.article_votes?.votes_diff >= 0 ? "warning" :
          "error"
    },

    colorChips(){
      return this.attribute?.article_attribute.attribute_type === "pros" ? "success" : this.attribute?.article_attribute.attribute_type === "cons" ? "error" : "warning"
    }
  }
}
</script>

<style scoped>

</style>
