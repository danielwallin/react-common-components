import React from "react";
import { Tab, Tabs } from "./../components";
import { Table } from "./components";
import JsxParser from "react-jsx-parser";
import * as components from "./../components";

const data = require("./out.json");

let comps = {};
for (var key in components) {
  if (components.hasOwnProperty(key)) {
    var element = components[key];
    comps[key] = element;
  }
}

export const Docs = props => {
  return (
    <main>
      <div className="doc container">
        {data &&
          Object.keys(data).map((item, i) => {
            const Component = data[item].description;
            if (data[item].props) {
              return (
                <div className="doc__component" key={i}>
                  <h2 className="doc__title">{data[item].displayName}</h2>
                  <div className="doc__preview doc__container">
                    <h3 className="doc__heading">Preview</h3>
                    <JsxParser components={comps} jsx={data[item].description} />
                  </div>
                  <div className="doc__props doc__container">
                    <h3 className="doc__heading">Props</h3>
                    <Table properties={data[item].props} />
                  </div>
                  {data[item].description && (
                    <div className="doc__code doc__container">
                      <h3 className="doc__heading">Code</h3>
                      <pre className="prettyprint">{data[item].description}</pre>
                    </div>
                  )}
                </div>
              );
            }
          })}
      </div>
    </main>
  );
};
