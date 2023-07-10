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
              multiple
              label="cons"
              bg-color="background"
              variant="solo-filled"></v-select>
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
                icon="mdi-content-save"
                content="Enregister"
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
      price_range: [150, 250]
    }
  },

  async created(){
    this.attributes = await this.getAttributes()
  },

  methods: {
    async getAttributes(){
      try{
        const response = await fetch("http://127.0.0.1:8000/attributes/", {method: "GET"})
        return await response.json()
      } catch(e){
        return console.error(e)
      }
    },

    go_back(){
      this.$router.back()
    },

    async save(){
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Authorization\", \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5ODQ4NDA4LCJpYXQiOjE2ODg5ODQ0MDgsImp0aSI6ImQ1OGI4YWM3MzhmYjQzZDRhZmI2ZjZhMDc2MjU3MjhiIiwidXNlcl9pZCI6Mn0.7oOfuBpNYF4UhpUVQCwpg_ay1gHPYSxB1_SK1DeCKNk");

      var formdata = new FormData();
      formdata.append("name", this.title);
      formdata.append("categories", this.article_categories);
      formdata.append("description", this.description);
      formdata.append("price_range", `{${this.price_range}}`);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/articles/", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
  }
})
</script>
