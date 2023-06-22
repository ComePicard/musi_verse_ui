<template>
  <HeaderNavBar></HeaderNavBar>
  <ArticleCard desc=""></ArticleCard>
</template>

<script>

import HeaderNavBar from "@/components/HeaderNavBar.vue";
import ArticleCard from "@/components/ArticleCard.vue";
export default {
  name: "HomePage",

  components: {
    HeaderNavBar,
    ArticleCard
  }
}
</script>

<style scoped>

</style>
