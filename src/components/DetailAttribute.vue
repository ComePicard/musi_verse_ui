<template>
  <v-row align="center" justify="center">
    <v-col cols="6" class="d-flex justify-center align-center">
      <v-chip variant="outlined" :color="colorChips">{{attribute?.attribute_name}}</v-chip>
    </v-col>
    <v-col v-if="!loading" cols="2">
      <span :class="`text-${colorScore}`">{{ attribute?.article_votes.votes_diff }}</span>
    </v-col>
    <v-col v-else cols="2" class="mr-2">
      <v-progress-circular indeterminate color="primary" :size="20" />
    </v-col>
    <v-col cols="1">
      <v-btn icon variant="flat" density="compact" @click="voteArticle('upvote')">
        <v-icon icon="mdi-arrow-up"/>
      </v-btn>
    </v-col>
    <v-col cols="1">
      <v-btn icon variant="flat" density="compact" @click="voteArticle('downvote')">
        <v-icon icon="mdi-arrow-down"/>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {voteAttribute} from "@/services/attributes";

export default {
  name: "DetailAttribute",

  props: {
    attribute: {
      type: Object,
      required: true,
    }
  },

  data(){
    return{
      loading: false,
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
  },

  methods: {
    async voteArticle(type){
      this.loading = true
      try{
        await voteAttribute({
          id_attribute: this.attribute.article_attribute.id,
          type: type
        })
      } catch (e) {
        console.log(e.message)
      } finally {
        this.$emit('refresh')
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
