<template>
  <HeaderNavBar />
  <v-row class="mt-2 mx-1">
    <v-col cols="9">
      <v-card>
        <v-card-title class="d-flex flex-row justify-space-between">
          {{article?.name}}
          <v-chip-group>

          </v-chip-group>
        </v-card-title>
        <v-row class="pa-2">
          <v-col cols="7">
            {{article?.descritpion}}
          </v-col>
          <v-col colrs="5">
            <v-row>
              <v-img src="@/assets/piana_test.jpg" height="250px"></v-img>
            </v-row>
            <v-row>
              Price range : <br/> 15 - 35€
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="3">
      <v-row>
        <v-col>
          <v-card>pastèque</v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>Capibara</v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {defineComponent} from 'vue'
import HeaderNavBar from "@/components/HeaderNavBar.vue";
export default defineComponent({
  name: "DetailPage",

  components: {
    HeaderNavBar,
  },

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
