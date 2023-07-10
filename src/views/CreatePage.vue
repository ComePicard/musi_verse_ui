<template>
  <HeaderNavBar/>
  <v-row justify="center" class="pt-5">
    <v-col cols="8">
      <v-card>
        <v-card-title class="my-5">
          Renseigner les informations de l'article
        </v-card-title>
        <v-row justify="center">
          <v-col cols="5">
            <v-text-field
              v-model="title"
              label="Titre"
              bg-color="background"
              variant="solo-filled"></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-select
              v-model="article_categories"
              :items="categories"
              label="Catégorie"
              bg-color="background"
              variant="solo-filled">
            </v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-textarea

              v-model="description"
              label="Description"
              bg-color="background"
              variant="solo-filled"></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="10">
            <v-range-slider
              label="Echelle de prix"
              v-model="price_range"
              :max="2000"
              :min="0"
              :step="50"
              hide-details
              class="align-center"
              track-fill-color="primary"
              track-size="6px"
              thumb-size="0"
            >
              <template v-slot:prepend>
                <v-text-field
                  :model-value="price_range[0]"
                  hide-details
                  single-line
                  type="number"
                  variant="outlined"
                  density="compact"
                  style="width: 110px"
                  @change="$set(price_range, 0, $event)"
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  :model-value="price_range[1]"
                  hide-details
                  single-line
                  type="number"
                  variant="outlined"
                  style="width: 110px"
                  density="compact"
                  @change="$set(price_range, 1, $event)"
                ></v-text-field>
              </template>
            </v-range-slider>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="5">
            <v-select
              v-model="article_pros"
              :items="attributes"
              item-title="content"
              item-value="id"
              multiple
              label="pros"
              bg-color="background"
              variant="solo-filled"></v-select>
          </v-col>
          <v-col cols="5">
            <v-select
              v-model="article_cons"
              :items="attributes"
              item-title="content"
              item-value="id"
              multiple
              label="cons"
              bg-color="background"
              variant="solo-filled"></v-select>
          </v-col>
        </v-row>
        <v-row v-if="message_error" justify="center">
          <v-col cols="10">
            <v-alert closable class="text-center" color="error">
              {{ message_error }}
            </v-alert>
          </v-col>
        </v-row>
        <v-card-actions class="mt-5">
          <v-row justify="space-between" class="mx-16">
            <v-col cols="3">
              <custom-button
                :level="3"
                icon="mdi-arrow-u-left-top"
                content="Annuler"
                @action="go_back()"
              >
              </custom-button>
            </v-col>
            <v-col cols="3" class="d-flex justify-end">
              <custom-button
                :level="2"
                icon="mdi-send"
                content="Publier"
                @action="save()"
              >
              </custom-button>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import {defineComponent} from 'vue'
import HeaderNavBar from "@/components/HeaderNavBar.vue";
import customButton from "@/components/CustomButton"
import {postArticle} from "@/services/articles";
import {getAttributes, linkAttribute} from "@/services/attributes";

export default defineComponent({
  name: "CreatePage",

  components: {
    HeaderNavBar,
    customButton
  },

  data() {
    return {
      title: "",
      categories: [
        "Cordes frappées",
        "Cordes pincées",
        "Cordes frottées",
        "Vents",
        "Percussions",
        "Autres",
      ],
      article_categories: [],
      description: "",
      attributes: [],
      article_pros: [],
      article_cons: [],
      price_range: [150, 250],
      message_error: "",
    }
  },

  async created() {
    await this.getAttributes()
  },

  methods: {
    async getAttributes() {
      this.message_error = ""
      try {
        this.attributes = await getAttributes()
      } catch (e) {
        this.message_error = e.message
      }
    },

    go_back() {
      this.$router.back()
    },

    async save() {
      this.message_error = ""
      try {
        let article = await postArticle({
          title: this.title,
          article_categories: this.article_categories,
          description: this.description,
          price_range: this.price_range,
        })
        for (let attribute of this.article_cons) {
          await linkAttribute({
            id_attribute: attribute,
            id_article: article.id,
            attribute_type: "cons"
          })
        }
        for (let attribute of this.article_pros) {
          await linkAttribute({
            id_attribute: attribute,
            id_article: article.id,
            attribute_type: "pros"
          })
        }
        this.$router.push("/")
      } catch (e) {
        this.message_error = e.message
      }
    }
  }
})
</script>
