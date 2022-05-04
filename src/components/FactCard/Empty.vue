<template>
  <div class="empty-fact-listing">
    <div class="title" data-testid="card-title">Facts list is empty.</div>

    <div name="list" tag="ul" class="list-wrapper">
      <li v-for="item in factItems" :key="item.id" class="cards">
        <h2></h2>
        <h2></h2>
        <h1></h1>
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "EmptyFactCard",
  setup() {
    const factItems = [{ id: 1 }, { id: 2 }, { id: 3 }];
    return { factItems };
  },
});
</script>

<style scoped>
.title {
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
}
.empty-fact-listing {
  max-width: 1024px;
  margin: 1px auto;
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
  margin: 10px 10px;
  border-radius: 4px;
  width: 30.33%;
  height: 130px;
  overflow: hidden;

  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.1);
}

h2 {
  background-color: #cecece;
  background-image: linear-gradient(90deg, #e2e2e2, #eaeaea, #ffffff);
  width: 100%;
  height: 15px;
  margin-bottom: 10px;
}

h1 {
  background-color: #cecece;
  background-image: linear-gradient(90deg, #e2e2e2, #eaeaea, #ffffff);
  width: 75%;
  height: 15px;
  margin-bottom: 10px;
}

@media screen and (max-width: 550px) {
  .list-wrapper {
    flex-direction: column;
  }

  .cards {
    width: 95%;
  }
}
</style>
