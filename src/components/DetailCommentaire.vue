<template>
  <v-card class="pa-2 my-2">
    <v-row justify="space-between">
      <v-col>{{ commentaire.author }}</v-col>
      <v-col class="d-flex align-center justify-end">{{ cpDate }}</v-col>
    </v-row>
    <v-row justify="end" no-gutters>
      <v-col cols="1" class="d-flex align-center justify-end">
        <v-icon :icon="cpIcon" :color="cpColor"/>
      </v-col>
    </v-row>
    <v-row>
      <v-divider/>
    </v-row>
    <v-row>
      <v-col>
        {{ commentaire.content }}
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DetailCommentaire",

  props: {
    commentaire: {
      type: Object,
      required: true,
    }
  },

  computed: {
    cpIcon() {
      return this.commentaire.status === "flag" ? 'mdi-flag-outline' :
        this.commentaire.status === "unch" ? 'mdi-alert-circle-outline' :
          this.commentaire.status === "chec" ? "mdi-check-outline" :
            this.commentaire.status === "ban" ? "mdi-cancel" : "mdi-info"
    },

    cpColor() {
      return this.commentaire.status === "flag" ? 'warning' :
        this.commentaire.status === "unch" ? 'white' :
          this.commentaire.status === "chec" ? "success" :
            this.commentaire.status === "ban" ? "error" : null
    },

    cpDate() {
      const date = new Date(this.commentaire.creation_date);

      const options = {day: "numeric", month: "long", year: "numeric"};

      return date.toLocaleDateString("fr-FR", options);
    }
  }
})
</script>

<style scoped>
</style>
