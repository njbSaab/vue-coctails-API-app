import { ref } from "vue"; // Импортируем ref
import { defineStore } from "pinia";
import axios from "axios";
import { INGREDIENT_URL, COCTAILS_BY_INGREDIENT_URL } from "@/const/api";

export const useCounterStore = defineStore("root", () => {
  const ingredients = ref([]); // Список ингредиентов
  const coctails = ref([]); // Список коктейлей
  const ingredient = ref(null); // Выбранный ингредиент

  // Функция для получения списка ингредиентов
  async function getIngredients() {
    try {
      const response = await axios.get(INGREDIENT_URL);
      ingredients.value = response.data.drinks || [];
      console.log("Fetched ingredients:", ingredients.value);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  }

  // Функция для получения списка коктейлей по ингредиенту
  async function getCoctails(selectedIngredient) {
    try {
      const response = await axios.get(
        `${COCTAILS_BY_INGREDIENT_URL}${selectedIngredient}`
      );
      coctails.value = response.data.drinks || [];
      ingredient.value = selectedIngredient; // Сохраняем выбранный ингредиент
      console.log("Fetched coctails:", coctails.value);
    } catch (error) {
      console.error("Error fetching coctails:", error);
    }
  }

  // Функция для установки выбранного ингредиента
  function setIngredient(selectedIngredient) {
    ingredient.value = selectedIngredient;
    console.log("Set ingredient:", ingredient.value);
  }

  return {
    ingredients,
    getIngredients,
    coctails,
    getCoctails,
    ingredient,
    setIngredient,
  };
});
