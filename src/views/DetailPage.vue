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
              <v-col class="d-flex align-center">
                Avantages :
              </v-col>
              <v-col cols="3" class="d-flex align-center justify-end">
                <v-btn
                  icon
                  variant="flat"
                  size="small"
                  title="Cliquez pour ajouter un avantage"
                  @click="show_add_pros = !show_add_pros"
                >
                  <v-icon :icon="show_add_pros ? 'mdi-minus' : 'mdi-plus'"/>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="show_add_pros" no-gutters justify="space-between">
              <v-col cols="7">
                <v-select
                  v-model="pros_to_add"
                  density="compact"
                  variant="solo-filled"
                  :items="list_attributes"
                  item-title="content"
                  item-value="id"
                >
                </v-select>
              </v-col>
              <v-col cols="4" class="mt-1">
                <custom-button
                  :level="1"
                  content="Ajouter"
                  icon="mdi-plus"
                  size="small"
                  :disabled="pros_to_add === null"
                  @action="linkPros()"/>
              </v-col>
            </v-row>
            <v-row v-if="!loading_pros" :class="'mb-1 ' + (show_add_pros ? 'attribute_list_add' : 'attribute_list')">
              <v-col cols="12">
                <detail-attribute
                  v-for="article in getPros"
                  :attribute="article"
                />
              </v-col>
            </v-row>
            <v-row v-else class="mb-1 d-flex align-center justify-center">
              <v-progress-circular indeterminate/>
            </v-row>
          </v-col>
          <v-col cols="5">
            <v-row class="mb-1">
              <v-col class="d-flex align-center">
                Inconvénients :
              </v-col>
              <v-col cols="3" class="d-flex align-center justify-end">
                <v-btn
                  icon
                  variant="flat"
                  size="small"
                  title="Cliquez pour ajouter un inconvénient"
                  @click="show_add_cons = !show_add_cons"
                >
                  <v-icon :icon="show_add_cons ? 'mdi-minus' : 'mdi-plus'"/>
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="show_add_cons" no-gutters justify="space-between">
              <v-col cols="7">
                <v-select
                  v-model="cons_to_add"
                  density="compact"
                  variant="solo-filled"
                  :items="list_attributes"
                  item-title="content"
                  item-value="id"
                >
                </v-select>
              </v-col>
              <v-col cols="4" class="mt-1">
                <custom-button
                  :level="1"
                  content="Ajouter"
                  icon="mdi-plus"
                  size="small"
                  :disabled="cons_to_add === null"
                  @action="linkCons()"/>
              </v-col>
            </v-row>
            <v-row v-if="!loading_cons" :class="'mb-1 ' + (show_add_cons ? 'attribute_list_add' : 'attribute_list')">
              <v-col cols="12">
                <detail-attribute
                  v-for="article in getCons"
                  :attribute="article"
                />
              </v-col>
            </v-row>
            <v-row v-else class="mb-1 d-flex align-center justify-center">
              <v-progress-circular indeterminate/>
            </v-row>
          </v-col>
        </v-row>
        <v-alert v-if="article_error" color="error" closable class="text-center">{{ article_error }}</v-alert>
      </v-card>
    </v-col>
    <v-col cols="5">
      <v-row>
        <v-col>
          <v-textarea variant="solo-filled" bg-color="background" label="Rédiger un commentaire..."
                      v-model="commentaire_content"></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters justify="end">
        <v-col cols="9">
          <span v-if="commentaire_error!==null" class="text-error">{{ commentaire_error }}</span>
        </v-col>
        <v-col cols="3" class="d-flex align-center justify-end">
          <custom-button content="Poster" @action="postCommentaire()" :disabled="commentaire_content === ''"
                         icon="mdi-send"></custom-button>
        </v-col>
      </v-row>
      <v-row class="commentaire_list">
        <v-col v-if="!loading_commentaire && commentaires.length!==0">
          <DetailCommentaire v-for="commentaire in commentaires" :commentaire="commentaire"/>
        </v-col>
        <v-col v-else-if="commentaires.length === 0" class="d-flex align-center justify-center mt-4">
          <span>Pas encore de commentaire, soyez le premier à en poster un !</span>
        </v-col>
        <v-col v-else class="d-flex align-center justify-center mt-4">
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
import {getArticle} from "@/services/articles";
import {getCommentaires, postCommentaire} from "@/services/commentaires";
import {getAttributes, linkAttribute} from "@/services/attributes";

