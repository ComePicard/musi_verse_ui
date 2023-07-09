<template>
  <v-expand-x-transition>
    <v-hover v-slot="{ isHovering, props }">
      <v-card v-bind="props" width="500" class="mt-5 mx-4">
        <v-toolbar :color="isHovering ? 'secondary' : 'primary'" class="pl-2">
          {{ article_data?.name }}
        </v-toolbar>
        <v-row class="pa-2">
          <v-col cols="5">
            <v-img src="@/assets/piana_test.jpg" height="200" style="border-radius: 10px;"></v-img>
          </v-col>
          <v-col cols="7">
            <v-row class="mt-2">
              <v-col>
                <v-chip>
                  {{ article_data.categories }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-chip v-show="getFirstPros!==null" variant="outlined" color="success"
                        prepend-icon="mdi-chevron-double-up" size="large"
                        class="font-weight-bold">
                  {{ getFirstPros }}
                </v-chip>
              </v-col>
              <v-col cols="6">
                <v-chip v-show="getFirstCons!==null" variant="outlined" color="error"
                        prepend-icon="mdi-chevron-double-down" size="large"
                        class="font-weight-bold">
                  {{ getFirstCons }}
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="10" class="d-flex justify-end">
            <v-chip class="mt-1" prepend-icon="mdi-eye-outline">{{ article_data?.views }}</v-chip>
            <v-chip class="mx-2 mt-1" prepend-icon="mdi-comment-text-outline">22</v-chip>
            <custom-button
              content="Voir plus"
              :level="2"
              margin="mb-2 mr-2"
              @action="redirect()"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
  </v-expand-x-transition>
</template>

<script>
import CustomButton from './CustomButton.vue';
import {toRaw} from "vue";

export default {
  name: 'ArticleCard',

  components: {
    CustomButton
  },

  props: {
    article: {type: Array, required: true},
    types: {type: Array, default: ["Instrument", "Corde", "Piano"]},
  },

  data() {
    return {
      article_data: null,
      article_attributes: null,
    }
  },

  computed: {
    getFirstPros() {
      let stock_vote = 0
      let attribute_to_return = null
      this.article_attributes?.forEach((attribute) => {
        let attr = toRaw(attribute)
        if (attr.article_attribute.attribute_type === "pros") {
          attribute_to_return = stock_vote <= attr.article_votes.votes_diff ? attr.attribute_name : null
          stock_vote = stock_vote < attr.article_votes.votes_diff ? attr.article_votes.votes_diff : stock_vote
          console.log(attribute_to_return)
        }
      })
      return attribute_to_return
    },

    getFirstCons() {
      let stock_vote = 0
      let attribute_to_return = null
      this.article_attributes?.forEach((attribute) => {
        let attr = toRaw(attribute)
        if (attr.article_attribute.attribute_type === "cons") {
          attribute_to_return = stock_vote <= attr.article_votes.votes_diff ? attr.attribute_name : null
          stock_vote = stock_vote < attr.article_votes.votes_diff ? attr.article_votes.votes_diff : stock_vote
        }
      })
      return attribute_to_return
    }
  },

  async created() {
    this.article_data = toRaw(this.article[0])
    this.article_attributes = this.article[1]
  },

  methods: {
    redirect() {
      this.$router.push(`/article/${this.article_data.route}`)
    }
  },
}
</script>

<style>
@font-face {
  font-family: 'Varela Round';
  src: url('@/assets/VarelaRound-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.varela-font {
  font-family: 'Varela Round', sans-serif !important;
}
</style>
