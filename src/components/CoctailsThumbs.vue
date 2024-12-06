<template>
  <div class="root">
    <RouterLink :to="`/coctail/${cocktail.idDrink}`">
      <div class="cocktail-thumb flex flex-col items-center pb-5 cursor-pointer">
        <img :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" />
        <h2>{{ cocktail.strDrink }}</h2>
      </div>
   </RouterLink>
  </div>

  </template>
  
  <script setup>
  defineProps({
    cocktail: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  @use "@/assets/styles/main.scss" as *;
  
  </style>