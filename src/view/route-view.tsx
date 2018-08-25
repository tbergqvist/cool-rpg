import * as React from "react";
import { observer } from "mobx-react";

import { Route } from "../model/route";

export const RouteView = observer(
  ({route}: {route: Route<any> | undefined}) => {
    if (route == undefined) {
      return null;
    }

    let {component: CurrentRoute, parameters} = route;
    return <CurrentRoute {...parameters}></CurrentRoute>;
  }
);