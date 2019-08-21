import React from "react";
import DropdownMenu from "../../src";
import Confirmation from "../../../Confirmation/src/Confirmation";

const handleConfirm = onCloseMenu => onCloseConfirm => {
  onCloseConfirm();
  onCloseMenu();
};

const DropdownMenuExample = () => {
  return (
    <DropdownMenu
      align="bottom"
      renderTrigger={({ isOpen, handleOpenMenu }) => (
        <DropdownMenu.Trigger data-qa-anchor="dropdown-menu__trigger" isOpen={isOpen} onOpenMenu={handleOpenMenu}>
          Trigger
        </DropdownMenu.Trigger>
      )}
    >
      <DropdownMenu.Item data-qa-anchor="edit-item-data-anchor" onClick={() => {}}>
        Edit
      </DropdownMenu.Item>
      <DropdownMenu.Item onClick={() => {}}>Duplicate</DropdownMenu.Item>
      <DropdownMenu.Item isDestructive isDisabled onClick={() => {}}>
        Galvanize
      </DropdownMenu.Item>
      <DropdownMenu.LinkItem link="http://www.wegalvanize.com">Galvanize Link Item</DropdownMenu.LinkItem>
      <DropdownMenu.LinkItem isExternal link="http://www.bbc.com">
        External link
      </DropdownMenu.LinkItem>
      <DropdownMenu.Item isDisabled onClick={() => {}}>
        Galvanize
      </DropdownMenu.Item>
      <DropdownMenu.Divider />
      <DropdownMenu.Item
        isDestructive
        renderConfirmation={onCloseMenu => {
          return (
            <Confirmation
              body="Lorem ipsum dolor amet vexillologist tacos selvage narwhal butcher twee ethical hot chicken."
              confirmLabel="Delete filter"
              defaultIsOpen
              heading="Delete filter?"
              onConfirm={handleConfirm(onCloseMenu)}
            />
          );
        }}
      >
        Delete filter
      </DropdownMenu.Item>
    </DropdownMenu>
  );
};

export default DropdownMenuExample;
