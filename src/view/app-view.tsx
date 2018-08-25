import * as React from "react";

import { observer } from "mobx-react";

import { System } from "../model/system";
import { RouteView } from "./route-view";
import { StatusView } from "./status-view";

export const AppView = observer(
  ({system}: {system: System}) => {
    return (
      <div className="main">
        <StatusView system={system}/>
        <RouteView route={system.currentRoute}/>
        <RouteView route={system.currentPopup}/>
      </div>
    );
  }
);