<template>
  <div class="app">
    <header>
      <div class="title">
        <img src="./assets/images/cat.png" alt="app logo" />
        <h1>Cat Facts</h1>
      </div>
      <div class="order">
        <button class="ctaAddToList" @click.prevent="handleAddFact()">
          {{ btnTitleText }}
        </button>
      </div>
    </header>

    <FactCard :factItems="factItems" :updateFavList="updateFavList" :favoriteList="favoriteList" :filteredFactItems="filteredFactItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

import FactCard from "@/components/FactCard/FactCard.vue";
import type FactItem from "@/types/FactItem";
import type Favorites from "@/types/Favorites";

export default defineComponent({
  name: "App",
  components: {
    FactCard,
  },
  setup() {
    let factItems = ref<FactItem[]>([]);
    let favoriteList = ref<Favorites[]>([]);
    let filteredFactItems = ref<FactItem[]>([]);
    let isLoading: boolean;

    const handleAddFact = async () => {
      try {
        isLoading = true;
        const response = await fetch("https://catfact.ninja/fact");

        const data = await response.json();
        const isExisting = [...factItems.value].filter(
          (item) => item.fact === data.fact
        ).length;

        if (!isExisting)
          await factItems.value.unshift({ ...data, isFavorite: false });

        isLoading = false;
      } catch (error) {
        isLoading = false;
        console.error(error);
      }
    };

    const updateFavList = (data: FactItem) => {
      favoriteList.value.unshift({fact: data.fact});
      const dIndex = factItems.value.findIndex((item) => {
        return item.fact === data.fact;
      })

      factItems.value.splice(dIndex, 1, {...data, isFavorite: true, count: 1})
    }

    const btnTitleText = computed(() => {
      return factItems.value.length < 1
        ? "Add a fact to list"
        : "Add one more fact to list";
    });

    return { factItems, btnTitleText, handleAddFact, updateFavList, favoriteList, filteredFactItems };
  },
});
</script>

<style>
header {
  text-align: center;
  margin-top: 10px;
}
header .order {
  margin: 20px 10px;
  display: flex;
  justify-content: center;
}
button.ctaAddToList {
  margin: 0 10px;
  color: #1195c9;
  border: 3px solid #c1d8e5;
  background: #d5f0ff;
  padding: 15px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: capitalize;
}
header .title {
  display: flex;
  justify-content: center;
  align-items: center;
}
header img {
  width: auto;
  height: 85px;
  margin-right: 20px;
}
header h1 {
  font-size: 4.5rem;
  font-family: HyliaSerif;
  letter-spacing: 4px;
}

@media screen and (max-width: 550px) {
  header img {
    width: auto;
    height: 55px;
    margin-right: 10px;
  }
  header h1 {
    font-size: 2.5rem;
  }

  .fact-listing {
    margin-top: 10px !important;
  }
}
@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }

  button.ctaAddToList:hover {
    border-color: #1195c9;
    transition: all 1s;
  }
}
</style>
