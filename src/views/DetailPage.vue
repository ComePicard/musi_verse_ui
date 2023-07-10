<template>
  <v-row class="mt-2 mx-1">
    <v-col cols="7">
      <v-card>
        <v-card-title class="d-flex flex-direction-row align-center justify-lg-space-between">
          <v-btn icon variant="flat" @click="$router.push('/')">
            <v-icon icon="mdi-arrow-right" color="primary"/>
          </v-btn>
          {{ article_data?.name }}
          <v-chip>
            {{ article_data?.categories }}
          </v-chip>
        </v-card-title>
        <v-row class="ma-2">
          <v-col cols="7">
            {{ article_data?.description }}
          </v-col>
          <v-col cols="5">
            <v-row>
              <v-img src="@/assets/piana_test.jpg" height="250px"></v-img>
            </v-row>
            <v-row class="pt-4" justify="center">
              Price range : <br/> {{ `${article_data?.price_range[0]} - ${article_data?.price_range[1]}€` }}
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="space-around" class="mt-12 mb-6">
          <v-col cols="5">
            <v-row class="mb-1">
              Avantages :
            </v-row>
            <v-row v-for="article in getPros" class="mb-1">
              <detail-attribute
                :attribute="article"
              />
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-row class="mb-1">
              Inconvénients :
            </v-row>
            <v-row v-for="article in getCons" class="mb-1">
              <detail-attribute
                :attribute="article"
              />
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="5">
      <v-row>
        <v-col>
          <v-textarea variant="solo-filled" bg-color="background" label="Rédiger un commentaire..." v-model="commentaire_content"></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters justify="end">
        <v-col cols="3">
          <custom-button content="Poster" @action="postCommentaire()"></custom-button>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="!loading_commentaire">
          <DetailCommentaire v-for="commentaire in commentaires" :commentaire="commentaire"/>
        </v-col>
        <v-col v-else>
          <v-progress-circular indeterminate/>
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
import DetailCommentaire from "@/components/DetailCommentaire.vue";

export default defineComponent({
  name: "DetailPage",

  components: {
    DetailCommentaire,
    DetailAttribute,
    CustomButton,
    HeaderNavBar,
  },

  // TODO : faire le loading
  data() {
    return {
      article: {},
      article_data: null,
      article_attributes: [],
      commentaire_content: "",
      commentaires: [],
      loading_commentaire: false,
    }
  },

  computed: {
    getPros() {
      return this.article_attributes.filter(attr => attr.article_attribute.attribute_type === "pros")
    },

    getCons() {
      return this.article_attributes.filter(attr => attr.article_attribute.attribute_type === "cons")
    }
  },

  async created() {
    this.article = await this.getArticle()
    this.commentaires = await this.getCommentaires()
    this.article_data = this.article[0]
    this.article_attributes = toRaw(this.article[1])
  },

  methods: {
    async getArticle() {
      console.log(this.$route.params)
      const response = await fetch(`http://127.0.0.1:8000/articles/${this.$route.params.path}`, {method: "GET"})
      try {
        return await response.json()
      } catch (e) {
        throw new Exception(e)
      }
    },

    async getCommentaires() {
      console.log(this.$route.params)
      const response = await fetch(`http://127.0.0.1:8000/articles/${this.$route.params.path}/comments/`, {method: "GET"})
      try {
        return await response.json()
      } catch (e) {
        throw new Exception(e)
      }
    },

    async postCommentaire(){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5ODQ4NDA4LCJpYXQiOjE2ODg5ODQ0MDgsImp0aSI6ImQ1OGI4YWM3MzhmYjQzZDRhZmI2ZjZhMDc2MjU3MjhiIiwidXNlcl9pZCI6Mn0.7oOfuBpNYF4UhpUVQCwpg_ay1gHPYSxB1_SK1DeCKNk");

      var formdata = new FormData();
      formdata.append("description", this.commentaire_content);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      try {
        let response = await fetch(`http://127.0.0.1:8000/articles/${this.$route.params.path}/comments/`, requestOptions)
        this.commentaire_content = ""
        this.loading_commentaire = true
        this.commentaires = await this.getCommentaires()
      } catch(e) {
        console.error(e)
      } finally {
        this.loading_commentaire = false
      }
    }
  }
})
</script>
