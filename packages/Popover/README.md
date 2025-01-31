<!-- start: Autogenerated - do not modify -->

# @paprika/popover

## Description

Popover component renders an overlay of content anchored to a trigger button (or specific positioning element). It can be triggered by click (or keypress), by hover (or keyboard focus – as a tooltip), or programatically

## Installation

```
yarn add @paprika/popover
```

or with npm:

```
npm install @paprika/popover
```

## Props

### Popover

| Prop                  | Type                                                                                                        | required | default                      | Description                                                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | -------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| align                 | [ Popover.types.align.TOP, Popover.types.align.RIGHT, Popover.types.align.BOTTOM, Popover.types.align.LEFT] | false    | Popover.types.align.BOTTOM   | Where the popover content is positioned relative to the trigger or getPositioningElement.                                                                    |
| children              | node                                                                                                        | true     | -                            | Content of the popover                                                                                                                                       |
| isDark                | bool                                                                                                        | false    | false                        | Displays as a "tooltip" style with white text on black background.                                                                                           |
| isEager               | bool                                                                                                        | false    | false                        | Activated by mouseOver / focus instead of onClick.                                                                                                           |
| isOpen                | bool                                                                                                        | false    | null                         | How "controlled" popovers are shown / hidden.                                                                                                                |
| isPortal              | bool                                                                                                        | false    | true                         | This renders the popover inline in the DOM and not in a react portal. WARNING: will have side effects with paprika side panels and modals, use with caution. |
| defaultIsOpen         | bool                                                                                                        | false    | null                         | How "uncontrolled" popovers can be rendered open by default.                                                                                                 |
| edge                  | [ Popover.types.align.LEFT, Popover.types.align.RIGHT, null]                                                | false    | null                         | Where the edge of the popover content is based on the trigger or getPositioningElement                                                                       |
| maxWidth              | [string,number]                                                                                             | false    | 320                          | Maximum width of popover content. Using a number is recommended and implies px units.                                                                        |
| minWidth              | [string,number]                                                                                             | false    | 0                            | Minimumn width of popover content. Using a number is recommended and implies px units.                                                                       |
| onClose               | func                                                                                                        | false    | null                         | Callback to fire when user closes popover.                                                                                                                   |
| offset                | number                                                                                                      | false    | parseInt(tokens.spaceLg, 10) | Distance, in px, between popover content edge and trigger / getPositioningElement.                                                                           |
| getPositioningElement | func                                                                                                        | false    | null                         | Function that provides DOM element to use as target for positioning the popover.                                                                             |
| getScrollContainer    | func                                                                                                        | false    | null                         | Function that provides the scrolling DOM element that contains the popover.                                                                                  |
| shouldKeepFocus       | bool                                                                                                        | false    | false                        | If focus will stay at the trigger when showing popover. Popover can still be closed when clicking outside or pressing escape key.                            |
| shouldUnmount         | bool                                                                                                        | false    | true                         | Should unmount Popover Content or Tip Subcomponents from DOM when popover is closed                                                                          |
| zIndex                | number                                                                                                      | false    | zValue(1)                    | Number setting the z-index for the popover content / tip.                                                                                                    |

### Popover.Trigger

| Prop     | Type        | required | default | Description                                                       |
| -------- | ----------- | -------- | ------- | ----------------------------------------------------------------- |
| a11yText | string      | false    | null    | Descriptive a11y text for assistive technologies for the trigger. |
| children | [func,node] | true     | -       |                                                                   |

### Popover.Content

| Prop     | Type | required | default | Description |
| -------- | ---- | -------- | ------- | ----------- |
| children | node | false    | null    |             |

### Popover.Card

| Prop     | Type | required | default | Description |
| -------- | ---- | -------- | ------- | ----------- |
| children | node | true     | -       |             |

### Popover.Tip

| Prop   | Type   | required | default | Description                |
| ------ | ------ | -------- | ------- | -------------------------- |
| zIndex | number | false    | null    | Number setting the z-index |

<!-- end: Autogenerated - do not modify -->
<!-- content -->

## Usage

The `<Popover>` can be used as a controlled or uncontrolled component. If controlled, the `isOpen` and `onClose` props must be utilized.

### Tooltip style

The `<Popover>` can be used as a tooltip by making it open "eagerly" on hover or keyboard focus via the `isEager` prop. Typically a very short tooltip is also designed with white text on a black background, achieved with the `isDark` prop.

### Popover.Trigger

With an uncontrolled `<Popover>`, it may be convenient to use the `<Popover.Trigger>` to wrap the element the user will interact with to display the popover because this results in a `<RawButton>` being wrapped around that UI element, with all of the handlers it requires already hooked up.

For a controlled `<Popover>`, or the case where the `<Popover.Trigger>` child element is a `<Button>`, it is necessary to use a render function for the `children` of the `<Popover.Trigger>`, which will be provided with a generic `handler` argument.

It may not be necessary to use a `<Popover.Trigger>` element at all if the `<Popover>` is controlled. Then its `children` (excluding `<Popover.Content>` and `<Popover.Tip>`) will by default be used as the positioning element (see Basic controlled example below).

### Popover.Content

Content for the `<Popover>` is also included as children, wrapped by the `<Popover.Content>`. For a "card" style, the `<Popover.Card>` is a convenient helper.

### Popover.Tip

To include an arrow that points to the trigger element, the `<Popover.Tip>` can be included as a sibling element of the `<Popover.Content>` (include it _after_ the Content to avoid an explicit zIndex prop on the Tip).

### Basic uncontrolled example

```jsx
import Popover from "@paprika/popover";

...

<Popover>
  <Popover.Trigger>
    <Icon />
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Card>Lorem hipsum kombucha leggings vinyl.</Popover.Card>
  </Popover.Content>
  <Popover.Tip />
</Popover>
```

### Uncontrolled example with button trigger

```jsx
import Popover from "@paprika/popover";

...

<Popover>
  <Popover.Trigger>
    {(onClickHandler, a11yAttributes) => (
      <Button onClick={onClickHandler} {...a11yAttributes}>
        Open Popover
      </Button>
    )}
  </Popover.Trigger>
  <Popover.Content>
    <Popover.Card>Lorem hipsum kombucha leggings vinyl.</Popover.Card>
  </Popover.Content>
  <Popover.Tip />
</Popover>
```

### Basic controlled example

```jsx
import Popover from "@paprika/popover";

...

const [isOpen, setOpen] = React.useState(false);

...

<Popover isOpen={isOpen} onClose={() => { setOpen(false) }}>
  <Button onClick={() => { setOpen(true) }}>
    Open Popover
  </Button>
  <Popover.Content>
    <Popover.Card>Lorem hipsum kombucha leggings vinyl.</Popover.Card>
  </Popover.Content>
  <Popover.Tip />
</Popover>
```

<!-- eoContent -->

## Links

- [Storybook Showcase](https://paprika.highbond.com/?path=/story/messaging-popover--showcase)
- [GitHub source code](https://github.com/acl-services/paprika/tree/master/packages/Popover/src)
- [Create GitHub issue](https://github.com/acl-services/paprika/issues/new?label=[]&title=@paprika/popover%20[help]:%20your%20short%20description&body=%0A%23%20Help%20wanted%0A%0A%23%23%20Please%20write%20your%20question.%0A*A%20clear%20and%20concise%20description%20of%20what%20the%20question%20is*%0A%0A%23%23%20Additional%20context%0A*Add%20any%20other%20context%20or%20screenshots%20about%20your%20question%20here.*%0A)
- [CHANGELOG](https://github.com/acl-services/paprika/tree/master/packages/Popover/CHANGELOG.md)
