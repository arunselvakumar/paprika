const comp = "datagrid";
const testStory = "lazy--marvel-api-interaction";

const keyEvent = {
  enter: { keyCode: 13, which: 13, force: true },
  up: { keyCode: 38, which: 38, force: true },
  down: { keyCode: 40, which: 40, force: true },
};

describe("<DataGrid/>", () => {
  beforeEach(() => {
    cy.visitStorybook(`${comp}-${testStory}`);
  });

  it("renders StickyColumn", () => {
    cy.get('[data-column-index="2"]')
      .eq(0)
      .then(e => {
        const coords = e[0].getBoundingClientRect();

        cy.getAllByRole("rowgroup")
          .last()
          .scrollTo(100, 0);

        cy.get('[data-column-index="2"]')
          .eq(0)
          .then(e => {
            const checkcoords = e[0].getBoundingClientRect();
            expect(checkcoords).to.deep.equal(coords);
          });
      });

    cy.getAllByRole("rowgroup")
      .last()
      .scrollTo(-100, 0);

    cy.get('[data-column-index="5"]')
      .eq(0)
      .then(e => {
        const coords = e[0].getBoundingClientRect();

        cy.getAllByRole("rowgroup")
          .last()
          .scrollTo(200, 0);

        cy.get('[data-column-index="5"]')
          .eq(0)
          .then(e => {
            const checkcoords = e[0].getBoundingClientRect();
            expect(checkcoords).to.not.deep.equal(coords);
          });
      });
  });

  it("renders ColumnIndicator", () => {
    cy.get('[data-row-index="0"]')
      .eq(0)
      .children()
      .trigger("mouseover")
      .children()
      .should($div => {
        const className = $div[0].className;
        expect(className).to.match(/Checkbox/);
      });
  });

  it("renders ColumnExpand", () => {
    cy.get('[data-row-index="0"]')
      .eq(1)
      .trigger("mouseover")
      .should("have.css", "opacity", "1");
  });

  it("renders load more button when you scroll to the bottom", () => {
    cy.getAllByRole("rowgroup")
      .last()
      .scrollTo("bottom")
      .should("not.contain", "Amun");

    cy.get('[data-pka-anchor="button"')
      .should("be.visible")
      .click()
      .wait(400)
      .getAllByRole("rowgroup")
      .last()
      .scrollTo("bottom")
      .getAllByText(/Amun/i)
      .should("be.visible");
  });

  it("navigate DataGrid-collapsible OnArrowKeyDown", () => {
    cy.visitStorybook(`${comp}-lazy--collapse`);

    cy.getByText("Audit Planning").click();

    cy.getAllByText(/Narratives/i)
      .should("be.visible")
      .focused()
      .trigger("keydown", keyEvent.down)
      .focused()
      .trigger("keydown", keyEvent.down)
      .focused()
      .contains(/RCM/i)
      .click({ force: true })
      .getAllByText(/RCM/i)
      .its("length")
      .should("be.gt", 2)
      .focused()
      .click({ force: true })
      .getAllByText(/RCM/i)
      .its("length")
      .should("eq", 2)
      .focused()
      .trigger("keydown", keyEvent.up)
      .focused()
      .trigger("keydown", keyEvent.up)
      .focused()
      .click({ force: true });

    cy.getByRole("grid").should("not.contain", "Narrative");
  });

  it("navigate DataGrid-collapsible OnPressEnter", () => {
    cy.visitStorybook(`${comp}-lazy--collapse`);

    cy.getByText("Audit Planning")
      .click()
      .focused()
      .should("be.visible")
      .trigger("keydown", keyEvent.down)
      .focused()
      .trigger("keyup", keyEvent.enter)
      .getAllByText("Walkthrough")
      .should("be.visible");

    cy.getByText("Narratives")
      .focused()
      .trigger("keyup", keyEvent.enter)
      .focused()
      .trigger("keydown", keyEvent.up)
      .focused()
      .trigger("keyup", keyEvent.enter)
      .getByRole("grid")
      .should("contain", "Audit Planning")
      .should("not.contain", "Walkthrough");
  });
});
