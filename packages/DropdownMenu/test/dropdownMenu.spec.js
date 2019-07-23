import React from "react";
import { render, configure } from "@testing-library/react";
import L10n from "@paprika/l10n";
import DropdownMenu from "../src";

configure({ testIdAttribute: "data-qa-anchor" });

function renderComponent(props = {}) {
  const renderedComponent = render(
    <L10n>
      <DropdownMenu
        renderTrigger={({ isOpen, handleOpenMenu }) => (
          <DropdownMenu.Trigger isOpen={isOpen} handleOpenMenu={handleOpenMenu} {...props}>
            Trigger
          </DropdownMenu.Trigger>
        )}
      >
        <DropdownMenu.Item onClick={() => {}}>Edit</DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => {}}>Filter</DropdownMenu.Item>
        <DropdownMenu.Item
          isDestructive
          renderConfirmation={handleCloseMenu => {
            return (
              <DropdownMenu.Confirmation
                confirmLabel="Confirm Delete"
                onConfirm={() => {
                  handleCloseMenu();
                }}
                onCancel={() => {
                  handleCloseMenu();
                }}
                heading="Delete Button?"
              />
            );
          }}
        >
          Delete
        </DropdownMenu.Item>
      </DropdownMenu>
    </L10n>
  );

  return {
    ...renderedComponent,
  };
}

describe("DropdownMenu", () => {
  let getByText;
  let triggerComponent;
  let queryByText;

  beforeEach(() => {
    ({ getByText, queryByText } = renderComponent());
    triggerComponent = getByText(/trigger/i);
  });

  it("should show trigger initially with dropdown hidden", () => {
    expect(triggerComponent).toBeVisible();
    expect(getByText(/edit/i)).not.toBeVisible();
  });

  it("should hide dropdown menu when trigger is clicked", () => {
    const { getAllByText } = renderComponent();
    triggerComponent.click();
    expect(getAllByText(/Edit/)[0]).toBeVisible();
    triggerComponent.click();
    expect(getAllByText(/Edit/)[0]).not.toBeVisible();
  });

  it("should hide dropdown when item is clicked", () => {
    triggerComponent.click();
    expect(getByText(/edit/i)).toBeVisible();
    getByText(/edit/i).click();
    expect(triggerComponent).toBeVisible();
    expect(getByText(/edit/i)).not.toBeVisible();
  });

  it("retain trigger focus when the dropdown is closed", () => {
    triggerComponent.click();
    expect(getByText(/edit/i)).toBeVisible();
    triggerComponent.click();
    expect(document.activeElement).toBe(triggerComponent);
  });

  describe("replacement popover", () => {
    beforeEach(() => {
      triggerComponent.click();
      expect(getByText(/edit/i)).toBeVisible();
      getByText(/delete/i).click();
    });

    it("should replace dropdown when destructive item is clicked", () => {
      expect(getByText(/confirm delete/i)).toBeVisible();
    });

    it("should hide all dropdown menus when replacement cancel button is clicked", () => {
      getByText(/cancel/i).click();
      expect(queryByText(/confirm delete/i)).not.toBeInTheDocument();
      expect(getByText(/edit/i)).not.toBeVisible();
    });

    it("should hide all dropdown menus when primary button is clicked inside replacement popover", () => {
      getByText(/confirm delete/i).click();
      expect(queryByText(/confirm delete/i)).not.toBeInTheDocument();
      expect(getByText(/edit/i)).not.toBeVisible();
    });
  });
});