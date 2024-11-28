import { ref } from "vue"; // Импортируем ref
import { defineStore } from "pinia";
import axios from "axios";
import { INGREDIENT_URL, COCTAILS_BY_INGREDIENT_URL } from "@/const/api";

export const useCounterStore = defineStore("root", () => {
  const ingredients = ref([]); // Используем ref для реактивного состояния
  const coctails = ref([]);
  async function getIngredients() {
    try {
      const response = await axios.get(INGREDIENT_URL);
      ingredients.value = response.data.drinks || [];
      console.log("Fetched ingredients:", ingredients.value);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  }
  async function getCoctails(ingradient) {
    try {
      const response = await axios.get(
        `${COCTAILS_BY_INGREDIENT_URL}${ingradient}`
      );
      coctails.value = response.data.drinks || [];
      console.log("Fetched coctails:", coctails.value);
    } catch (error) {
      console.error("Error fetching coctails:", error);
    }
  }

  return {
    ingredients,
    getIngredients,
    coctails,
    getCoctails,
  };
});
