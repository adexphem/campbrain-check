/// <reference types="cypress" />

import { mount } from "@cypress/vue";
import EmptyCard from "../FactCard/Empty.vue";

describe("Empty Card", () => {
  // it("playground", () => {
  //   mount(EmptyCard, { props: { msg: "Hello Cypress" } });
  // });

  it("it renders properly", () => {
    mount(EmptyCard);
    cy.get('[data-testid="card-title"]').should("contain", "Facts list is empty.");
  });
});
