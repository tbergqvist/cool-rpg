import * as React from "react";
import { observer } from "mobx-react";

import { Route } from "../model/route";

export const RouteView = observer(
  ({route}: {route: Route<any> | null}) => {
    if (route == null) {
      return null;
    }

    let {component: CurrentRoute, parameters} = route;
    return <CurrentRoute {...parameters}></CurrentRoute>;
  }
);