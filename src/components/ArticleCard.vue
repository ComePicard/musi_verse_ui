<template>
  <v-hover v-slot="{ isHovering, props }">
      <v-card v-bind="props" width="500">
        <v-toolbar :color="isHovering ? 'secondary' : 'primary'" class="pl-2">
          {{ nom }}
        </v-toolbar>
        <v-row class="pa-2">
          <v-col cols="5">
            <v-img src="@/assets/piana_test.jpg" height="200" style="border-radius: 10px;"></v-img>
          </v-col>
          <v-col cols="7">
            <v-row class="mt-2">
              <v-col>
                <v-chip-group>
                  <v-chip v-for="type in types" :key="type">
                    {{ type }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-chip variant="outlined" color="success" prepend-icon="mdi-chevron-double-up" size="large" class="font-weight-bold">
                  Souple
                </v-chip>
              </v-col>
              <v-col cols="6">
                <v-chip variant="outlined" color="error" prepend-icon="mdi-chevron-double-down" size="large" class="font-weight-bold">
                  Étouffé
                </v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="10" class="d-flex justify-end">
            <v-chip class="mt-1" prepend-icon="mdi-eye-outline">155</v-chip>
            <v-chip class="mx-2 mt-1" prepend-icon="mdi-comment-text-outline">22</v-chip>
            <custom-button content="Voir plus" :level="2" margin="mb-2 mr-2"/>
          </v-col>
        </v-row>
      </v-card>
  </v-hover>
</template>

<script>
import CustomButton from './CustomButton.vue';

export default{
  name: 'ArticleCard',

  components:{
    CustomButton
  },

  props:{
    nom:{ type: String, default: "Yamaha Baby Grand"},
    img:{ type: String },
    types:{ type: Array, default: ["Instrument", "Corde", "Piano"]},
    desc:{ type: String, required: true}
  },

  data(){
    return{

    }
  }
}
</script>

<style>
@font-face {
  font-family: 'Varela Round';
  src: url('~@/assets/VarelaRound-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.varela-font{
  font-family: 'Varela Round', sans-serif !important;
}
</style>
