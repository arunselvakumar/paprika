describe("Sortable <DataTable />", () => {
  beforeEach(() => {
    cy.visitStorybook("datatable--datatable-with-column-types");
  });

  const getByCellIndex = cellIndex => cy.get(`[data-pka-cell-index="${cellIndex}"]`);

  it("shows data by original order", () => {
    getByCellIndex("0_1").contains("Josef");
    getByCellIndex("1_1").contains("Romário");
    getByCellIndex("2_1").contains("Pelé");
  });

  it("has multiple options in sorting panel inside the central control", () => {
    cy.contains("Sort").click();
    cy.contains("Sort Country by").should("not.exist");
    cy.contains("Sort Name by").contains("ASCEND");
    cy.contains("Sort Name by")
      .contains("DESCEND")
      .should("not.exist");
    cy.contains("Sort Goals by").contains("ASCEND");
    cy.contains("Sort Goals by").contains("DESCEND");
    cy.contains("Sort Status by").contains("ASCEND");
    cy.contains("Sort Status by").contains("DESCEND");
  });

  it("can sort by ASCEND", () => {
    cy.contains("Sort").click();
    cy.contains("Sort Name by")
      .contains("ASCEND")
      .click();

    getByCellIndex("0_1").contains("Alfredo");
    getByCellIndex("1_1").contains("Arthur");
    getByCellIndex("2_1").contains("Cristiano");
  });

  it("can sort by DESCEND", () => {
    cy.contains("Sort").click();
    cy.contains("Sort Goals by")
      .contains("DESCEND")
      .click();

    getByCellIndex("0_2").contains("805");
    getByCellIndex("1_2").contains("772");
    getByCellIndex("2_2").contains("767");
  });

  it("can sort by DATE type", () => {
    cy.contains("Sort").click();
    cy.contains("Sort Joined since by")
      .contains("DESCEND")
      .click();

    getByCellIndex("0_4").contains("12/18/2020");
    getByCellIndex("1_4").contains("12/12/2019");
    getByCellIndex("2_4").contains("10/01/2019");
  });

  it("can sort by clicking optional button", () => {
    cy.contains("Joined since")
      .children()
      .click();
    cy.contains("Sort by ASCEND").click();

    getByCellIndex("0_4").contains("03/21/2012");
    getByCellIndex("1_4").contains("02/02/2013");
    getByCellIndex("2_4").contains("01/12/2014");
  });
});
