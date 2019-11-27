import React from "react";
import PropTypes from "prop-types";
import * as styled from "./Cell.styles";
import getRow, { getCoordinatesByCellIndex } from "../../helpers/getRow";

const propTypes = {
  a11yProps: PropTypes.shape({}).isRequired,
  activeCellIndex: PropTypes.string,
  cellIndex: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  height: PropTypes.number.isRequired,
  setActiveCell: PropTypes.func.isRequired,
  width: PropTypes.string,
  onClickCell: PropTypes.func,
  refActivePage: PropTypes.shape({ current: PropTypes.shape({}) }).isRequired,
};

const defaultProps = {
  width: null,
  activeCellIndex: null,
  onClickCell: () => {},
};

export default function Cell(props) {
  const {
    a11yProps,
    activeCellIndex,
    cellIndex,
    refActivePage,
    children,
    height,
    setActiveCell,
    width,
    onClickCell,
  } = props;

  function handleClickCell() {
    if (activeCellIndex !== cellIndex) {
      setActiveCell({
        index: cellIndex,
      });
    }

    const coordinate = getCoordinatesByCellIndex(cellIndex);
    const row = getRow({ row: coordinate.row, refActivePage });
    // coordinate includes row number and cell number
    onClickCell(coordinate, row);
  }

  return (
    <styled.Cell
      {...a11yProps}
      $width={width}
      $height={height}
      data-pka-cell-index={cellIndex}
      cellIndex={cellIndex}
      activeCellIndex={activeCellIndex}
      onClick={handleClickCell}
    >
      {children}
    </styled.Cell>
  );
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;
