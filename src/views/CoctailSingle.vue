<template>
  <AppLayout imgUrl="/src/assets/img/bg-1.jpg">
    <div class="info relative">
      <img 
        v-if="cocktail"
        src="/src/assets/img/icon/arrow-left.png" 
        class="absolute left-0 top-4 cursor-pointer" 
        alt="Back"
        @click="goBack" 
      />
      <div v-if="cocktail">
        <h1 class="title">Cocktails with {{ cocktail.strDrink }}</h1>
        <span class="line"></span>
        <div class="flex flex-col items-center gap-5">
          <img class="w-1/2 rounded-lg mx-auto" :src="cocktail.strDrinkThumb" :alt="cocktail.strDrink" />
          <ul class="flex flex-col gap-2">
            <li v-for="(ingredient, index) in ingredients" :key="index" class="flex items-center gap-2">
              <span>{{ ingredient }}</span>
            </li>
          </ul>
          <p>{{ cocktail.strInstructions }}</p>
        </div>
      </div>
      <div v-else>
        <p>Loading cocktail details...</p>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router"; // Добавляем useRouter
import AppLayout from "@/components/AppLayout.vue";
import { COCOTIL_BY_ID } from "@/const/api";
import axios from "axios";

// Получение ID из маршрута
const route = useRoute();
const id = computed(() => route.params.id);

// Рефы для данных коктейля
const cocktail = ref(null);
const ingredients = ref([]); // Список ингредиентов

// Функция для извлечения ингредиентов
function extractIngredients(cocktailData) {
  const ingredientList = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}`;
    if (cocktailData[ingredientKey]) {
      ingredientList.push(cocktailData[ingredientKey]);
    }
  }
  return ingredientList;
}

// Функция для получения коктейля по ID
async function getCoctail(id) {
  try {
    const response = await axios.get(`${COCOTIL_BY_ID}${id}`);
    cocktail.value = response.data.drinks?.[0] || null;

    if (cocktail.value) {
      ingredients.value = extractIngredients(cocktail.value); // Извлекаем ингредиенты
    }

    console.log("Fetched cocktail:", cocktail.value);
    console.log("Ingredients:", ingredients.value);
  } catch (error) {
    console.error("Error fetching cocktail:", error);
  }
}

// Загружаем данные при монтировании
onMounted(() => {
  if (id.value) {
    getCoctail(id.value);
  }
});

</script>

<style scoped>
@use "@/assets/styles/main.scss" as *;
</style>