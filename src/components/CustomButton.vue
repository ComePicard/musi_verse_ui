<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-btn
        v-bind="props"
        :append-icon="icon"
        :class="'varela-font ' + margin + ' ' +  getTextSize + getTextColor"
        :color="active ? 'secondary' : isHovering && level===1 ? 'secondary' : isHovering && level > 1 ? 'secondary' : 'primary'"
        :variant="getVariant"
        :elevation="level !== 3 ? 5 : 0"
        :size="size"
        :disabled="disabled"
        @click="$emit('action')"
      >
        {{ content }}
      </v-btn>
    </template>
  </v-hover>
</template>

<script>
export default {
  name: "CustomButton",

  props:{
    content: {
      type: String,
      default: "",
    },

    level:{
      type: Number,
      default: 1,
    },

    icon: {
      type: String,
      default: "mdi-arrow-right",
    },

    active: {
      type: Boolean,
      default: false,
    },

    size:{
      type: String,
      default: 'large'
    },

    margin: {
      type: String,
      default: ''
    },

    disabled: {
      type: Boolean,
      default: false,
    }
  },

  computed:{

    getTextColor(){
      return this.level === 2 || this.level === 3 ? "text-primary" : null
    },

    getTextSize(){
    return this.level === 1 ? "text-body-1 " : "text-h6 "
    },

    getVariant(){
      switch (this.level) {
        case 1 :
          return 'elevated'

        case 2 :
          return 'outlined'

        case 3 :
          return 'text'
      }
      return ""
    },

    getColor(){
      return this.level === 1 ? 'primary' : null
    },
  },

  methods: {

  }
}
</script>

<style lang="scss">
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
