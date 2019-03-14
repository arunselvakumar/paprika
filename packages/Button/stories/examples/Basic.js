import React from "react";
import { action } from "@storybook/addon-actions";
import { Rule } from "storybook/assets/styles/common.styles";
import { ButtonStory } from "../Button.stories.styles";
import Button from "../../Button";

const btnRef = React.createRef();
const btnRef2 = React.createRef();

const clickHandler = ref => () => {
  if (ref) {
    action(`Clicked on <${ref.current.nodeName.toLowerCase()}> ("${ref.current.innerText}")`)();
  } else {
    action("Clicked a button")();
  }
};

const PopoverStory = () => (
  <ButtonStory>
    <p>
      <Button a11yText="ceci n'est pas un bouton" buttonRef={btnRef} onClick={clickHandler(btnRef)}>
        default button
      </Button>

      <Button onClick={clickHandler(btnRef2)} buttonRef={btnRef2} isDisabled>
        disabled button
      </Button>
    </p>
    <Rule />
    <p>
      <Button isSubmit onClick={clickHandler()}>
        submit
      </Button>
    </p>
    <p>
      <Button onClick={clickHandler()}>
        long button lumbersexual authentic <br /> vegan vaporware scenester humblebrag
      </Button>
    </p>
    <p>
      <Button isFullWidth onClick={clickHandler()}>
        full width
      </Button>
    </p>
    <Rule />
    <p>
      <Button size="small" onClick={clickHandler()}>
        small
      </Button>
      <Button onClick={clickHandler()}>medium</Button>
      <Button size="large" onClick={clickHandler()}>
        large
      </Button>
    </p>
    <Rule />
    <p>
      <Button onClick={clickHandler()}>default</Button>
      <Button kind="primary" onClick={clickHandler()}>
        primary
      </Button>
      <Button kind="secondary" onClick={clickHandler()}>
        secondary
      </Button>
      <Button kind="destructive" onClick={clickHandler()}>
        destructive
      </Button>
      <Button kind="flat" onClick={clickHandler()}>
        flat
      </Button>
      <Button kind="minor" onClick={clickHandler()}>
        minor
      </Button>
      <Button kind="link" onClick={clickHandler()}>
        link
      </Button>
    </p>
    <Rule />
    <p>
      <Button isSemantic={false} size="large" kind="primary" isActive onClick={clickHandler()}>
        raw large active primary
      </Button>
      <Button isSemantic={false} isDisabled onClick={clickHandler()}>
        raw default disabled
      </Button>
      <Button isSemantic={false} kind="link" size="small" onClick={clickHandler()}>
        raw small link
      </Button>
    </p>
    {[
      ...Array(34)
        .fill()
        .keys(),
    ].map(index => (
      <br key={index} />
    ))}
    ...fin.
  </ButtonStory>
);

export default PopoverStory;
