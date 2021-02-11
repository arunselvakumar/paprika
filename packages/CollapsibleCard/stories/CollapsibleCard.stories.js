import React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import { getStoryName } from "storybook/storyTree";
import CollapsibleCard from "../src/CollapsibleCard";
import Showcase from "./examples/Showcase";
import HeaderLayout from "./examples/HeaderLayout";

export default {
  title: getStoryName("CollapsibleCard"),
  component: CollapsibleCard,
};

export const showcase = Showcase;
showcase.story = {
  decorators: [withKnobs],
  parameters: {
    options: {
      isToolshown: true,
      showPanel: true,
    },
  },
};

export const headerLayout = () => <HeaderLayout />;
headerLayout.story = {
  parameters: {
    docs: { page: HeaderLayout },
    options: {
      isToolshown: true,
      showPanel: false,
    },
  },
};
