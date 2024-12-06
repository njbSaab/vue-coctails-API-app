<template>
  <AppLayout imgUrl="/src/assets/img/bg-1.jpg">
    <!-- Первый блок: выбор ингредиента -->
    <div class="info" v-if="!rootStore.ingredient && rootStore.coctails.length === 0">
      <h1 class="title">Choose your drink</h1>
      <span class="line"></span>
      <div class="select-wrapper pb-5">
        <!-- el-select связывается с selectedValue и вызывает getCoctails при изменении -->
        <el-select 
          v-model="selectedValue" 
          placeholder="Select an ingredient" 
          style="width: 240px" 
          @change="handleSelectChange"
          filterable
          allow-create
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      
      <p class="subtitle">
        Try our delicious cocktail recipes for every occasion. Find delicious
        cocktail recipes by ingredient through our cocktail generator.
      </p>
      <img src="/src/assets/img/coctails.png" alt="">
    </div>

    <!-- Второй блок: коктейли -->
    <div class="info relative" v-else>
      <img 
        src="/src/assets/img/icon/arrow-left.png" 
        class="absolute left-0 top-4 cursor-pointer" 
        alt="Back"
        @click="clearSelection" 
      />
      <h1 class="title">Cocktails with {{ rootStore.ingredient }}</h1>
      <span class="line"></span>
      <div class="coctails">
        <div class="cocktail-list" v-if="rootStore.coctails.length > 0">
          <CoctailsThumbs 
            v-for="cocktail in rootStore.coctails" 
            :key="cocktail.idDrink" 
            :cocktail="cocktail" 
          />
        </div>
        <div v-else>
          <p>No cocktails found for {{ rootStore.ingredient }}.</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCounterStore } from "@/stores/root";
import AppLayout from "@/components/AppLayout.vue";
import CoctailsThumbs from "@/components/CoctailsThumbs.vue";

// Accessing the Pinia store
const rootStore = useCounterStore();
const selectedValue = ref(null); // Bind value for el-select

// Computed property to map ingredients to el-option format
const options = computed(() => {
  return rootStore.ingredients.map((ingredient) => ({
    label: ingredient.strIngredient1, // Displayed label
    value: ingredient.strIngredient1, // Selected value
  }));
});

// Fetch ingredients on component mount
onMounted(() => {
  rootStore.getIngredients();
});

// Handle selection change and fetch cocktails
function handleSelectChange(value) {
  if (value) {
    rootStore.setIngredient(value); // Save the selected ingredient
    rootStore.getCoctails(value); // Fetch cocktails
  }
}

// Clear the selected ingredient
function clearSelection() {
  selectedValue.value = null;
  rootStore.setIngredient(null); // Reset ingredient in the store
  rootStore.coctails = []; // Clear the cocktails list
}
</script>

<style scoped>
@use "@/assets/styles/main.scss" as *;

.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.cursor-pointer {
  cursor: pointer;
}
</style>