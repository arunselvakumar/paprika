import React from "react";
import ListBox, { useListBoxWithTags } from "../../../src/WithTags";
import AllOptionsAreSelectedOpen from "./AllOptionsAreSelected";

const defaultData = [
  { name: "jack" },
  { name: "Rezzoch" },
  { name: "Thrull" },
  { name: "June Del Toro" },
  { name: "Skaelka" },
];

export function Open() {
  const { isSelected, filteredData, getSelectedOptions, ...moreProps } = useListBoxWithTags({
    key: "name",
    defaultData,
    defaultFilteredData: defaultData,
    defaultSelectedKeys: ["June Del Toro"],
    filterAttribute: "name",
  });

  const selectedOptions = getSelectedOptions();
  return (
    <div style={{ padding: "32px" }}>
      <ListBox
        noResultsMessage="No results found, but you can add an email and then press enter..."
        selectedOptions={selectedOptions}
        pillLabelKey="name"
        {...moreProps}
        isOpen
      >
        {filteredData.map(option => {
          return !isSelected(option.name) ? <ListBox.Option label={option.name}>{option.name}</ListBox.Option> : null;
        })}
      </ListBox>
    </div>
  );
}

export function Selected() {
  const { isSelected, filteredData, getSelectedOptions, ...moreProps } = useListBoxWithTags({
    key: "name",
    defaultData,
    defaultFilteredData: defaultData,
    defaultSelectedKeys: ["jack", "Rezzoch", "Thrull", "June Del Toro", "Skaelka"],
    filterAttribute: "name",
  });

  const selectedOptions = getSelectedOptions();
  return (
    <div style={{ padding: "32px" }}>
      <ListBox
        noResultsMessage="No results found, but you can add an email and then press enter..."
        selectedOptions={selectedOptions}
        pillLabelKey="name"
        {...moreProps}
        isOpen
      >
        {selectedOptions.length === defaultData.length ? (
          <ListBox.RawItem>All options has been selected</ListBox.RawItem>
        ) : null}
        {filteredData.map(option => {
          return !isSelected(option.name) ? <ListBox.Option label={option.name}>{option.name}</ListBox.Option> : null;
        })}
      </ListBox>
    </div>
  );
}

export function AllOptionsAreSelected() {
  return <AllOptionsAreSelectedOpen />;
}
