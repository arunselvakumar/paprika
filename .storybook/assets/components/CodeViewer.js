import React from "react";
import ReactDOMServer from "react-dom/server";
import SyntaxHighlighter from "react-syntax-highlighter";
import { boolean } from "@storybook/addon-knobs";

const getDisplayProps = (props, defaultProps) => {
  const propKeys = Object.keys(props);

  return propKeys
    .filter(key => props[key] !== null && props[key] !== defaultProps[key] && key !== "children")
    .map(key => `${key}="${props[key]}"\n`);
};

const CodeViewer = ({ children, isShown }) => {
  const tab = "  ";
  const displayName = children.type.displayName;
  const displayProps = getDisplayProps(children.props, children.type.defaultProps);
  const renderedChildren = ReactDOMServer.renderToStaticMarkup(children.props.children);
  const codeString = `<${displayName}\n${tab}${displayProps.join(tab)}${
    children.props.children ? `>\n  ${renderedChildren}\n</${displayName}>` : `/>`
  }`;

  return (
    <>
      {children}
      {isShown && <SyntaxHighlighter language="javascript">{codeString}</SyntaxHighlighter>}
    </>
  );
};

export default CodeViewer;
