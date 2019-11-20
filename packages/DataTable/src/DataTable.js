/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import ColumnDefinition from "./components/ColumnDefinition";
import Controls from "./components/Controls";
import TopNavigation from "./components/TopNavigation";
import VirtualizedTable from "./components/VirtualizedTable";
import { extractChildren } from "./helpers";
import { sortDirections } from "./constants";
import { TableProvider } from "./context";
import { sortReducer } from "./reducers";

const propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  rowHeight: PropTypes.number,
  onSort: PropTypes.func,
  plugins: PropTypes.arrayOf(PropTypes.func),
};

const defaultProps = {
  height: 600,
  width: null,
  rowHeight: 32,
  onSort: null,
  plugins: [sortReducer],
};

export default function DataTable(props) {
  const { data, children: childrenProps, height, rowHeight, width, keygen, onSort, plugins } = props;
  const { "DataTable.ColumnDefinition": ColumnsDefinition, "DataTable.TopNavigation": TopNavigation } = extractChildren(
    childrenProps,
    ["DataTable.ColumnDefinition", "DataTable.TopNavigation"]
  );

  let topNavigationReducers = [];
  if (TopNavigation && TopNavigation.props) {
    topNavigationReducers = React.Children.map(TopNavigation.props.children, child => child.type.reducer).filter(
      chunk => chunk
    );
  }

  return (
    <TableProvider data={data} keygen={keygen} plugins={topNavigationReducers.concat(plugins)}>
      <Controls ColumnsDefinition={ColumnsDefinition} onSort={onSort} />
      {TopNavigation}
      <VirtualizedTable
        ColumnsDefinition={ColumnsDefinition}
        height={height}
        rowHeight={rowHeight}
        width={width}
        onSort={onSort}
      />
    </TableProvider>
  );
}

DataTable.prpoTypes = propTypes;
DataTable.defaultProps = defaultProps;
DataTable.ColumnDefinition = ColumnDefinition;
DataTable.SortDirections = { ...sortDirections, DEFAULT: Object.values(sortDirections) };
DataTable.TopNavigation = TopNavigation;
