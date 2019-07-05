import React from "react";
import Button from "@paprika/button";
import DropDownMenu from "../../src";

const DropDownMenuExample = props => {
  const [isPending, setIsPending] = React.useState(false);

  return (
    <DropDownMenu {...props}>
      <DropDownMenu.Item onClick={() => {}}>Edit</DropDownMenu.Item>
      <DropDownMenu.Item onClick={() => {}}>Duplicate</DropDownMenu.Item>
      <DropDownMenu.Item isDestructive isDisabled onClick={() => {}}>
        Google
      </DropDownMenu.Item>
      <DropDownMenu.Item isDisabled onClick={() => {}}>
        Galvanize
      </DropDownMenu.Item>
      <DropDownMenu.Item
        isDestructive
        renderConfirmation={onClose => {
          return (
            <div>
              <p>Delete Two?</p>
              <Button
                type="destructive"
                isPending={isPending}
                onClick={() => {
                  setIsPending(true);
                }}
              >
                Delete me
              </Button>
              <Button type="minor" onClick={() => onClose(false)}>
                Cancel
              </Button>
            </div>
          );
        }}
      >
        Delete filter
      </DropDownMenu.Item>
    </DropDownMenu>
  );
};

export default DropDownMenuExample;
