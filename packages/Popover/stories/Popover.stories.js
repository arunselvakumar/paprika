import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";

import Basic from "./examples/Basic";
import Simple from "./examples/Simple";
import Controlled from "./examples/Controlled";
import WithTriggers from "./examples/WithTriggers";
import PositioningElement from "./examples/PositioningElement";
import ScrollContainer from "./examples/ScrollContainer";
import Transformed from "./examples/Transformed";

storiesOf("Popover", module)
  .addDecorator(withKnobs)
  .add("Basic", () => <Basic />)
  .add("Simple", () => <Simple />)
  .add("Controlled", () => <Controlled />)
  .add("With Trigger Components", () => <WithTriggers />)
  .add("With Positioning Element", () => <PositioningElement />)
  .add("With Scroll Container", () => <ScrollContainer />);

storiesOf("Popover/Dev", module).add("Has container with a CSS transform", () => <Transformed />);
