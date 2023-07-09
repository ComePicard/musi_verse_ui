<template>
  <HeaderNavBar :search="true" />
  <v-row>
    <v-col :cols="cpNbCols" class="d-flex justify-center">
      <div :class="show_detail ? 'sideList' : 'homeList' + ' d-flex justify-center align-center flex-direction-row flex-wrap articleDiv'">
        <ArticleCard v-for="article in articles" :article="article"/>
      </div>
    </v-col>
    <v-col>
      <DetailPage v-if="show_detail" :key="detail_key"/>
    </v-col>
  </v-row>
</template>

<script>

import HeaderNavBar from "@/components/HeaderNavBar.vue";
import ArticleCard from "@/components/ArticleCard.vue";
import {Exception} from "sass";
import DetailPage from "@/views/DetailPage.vue";
export default {
  name: "HomePage",

  components: {
    DetailPage,
    HeaderNavBar,
    ArticleCard
  },

  data(){
    return {
      articles: null,
      show_detail: false,
      detail_key: 0
    }
  },

  watch: {
    $route (newValue, oldValue){
      this.show_detail = newValue.params.path !== undefined;
      if(newValue.params.path !== undefined && newValue !== oldValue) this.detail_key++
    }
  },

  computed: {
    cpNbCols(){
      return !this.show_detail ? 12 : 4
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

<style lang="scss">
.homeList{
  max-width: 70%;
  max-height: 65%;
  overflow-y: scroll;
}

.sideList{
  max-height: 32%;
  overflow-y: scroll;
}

.homeList::-webkit-scrollbar,
.sideList::-webkit-scrollbar{
  width: 10px;
}

/* Piste (background) */
.homeList::-webkit-scrollbar-track,
.sideList::-webkit-scrollbar-track{
  background-color: #050505;
}

.homeList::-webkit-scrollbar-thumb,
.sideList::-webkit-scrollbar-thumb{
  background-color: #81BEF8A0;
  border-radius: 5px;
  transition: all 2s ease-in-out;
}

.homeList::-webkit-scrollbar-thumb:hover,
.sideList::-webkit-scrollbar-thumb:hover{
  background-color: #81BEF8;
}
</style>
