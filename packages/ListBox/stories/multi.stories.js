import React from "react";
import { storiesOf } from "@storybook/react";
import { Frame, ImageOption } from "./stories.styles";
import ListBox from "../ListBox";
import { images } from "./fixtures/images";

storiesOf("ListBox / multi", module).add("Basic", () => (
  <Frame>
    <ListBox isMulti>
      <ListBox.Option>Punisher</ListBox.Option>
      <ListBox.Option>Catwoman</ListBox.Option>
      <ListBox.Option>Venom</ListBox.Option>
      <ListBox.Option>Thunderbolts</ListBox.Option>
      <ListBox.Option>Deadpool</ListBox.Option>
      <ListBox.Option>Spawn</ListBox.Option>
      <ListBox.Option>Wolverine</ListBox.Option>
    </ListBox>
  </Frame>
));

storiesOf("ListBox / multi", module).add("With Filter", () => (
  <Frame>
    <ListBox isMulti hasFilter>
      <ListBox.Option>Punisher</ListBox.Option>
      <ListBox.Option>Catwoman</ListBox.Option>
      <ListBox.Option>Venom</ListBox.Option>
      <ListBox.Option>Thunderbolts</ListBox.Option>
      <ListBox.Option>Deadpool</ListBox.Option>
      <ListBox.Option>Spawn</ListBox.Option>
      <ListBox.Option>Wolverine</ListBox.Option>
    </ListBox>
  </Frame>
));

storiesOf("ListBox / multi", module).add("With Filter and nodes as children", () => (
  <Frame>
    <ListBox isMulti hasFilter height={300}>
      {images.map(image => (
        <ListBox.Option label={image.label}>
          <ImageOption>
            <img alt={image.label} src={image.src} />
          </ImageOption>
        </ListBox.Option>
      ))}
    </ListBox>
  </Frame>
));

storiesOf("ListBox / multi", module).add("With Checkbox as pre built-in option", () => (
  <Frame>
    <ListBox isMulti hasFilter renderChecker="checkbox">
      <ListBox.Option>Punisher</ListBox.Option>
      <ListBox.Option>Catwoman</ListBox.Option>
      <ListBox.Option>Venom</ListBox.Option>
      <ListBox.Option>Thunderbolts</ListBox.Option>
      <ListBox.Option>Deadpool</ListBox.Option>
      <ListBox.Option>Spawn</ListBox.Option>
      <ListBox.Option>Wolverine</ListBox.Option>
    </ListBox>
  </Frame>
));

storiesOf("ListBox / multi", module).add("With Custom Checkers", () => (
  <Frame>
    <ListBox
      isMulti
      hasFilter
      renderChecker={isChecked => {
        return isChecked ? "✅" : "🙅‍";
      }}
    >
      <ListBox.Option>Punisher</ListBox.Option>
      <ListBox.Option>Catwoman</ListBox.Option>
      <ListBox.Option>Venom</ListBox.Option>
      <ListBox.Option>Thunderbolts</ListBox.Option>
      <ListBox.Option>Deadpool</ListBox.Option>
      <ListBox.Option>Spawn</ListBox.Option>
      <ListBox.Option>Wolverine</ListBox.Option>
    </ListBox>
  </Frame>
));

storiesOf("ListBox / multi", module).add("With Groups", () => (
  <Frame>
    <ListBox isMulti>
      <ListBox.Group title="antiheroes">
        <ListBox.Option>Punisher</ListBox.Option>
        <ListBox.Option>Catwoman</ListBox.Option>
        <ListBox.Option>Venom</ListBox.Option>
        <ListBox.Option>Thunderbolts</ListBox.Option>
        <ListBox.Option>Suicide Squad</ListBox.Option>
        <ListBox.Option>Deadpool</ListBox.Option>
        <ListBox.Option>Spawn</ListBox.Option>
        <ListBox.Option>Wolverine</ListBox.Option>
      </ListBox.Group>
      <ListBox.Group title="villians">
        <ListBox.Option>The Joker</ListBox.Option>
        <ListBox.Option>Darth Vader</ListBox.Option>
        <ListBox.Option>Hannibal Lecter</ListBox.Option>
        <ListBox.Option>Lord Voldemort</ListBox.Option>
        <ListBox.Option>Freddy Krueger</ListBox.Option>
        <ListBox.Option>Palpatine</ListBox.Option>
        <ListBox.Option>Agent Smith</ListBox.Option>
      </ListBox.Group>
      <ListBox.Group title="heroes">
        <ListBox.Option>Black Panther</ListBox.Option>
        <ListBox.Option>Wonder Woman</ListBox.Option>
        <ListBox.Option>Spiderman</ListBox.Option>
        <ListBox.Option>The Incredibles</ListBox.Option>
        <ListBox.Option>Thor</ListBox.Option>
        <ListBox.Option>Batman</ListBox.Option>
        <ListBox.Option>Iron Man</ListBox.Option>
        <ListBox.Option>Doctor Strange</ListBox.Option>
      </ListBox.Group>
    </ListBox>
  </Frame>
));

storiesOf("ListBox / multi", module).add("With Groups and have selection by groups", () => (
  <Frame>
    <ListBox isMulti hasGroupSelection>
      <ListBox.Group title="antiheroes">
        <ListBox.Option>Punisher</ListBox.Option>
        <ListBox.Option>Catwoman</ListBox.Option>
        <ListBox.Option>Venom</ListBox.Option>
        <ListBox.Option>Thunderbolts</ListBox.Option>
        <ListBox.Option>Suicide Squad</ListBox.Option>
        <ListBox.Option>Deadpool</ListBox.Option>
        <ListBox.Option>Spawn</ListBox.Option>
        <ListBox.Option>Wolverine</ListBox.Option>
      </ListBox.Group>
      <ListBox.Group title="villians">
        <ListBox.Option>The Joker</ListBox.Option>
        <ListBox.Option>Darth Vader</ListBox.Option>
        <ListBox.Option>Hannibal Lecter</ListBox.Option>
        <ListBox.Option>Lord Voldemort</ListBox.Option>
        <ListBox.Option>Freddy Krueger</ListBox.Option>
        <ListBox.Option>Palpatine</ListBox.Option>
        <ListBox.Option>Agent Smith</ListBox.Option>
      </ListBox.Group>
      <ListBox.Group title="heroes">
        <ListBox.Option>Black Panther</ListBox.Option>
        <ListBox.Option>Wonder Woman</ListBox.Option>
        <ListBox.Option>Spiderman</ListBox.Option>
        <ListBox.Option>The Incredibles</ListBox.Option>
        <ListBox.Option>Thor</ListBox.Option>
        <ListBox.Option>Batman</ListBox.Option>
        <ListBox.Option>Iron Man</ListBox.Option>
        <ListBox.Option>Doctor Strange</ListBox.Option>
      </ListBox.Group>
    </ListBox>
  </Frame>
));
