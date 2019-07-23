import React from "react";
import { boolean, select, text } from "@storybook/addon-knobs";
import { Rule, Story, Tagline } from "storybook/assets/styles/common.styles";
import { ShirtSizes } from "@paprika/helpers/lib/customPropTypes";
import Heading from "@paprika/heading";
import TextareaExample from "./TextareaExample";

const textareaProps = () => ({
  a11yText: text("a11yText"),
  canExpand: boolean("canExpand", true),
  hasError: boolean("hasError", false),
  isDisabled: boolean("isDisabled", false),
  isReadOnly: boolean("isReadOnly", false),
  maxHeight: text("maxHeight"),
  placeholder: text("placeholder", "This is a default placeholder..."),
  size: select("size", ShirtSizes.DEFAULT, "medium"),
});

const ExampleStory = props => (
  <Story>
    <Heading level={1} displayLevel={2} isLight>
      Showcase
    </Heading>
    <Tagline>Use the knobs to tinker with the props.</Tagline>
    <Rule />
    <TextareaExample {...props} />
  </Story>
);

export default () => <ExampleStory {...textareaProps()} />;