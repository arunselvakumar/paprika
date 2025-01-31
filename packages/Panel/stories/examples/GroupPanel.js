import React from "react";
import Button from "@paprika/button";
import Panel from "../../src";
import { Nav, TextLine } from "../helpers";

export default function GroupPanel() {
  const [spParent1, setSpParent1] = React.useState(true);
  const [spParent2, setSpParent2] = React.useState(true);
  const [spChild, setSpChild] = React.useState(true);
  const menu = {
    padding: "8px",
    display: "flex",
    width: "150px",
    justifyContent: "space-between",
  };

  const handleParent2 = () => {
    if (spParent2) {
      setSpParent2(false);
      setSpChild(false);
    } else {
      setSpParent2(true);
    }
  };

  const handleParent1 = () => {
    setSpParent1(state => !state);
  };

  return (
    <>
      <Nav>
        <div style={menu}>
          <Button data-pka-anchor="button-panel1" onClick={handleParent1} size="small">
            Parent 1
          </Button>
          <Button data-pka-anchor="button-panel2" onClick={handleParent2} size="small">
            Parent 2
          </Button>
        </div>
      </Nav>
      <div style={{ display: "flex" }}>
        <div style={{ width: "400px", margin: "25px" }}>
          <TextLine repeat={100} />
        </div>
        <div style={{ width: "400px", margin: "25px" }}>
          <TextLine repeat={100} />
        </div>
        <div style={{ width: "400px", margin: "25px" }}>
          <TextLine repeat={100} />
        </div>
        <div style={{ width: "400px", margin: "25px" }}>
          <TextLine repeat={100} />
        </div>
      </div>
      <Panel.Group offsetY={40}>
        <Panel data-pka-anchor="panel1" width={400} onClose={handleParent1} isOpen={spParent1}>
          <Panel.Header>Parent 1</Panel.Header>
          <Panel.Content>
            <TextLine repeat={100} />
            <Button>Test button</Button>
          </Panel.Content>
        </Panel>
        <Panel data-pka-anchor="panel2" onClose={handleParent2} width={400} isOpen={spParent2}>
          <Panel.Header>Parent 2</Panel.Header>
          <Panel.Content>
            <Button
              onClick={() => {
                setSpChild(state => !state);
              }}
            >
              Toggle Child
            </Button>
          </Panel.Content>
        </Panel>
        <Panel
          data-pka-anchor="panel-child"
          onClose={() => {
            setSpChild(false);
          }}
          width={400}
          isOpen={spChild}
        >
          <Panel.Header>Child of Parent 2</Panel.Header>
          <Panel.Content>
            <TextLine repeat={100} />
          </Panel.Content>
          <Panel.Footer>
            <Button>Test button</Button>
          </Panel.Footer>
        </Panel>
      </Panel.Group>
    </>
  );
}
