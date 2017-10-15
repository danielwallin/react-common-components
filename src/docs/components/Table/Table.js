import React from "react";

export const Table = props => {
  const { properties } = props;

  return (
    <table className="doc__table w-100 table-fixed">
      <thead className="doc__table-head">
        <tr>
          <th className="doc__table-heading left-align">Prop name</th>
          <th className="doc__table-heading left-align">Type</th>
          <th className="doc__table-heading left-align">Default</th>
          <th className="doc__table-heading left-align">Description</th>
        </tr>
      </thead>
      <tbody className="doc__table-body">
        {properties &&
          Object.keys(properties).map((item, i) => {
            const prop = properties[item];
            return (
              <tr key={i}>
                <td className="doc__table-body-name">{item}</td>
                <td className="doc__table-body-type">{prop.type.name}</td>
                <td className="doc__table-body-default">
                  {prop.defaultValue && prop.defaultValue.value}
                  {prop.required && "Required"}
                </td>
                <td className="doc__table-body-description">
                  {prop.description}
                  {prop.type.name == "union" && (
                    <span>
                      One of:{" "}
                      {prop.type.value.map(item => {
                        return `${item.name} `;
                      })}
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
