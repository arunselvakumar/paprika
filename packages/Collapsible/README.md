## Collapsible

A controlled component that shows/hides content on click.

### Installation

`> npm install --save @paprika/collapsible`
or
`> yarn add @paprika/collapsible`

### Usage

```js
import Collapsible from "@paprika/collapsible";

const [isCollapsed, setIsCollapsed] = React.useState(false);

const yourComponent = () => {
  return (
    <Collapsible
      a11yText="collapsible section"
      isCollapsed={isCollapsed}
      isDisabled={false}
      label="Click me to show/hide the content"
      iconAlign="left"
      onClick={() => setIsCollapsed(!isCollapsed)}
    >
      <p>
        <strong>Content</strong> – children of the &lt;Collapsible&gt; is hidden while the collapsible is collapsed, and
        visible with it is expanded.
      </p>
    </Collapsible>
  );
};

export default yourComponent;
```

### Props

- `a11yText`
- `children`
- `className`
- `iconAlign`
- `iconCollapse`
- `iconExpand`
- `isCollapsed`
- `isDisabled`
- `hasOnlyIconToggle`
- `label`
- `onClick`

[More detail about these props](https://github.com/acl-services/paprika/blob/master/packages/Collapsible/src/Collapsible.js)