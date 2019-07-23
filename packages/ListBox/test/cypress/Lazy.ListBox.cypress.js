import selectors from "../helpers/selectors";
import { openLazyDropDown } from "../helpers/toggleHelpers";

function checkIfSelected(marvelChar, fontWeight) {
  cy.contains(marvelChar)
    .should("have.css", "font-weight")
    .and("contain", fontWeight);
}

describe("Lazy ListBox", () => {
  beforeEach(() => {
    cy.visitStorybook("listbox-more-examples--lazy-listbox");
    openLazyDropDown();
  });

  it("should select three options and see three images", () => {
    cy.get("#root")
      .children()
      .should("have.length", 1);
    cy.contains("Namora").click();
    cy.get(selectors.popoverList).scrollTo("bottom");
    cy.contains("Satana").click();
    cy.contains("Sauron").click();
    cy.contains("Accept").click();
    cy.get(selectors.popover).should("not.be.visible");
    cy.get("#root div:first")
      .children()
      .should("have.length", 3)
      .and("contain", "Namora")
      .and("contain", "Satana")
      .and("contain", "Sauron");
  });

  it("should show correct amount when backspacing filter", () => {
    cy.get(selectors.filterInput)
      .type("o")
      .type("{backspace}");
    cy.get(selectors.popoverList)
      .children()
      .should("have.length", 55);
  });

  it("should select options, and close popover while not show images when pressing cancel", () => {
    cy.contains("Namora").click();
    cy.contains("Nebula").click();
    cy.contains("Cancel").click();
    cy.get(selectors.popover).should("not.be.visible");
    cy.get("#root")
      .children()
      .should("have.length", 1);
  });

  it("should select options and clear selections", () => {
    cy.contains("Nebula").click();
    checkIfSelected("Nebula", "600");
    cy.contains("Clear").click();
    checkIfSelected("Nebula", "400");
  });

  // fails
  it("should select, click renderTrigger, then close popover", () => {
    cy.get(selectors.popover).should("be.visible");
    cy.contains("Namorita").click();
    cy.contains("Natasha Romanoff").click();
    cy.contains("Marvel API").click({ force: true });
    cy.get(selectors.popover).should("not.be.visible");
  });
});