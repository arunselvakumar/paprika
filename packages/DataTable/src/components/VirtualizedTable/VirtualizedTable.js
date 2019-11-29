import React from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import RawButton from "@paprika/raw-button";
import handleArrowKeys, { arrowKeys } from "../../helpers/handleArrowKeys";
import VirtualizeRows from "../../VirtualizeRows";
import * as styled from "./VirtualizedTable.styles";
import "@paprika/helpers/lib/dom/elementScrollToPolyfill";
import Options from "../Options";
import CheckBox from "../CheckBox";
import Cell from "../Cell";
import { Cell as CellStyled } from "../Cell/Cell.styles";
import { useDataTableState } from "../../context";

const propTypes = {
  height: PropTypes.number.isRequired,
  LoadMoreButton: PropTypes.node,
  onClickCell: PropTypes.func,
  onKeyDownArrow: PropTypes.func,
  onExpandedRow: PropTypes.func,
  rowHeight: PropTypes.number.isRequired,
  width: PropTypes.number,
};

const defaultProps = {
  LoadMoreButton: null,
  onClickCell: () => {},
  onKeyDownArrow: () => {},
  onExpandedRow: () => {},
  width: null,
};

export default function VirtualizedTable(props) {
  const { height, rowHeight, width, onExpandedRow, onKeyDownArrow, onClickCell, LoadMoreButton } = props;
  const [activeRowOnMouseEnter, setActiveRowOnMouseEnter] = React.useState({ index: null, data: null });
  const [activeCell, setActiveCell] = React.useState({ rowIndex: null, dataRow: null, index: null, data: null });
  const refActivePage = React.useRef({ from: null, to: null, subset: null });
  const refVirtualizeRows = React.useRef(null);
  const { data, sortedOrder, keygen, rowHeight: stateRowHeigth, columns, columnsOrder } = useDataTableState();
  const visibleColumnsOrder = columnsOrder.filter(columnId => !columns[columnId].isHidden);
  const columnsLength = visibleColumnsOrder.length;
  const delayedKeyDown = React.useRef(
    debounce(
      ({
        activeCell,
        columnsLength,
        delayedKeyDown,
        event,
        onKeyDownArrow,
        refActivePage,
        refVirtualizeRows,
        rowHeight,
        rowsLength,
        setActiveCell,
      }) =>
        handleArrowKeys({
          activeCell,
          columnsLength,
          delayedKeyDown,
          event,
          onKeyDownArrow,
          refActivePage,
          refVirtualizeRows,
          rowHeight,
          rowsLength,
          setActiveCell,
        }),
      15
    )
  ).current;

  // this will inject 20 rows below the visible table to helps with the navigation and scrolling flickering

  const dataForRendering = sortedOrder
    ? sortedOrder.map(keygenValue => data.find(item => item[keygen] === keygenValue))
    : data;

  const rowsLength = dataForRendering && dataForRendering.length;

  const handleMouseEnter = (data, rowIndex, keys) => () => {
    setActiveRowOnMouseEnter(() => ({ index: keys[rowIndex], data }));
  };

  const handleMouseLeave = (/* row, rowIndex */) => () => {};
  const rowHeightValue = (stateRowHeigth && stateRowHeigth.value) || rowHeight;

  function handleKeyDown(event) {
    if (arrowKeys.includes(event.key)) {
      event.preventDefault();
      event.persist();
      delayedKeyDown({
        activeCell,
        columnsLength,
        event,
        refActivePage,
        refVirtualizeRows,
        rowHeight: rowHeightValue,
        rowsLength,
        setActiveCell,
        onKeyDownArrow,
      });
    }
  }

  const handleRowExpand = row => () => {
    onExpandedRow(row);
  };

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  /* eslint-disable jsx-a11y/no-noninteractive-tabindex  */
  // need more research about how to treat this case we is not a button but we need the click
  /* eslint-disable react/no-array-index-key */
  // when rendering the keys for the cell we need to use the index no other way to have an unique key

  return (
    <div onKeyDown={handleKeyDown} tabIndex="0">
      <styled.HeaderRow isHeaderRow $height={rowHeightValue}>
        <styled.Counter>
          <styled.Check>
            <input type="checkbox" />
          </styled.Check>
          <styled.Expand />
        </styled.Counter>
        {visibleColumnsOrder.map((columnId, columnIndex) => {
          const column = columns[columnId];
          const { header: headerProp, width, isHidden } = column;
          if (isHidden) return null;
          return (
            <CellStyled
              role="columnheader"
              isHeaderStyledCell
              key={`cell_${columnIndex}`}
              $width={width}
              $height={rowHeightValue}
            >
              {typeof headerProp === "function" ? headerProp(column) : headerProp}
              <Options columnId={columnId} />
            </CellStyled>
          );
        })}
      </styled.HeaderRow>
      <VirtualizeRows
        data={dataForRendering}
        gridRowHeight={rowHeightValue}
        gridLength={data.length}
        gridHeight={height}
        gridWidth={width}
        gridFooter={LoadMoreButton}
        ref={refVirtualizeRows}
      >
        {(subset, keys, a11y) => {
          // this information will help to calculated next and previous ArrowUp and ArrowDown
          refActivePage.current.from = keys[0];
          refActivePage.current.to = keys[keys.length - 1];
          refActivePage.current.subset = subset;

          return (
            <>
              {subset.map((row, rowIndex) => {
                const rowKey = `row_${keys[rowIndex]}`;
                return (
                  <styled.Row
                    onMouseEnter={handleMouseEnter(row, rowIndex, keys)}
                    onMouseLeave={handleMouseLeave(row, rowIndex, keys)}
                    {...a11y.row}
                    $height={rowHeightValue}
                    key={rowKey}
                  >
                    <styled.Counter key={`row_index_${keys[rowIndex]}`}>
                      <styled.Check>
                        <CheckBox indexRowOnMouseEnter={activeRowOnMouseEnter.index} index={keys[rowIndex]} />
                      </styled.Check>
                      <styled.Expand>
                        <RawButton onClick={handleRowExpand(row)}>⇗</RawButton>
                      </styled.Expand>
                    </styled.Counter>
                    {visibleColumnsOrder.map((columnId, cellIndex) => {
                      const column = columns[columnId];
                      const { cell, width, isHidden } = column;
                      const index = `${keys[rowIndex]}_${cellIndex}`;
                      if (isHidden) return null;
                      return (
                        <Cell
                          key={`cell_${index}`}
                          a11yProps={a11y.cell}
                          width={width}
                          height={rowHeightValue}
                          cellIndex={index}
                          activeCellIndex={activeCell.index}
                          setActiveCell={setActiveCell}
                          cell={cell}
                          onClickCell={onClickCell}
                          refActivePage={refActivePage}
                        >
                          {typeof cell === "function" ? cell(row) : row[cell]}
                        </Cell>
                      );
                    })}
                  </styled.Row>
                );
              })}
            </>
          );
        }}
      </VirtualizeRows>
    </div>
  );
}
/* eslint-enable react/no-array-index-key */

VirtualizedTable.propTypes = propTypes;
VirtualizedTable.defaultProps = defaultProps;
