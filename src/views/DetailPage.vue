<template>
  <v-row class="mt-2 mx-1">
    <v-col cols="7">
      <v-card>
        <v-card-title class="d-flex flex-direction-row align-center justify-lg-space-between">
          <v-btn icon variant="flat" @click="$router.push('/')">
            <v-icon icon="mdi-arrow-right" color="primary"/>
          </v-btn>
            {{article_data?.name}}
          <v-chip>
            {{article_data?.categories}}
          </v-chip>
        </v-card-title>
        <v-row class="ma-2">
          <v-col cols="7">
            {{article_data?.description}}
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-img src="@/assets/piana_test.jpg" height="250px"></v-img>
            </v-row>
            <v-row class="pt-4" justify="center">
              Price range : <br/> {{ `${article_data?.price_range[0]} - ${article_data?.price_range[1]}€`}}
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="space-around" class="mt-12 mb-6">
          <v-col cols="5">
            <v-row>
              Avantages :
              <detail-attribute :attribute="article?.article_attributes[0]"/>
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-row>
              Inconvénients :
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="5">
      <v-row>
        <v-col>
          <v-textarea variant="solo-filled" bg-color="background" label="Rédiger un commentaire..."></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters justify="end">
        <v-col cols="3">
          <custom-button content="Poster"></custom-button>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>Liste des commentaires</v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {defineComponent, toRaw} from 'vue'
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import CustomButton from "@/components/CustomButton.vue";
import DetailAttribute from "@/components/DetailAttribute.vue";
export default defineComponent({
  name: "DetailPage",

  components: {
    DetailAttribute,
    CustomButton,
    HeaderNavBar,
  },

  data(){
    return {
      article: null,
      article_data: null,
      article_attributes: null,
    }
  },

  async created(){
    this.article = await this.getArticle()
    this.article_data = this.article[0]
    this.article_attributes = toRaw(this.article[1])
  },

  methods: {
    async getArticle(){
      console.log(this.$route.params)
      const response = await fetch(`http://127.0.0.1:8000/articles/${this.$route.params.path  }`, {method: "GET"})
      try {
        return await response.json()
      }catch (e){
        throw new Exception(e)
      }
    }
  }
})
</script>
