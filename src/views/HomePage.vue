<template>
  <HeaderNavBar :search="true" />
  <div class="d-flex justify-space-around align-center flex-direction-row mx-auto flex-wrap" style="max-width: 70%; min-height: 70%;">
    <ArticleCard v-for="article in articles" :path="article.route"/>
  </div>
</template>

<script>

import HeaderNavBar from "@/components/HeaderNavBar.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import {Exception} from "sass";
export default {
  name: "HomePage",

  components: {
    HeaderNavBar,
    ArticleCard
  },

  data(){
    return {
      articles: null,
    }
  },

  async created(){
    this.articles = await this.getArticles()
  },

  methods: {
    async getArticles(){
      const response = await fetch("http://127.0.0.1:8000/articles/", {method: "GET"})
      try{
        return await response.json()
      } catch(e){
        throw new Exception(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
