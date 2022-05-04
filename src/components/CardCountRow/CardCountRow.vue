<template>
  <div class="fact-listing_row-count" v-if="hasFactItems">
    Listing {{ itemCount }} facts
  </div>
  <div class="fact-listing" v-if="!hasFactItems">Empty Facts</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import type FactItem from "@/types/FactItem";
import type Favorites from "@/types/Favorites";

export default defineComponent({
  name: "FactCard",
  props: {
    factItems: {
      required: true,
      type: Array as PropType<FactItem[]>,
    },
    favoriteList: {
      required: true,
      type: Array as PropType<Favorites[]>,
    },
    itemCount: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    const itemCount = computed(() => {
      return props.factItems.length;
    });

    const hasFactItems = computed(() => {
      return props.itemCount !== 0;
    });

    return { hasFactItems, itemCount };
  },
});
</script>

<style scoped>
.fact-listing_row-count {
  max-width: 1024px;
  margin: 1px auto;
  text-align: right;
  font-size: 1rem;
  padding: 0 60px;
  font-weight: 600;
  margin-bottom: -10px;
}

@media screen and (max-width: 550px) {
  .list-wrapper {
    flex-direction: column;
  }

  .fact-listing_row-count {
    text-align: center;
  }
}
</style>
