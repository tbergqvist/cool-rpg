import * as React from "react";

import { observer } from "mobx-react";

import { System } from "../model/system";
import { RouteView } from "./route-view";

export const AppView = observer(
  ({system}: {system: System}) => {
    return (
      <div className="main">
        <RouteView route={system.currentRoute()}/>
        <RouteView route={system.currentPopup()}/>
      </div>
    );
  }
);