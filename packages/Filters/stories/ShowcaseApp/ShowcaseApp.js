import React from "react";
import Heading from "@paprika/heading";
import Filters, { useFilters } from "../../src";
import data from "./data";
import CustomSingleSelectFilter from "./CustomSingleSelectFilter";

const columnsSettings = [
  {
    id: "goals",
    type: Filters.types.columnTypes.NUMBER,
    label: "Goals",
  },
  {
    id: "name",
    type: Filters.types.columnTypes.TEXT,
    label: "Name",
  },
  {
    id: "status",
    type: Filters.types.columnTypes.TEXT,
    label: "Status",
  },
  { id: "country", label: "Country", type: "TEXT" },
  {
    id: "joined",
    type: Filters.types.columnTypes.DATE,
    label: "Joined by",
    momentParsingFormat: "MM/DD/YYYY",
  },
  {
    id: "shareable",
    type: Filters.types.columnTypes.BOOLEAN,
    label: "Shareable",
  },
  {
    id: "level",
    type: "CUSTOM_SELECT",
    label: "Level",
  },
  {
    id: "position",
    type: Filters.types.columnTypes.SINGLE_SELECT,
    label: "Position",
  },
];

const orderedColumnIds = columnsSettings.map(column => column.id);

const customRulesByType = {
  ...Filters.defaultRulesByType,
  CUSTOM_SELECT: [Filters.rules.IS, Filters.rules.IS_NOT, Filters.rules.IS_EMPTY, Filters.rules.IS_NOT_EMPTY],
};

export default function App() {
  const { filters, filteredData, filterProps, filterItemProps } = useFilters({
    columns: columnsSettings,
    rulesByType: customRulesByType,
    data,
  });

  const renderLevelFilter = () => <CustomSingleSelectFilter />;

  return (
    <React.Fragment>
      <Heading level={2}>Filters showcase</Heading>

      <Filters {...filterProps} columns={columnsSettings} data={data} rulesByType={customRulesByType}>
        {filters.map((filter, index) => (
          <Filters.Item
            {...filterItemProps}
            columnId={filter.columnId}
            id={filter.id}
            index={index}
            key={filter.id}
            label={filter.label}
            renderValueField={filter.columnId === "level" ? renderLevelFilter : null}
            type={filter.type}
            rule={filter.rule}
            value={filter.value}
          />
        ))}
      </Filters>

      <table>
        <thead>
          <tr>
            <th>id</th>
            {orderedColumnIds.map(id => (
              <th key={id}>{id}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {orderedColumnIds.map(id => (
                <td key={id}>{`${item[id]}`}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
