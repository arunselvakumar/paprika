import React from "react";
import { text, select } from "@storybook/addon-knobs";
import { Story, Rule, Tagline } from "storybook/assets/styles/common.styles";
import Heading from "@paprika/heading/lib/Heading";

import Avatar from "../../src";

const avatarProps = () => ({
  children: text("content", "A"),
  size: select("size", ["small", "medium"], "medium"),
  backgroundColor: text("backgroundColor", "black"),
  color: text("color", "white"),
});

const ExampleStory = props => (
  <Story>
    <Heading level={1} displayLevel={2} isLight>
      Avatar Showcase
    </Heading>
    <Tagline>Use the knobs to tinker with the props.</Tagline>
    <Rule />
    <Avatar {...props}>{props.children}</Avatar>
  </Story>
);

export default () => <ExampleStory {...avatarProps()} />;
