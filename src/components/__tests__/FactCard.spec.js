/// <reference types="cypress" />

import { mount } from "@cypress/vue";
import FactCard from "../FactCard/FactCard.vue";

const dummy = [{
  fact: 'testing things makes life easy',
  length: 20
}];

const favList = [{fact: 'abc'}];

describe("Fact Card", () => {
  
  it("it renders properly", () => {  
    mount(FactCard, { props: { factItems: dummy, favoriteList: favList, updateFavList: () => {}} });
    // cy.get('[data-testid="card-title"]').should("contain", "Facts list is empty.");
  });
});
