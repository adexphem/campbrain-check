<template>
  <div class="fact-listing" v-if="hasFactItems">
    <CardCountRow
      :factItems="factItems"
      :itemCount="itemCount"
      :favoriteList="favoriteList"
    />

    <transition-group name="list" tag="ul" class="list-wrapper">
      <li v-for="item in factItems" :key="item.length" class="cards">
        <div
          class="addToFavorite"
          :class="item.isFavorite ? 'isFavorite' : ''"
          @click="handleUpdateFavorite(item)"
        >
          <div v-if="item?.count" class="favoriteCount"><span>{{item?.count}}</span></div>
          <img src="@/assets/images/heart.svg" alt="favorite" />
        </div>
        <h2 v-snip="{ lines: 3 }">{{ item.fact }}</h2>
      </li>
    </transition-group>
  </div>

  <div v-if="!hasFactItems">
    <EmptyFactCard />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import EmptyFactCard from "./Empty.vue";
import CardCountRow from "@/components/CardCountRow/CardCountRow.vue";

import type FactItem from "@/types/FactItem";
import type Favorites from "@/types/Favorites";

export default defineComponent({
  name: "FactCard",
  components: {
    EmptyFactCard,
    CardCountRow,
  },
  props: {
    factItems: {
      required: true,
      type: Array as PropType<FactItem[]>,
    },
    filteredFactItems: {
      required: true,
      type: Array as PropType<FactItem[]>,
    },
    favoriteList: {
      required: true,
      type: Array as PropType<Favorites[]>,
    },
    updateFavList: {
      required: true,
      type: Function,
    },
  },
  setup(props) {
    const hasFactItems = computed(() => {
      return props.factItems.length !== 0;
    });

    const itemCount = computed(() => {
      return props.factItems.length;
    });

    const handleUpdateFavorite = (param: FactItem) => {
      const favCount = props.favoriteList.filter((item) => item.fact === param.fact).length;

      if (favCount < 1) {
        props.updateFavList({ ...param, isFavorite: true });
      } else {
        props.updateFavList({ ...param, isFavorite: false });
      }
    };

    const factItems = props.factItems;
    const favoriteList = props.favoriteList;

    return {
      hasFactItems,
      factItems,
      itemCount,
      handleUpdateFavorite,
      favoriteList
    };
  },
});
</script>

<style scoped>
.fact-listing {
  max-width: 1024px;
  margin: 40px auto;
}
.list-wrapper {
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  padding: 1rem;
  flex-wrap: wrap;
}
.cards {
  list-style-type: none;
  background: white;
  padding: 15px;
  margin: 10px;
  border-radius: 4px;
  width: 30.33%;
  height: 130px;
  overflow: hidden;
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.1);
}

.cards h2 {
  font-size: 1.25rem;
  height: 100px;
  width: 95%;
}
.list-move {
  transition: all 1s;
}

.addToFavorite {
  font-size: 0.75rem;
  position: absolute;
  right: 4px;
  top: 8px;
  padding: 5px 10px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: rgb(0 0 0 / 28%) 0px 0.7px 2px 0.4px;
  line-height: 0px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  z-index: 1;
  visibility: hidden;
}

.addToFavorite.isFavorite {
  visibility: visible;
  background-color: beige;
}

.addToFavorite img {
  fill-rule: red;
  height: 14px;
}

.favoriteCount {
  position: absolute;
  top: -4px;
  right: -1px;
  background: #012c3d;
  color: rgb(255, 255, 255);
  width: 10px;
  height: 10px;
  font-size: 0.5rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
}

@media screen and (max-width: 550px) {
  .list-wrapper {
    flex-direction: column;
  }

  .cards {
    width: 95%;
  }
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }

  .cards:hover > div {
    visibility: visible;
    cursor: pointer;
    transform: all 0.3s ease-in-out;
  }

  .addToFavorite:hover {
    background-color: beige;
    transform: color 0.3s ease-in-out;
  }
}
</style>
