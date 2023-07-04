<template>
  <v-card background="white">
    {{ article?.name }}
  </v-card>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "DetailPage",

  data(){
    return {
      article: null,
    }
  },

  async created(){
    this.article = await this.getArticle()
  },

  methods: {
    async getArticle(){
      console.log(this.$route.params)
      const response = await fetch(`http://127.0.0.1:8000/article/${this.$route.params.path  }`, {method: "GET"})
      try {
        return await response.json()
      }catch (e){
        throw new Exception(e)
      }
    }
  }
})
</script>
