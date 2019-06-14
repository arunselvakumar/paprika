import React from "react";
import PropTypes from "prop-types";
// import TimesCircleIcon from "@paprika/icon/lib/TimesCircle";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import sortableItemsStyles from "./SortableItems.styles";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
  children: null,
};

const SortableItems = props => {
  let childs = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, { ...child.props, id: index });
  });

  const handleDragEnd = result => {
    const { source, destination } = result;
    if (destination && source.index !== destination.index) {
      const moved = childs.splice(source.index, 1);
      childs.splice(destination.index, 0, moved);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable-0">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            css={sortableItemsStyles}
          >
            {childs &&
              React.Children.map(childs, (child, index) => {
                return (
                  <Draggable draggableId={`draggable-${child.props.id}`} key={child.props.id} index={index}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          css={props => `
                            display: flex;
                            line-height: 32px;
                            margin: 0 0 10px 0;
                            &:last-child {
                              margin-bottom: 0;
                            }
                            &,
                            * {
                              box-sizing: border-box;
                            }

                          `}
                        >
                          <span
                            css={`
                              background: #aaa;
                              padding: 0 10px;
                            `}
                          >
                            {index}
                          </span>
                          <span
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                            css={props => `
                              display: flex;
                              flex-grow: 1;
                              height: 32px;
                              background: #ddd;
                              border: 1px solid #bbb;
                              ${
                                props.isDragging
                                  ? "border-color: #888; box-shadow: 0 2px 4px rgba(150,150,150,0.5);"
                                  : null
                              }
                            `}
                          >
                            <span
                              {...provided.dragHandleProps}
                              css={`
                                background: #ccc;
                                padding: 0 10px;
                              `}
                            >
                              :::
                            </span>
                            <span
                              css={`
                                padding: 0 5px;
                              `}
                            >
                              {child}
                            </span>
                          </span>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

SortableItems.displayName = "SortableItems";
SortableItems.propTypes = propTypes;
SortableItems.defaultProps = defaultProps;

export default SortableItems;