export default defineComponent({
  name: "DetailPage",

  components: {
    DetailCommentaire,
    DetailAttribute,
    CustomButton,
    HeaderNavBar,
  },

  data() {
    return {
      article: {},
      article_data: null,
      article_attributes: [],
      commentaire_content: "",
      commentaires: [],
      loading_commentaire: false,
      loading_article: false,
      commentaire_error: "",
      article_error: "",
      list_attributes: [],
      pros_to_add: null,
      cons_to_add: null,
      loading_pros: false,
      loading_cons: false,
      show_add_pros: false,
      show_add_cons: false,
    }
  },

  computed: {
    getPros() {
      return this.article_attributes.filter(attr => attr.article_attribute.attribute_type === "pros")
    },

    getCons() {
      return this.article_attributes.filter(attr => attr.article_attribute.attribute_type === "cons")
    },
  },

  async created() {
    await this.loadData()
    await this.getCommentaires()
    await this.getAttributes()
  },

  methods: {
    async loadData() {
      await this.getArticle()
      this.article_data = this.article[0]
      this.article_attributes = toRaw(this.article[1])
    },

    async getArticle() {
      this.commentaire_error = true
      this.loading_article = true
      try {
        this.article = await getArticle({path: this.$route.params.path})
        console.log(this.article)
      } catch (e) {
        this.article_error = e.message
      } finally {
        this.loading_article = false
      }
    },

    async getCommentaires() {
      this.commentaire_error = ""
      this.loading_commentaire = true
      try {
        this.commentaires = await getCommentaires({path: this.$route.params.path})
      } catch (e) {
        this.commentaire_error = e.message
      } finally {
        this.loading_commentaire = false
      }
    },

    async postCommentaire() {
      this.commentaire_error = ""
      this.loading_commentaire = true
      try {
        await postCommentaire({
          path: this.$route.params.path,
          content: this.commentaire_content
        })
        await this.getCommentaires()
      } catch (e) {
        this.commentaire_error = e.message
      } finally {
        this.loading_commentaire = false
      }
    },

    async getAttributes() {
      this.article_error = ""
      try {
        this.list_attributes = await getAttributes()
      } catch (e) {
        this.article_error = e.message
      }
    },

    async linkPros() {
      this.article_error = ""
      this.loading_pros = true
      try {
        await linkAttribute({
          id_attribute: this.pros_to_add,
          attribute_type: "pros",
          id_article: this.article_data.id
        })
        await this.loadData()
      } catch (e) {
        this.article_error = e.message
      } finally {
        this.pros_to_add = null
        this.loading_pros = false
      }
    },

    async linkCons() {
      this.article_error = ""
      this.loading_cons = true
      try {
        await linkAttribute({
          id_attribute: this.cons_to_add,
          attribute_type: "cons",
          id_article: this.article_data.id
        })
        await this.loadData()
      } catch (e) {
        this.article_error = e.message
      } finally {
        this.cons_to_add = null
        this.loading_cons = false
      }
    }
  }
})
</script>

<style>
.commentaire_list {
  max-height: 50vh;
  overflow-y: auto;
}

.attribute_list_add {
  max-height: 12vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.attribute_list {
  max-height: 19vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.attribute_list_add::-webkit-scrollbar,
.attribute_list::-webkit-scrollbar,
.commentaire_list::-webkit-scrollbar {
  width: 7px;
}


.attribute_list_add::-webkit-scrollbar-track,
.attribute_list::-webkit-scrollbar-track,
.commentaire_list::-webkit-scrollbar-track {
  background-color: #050505;
  border-radius: 5px;
}

.attribute_list_add::-webkit-scrollbar-thumb,
.attribute_list::-webkit-scrollbar-thumb,
.commentaire_list::-webkit-scrollbar-thumb {
  background-color: #81BEF8A0;
  border-radius: 5px;
  transition: all 2s ease-in-out;
}

.attribute_list_add::-webkit-scrollbar-thumb:hover,
.attribute_list::-webkit-scrollbar-thumb:hover,
.commentaire_list::-webkit-scrollbar-thumb:hover {
  background-color: #81BEF8;
}
</style>
