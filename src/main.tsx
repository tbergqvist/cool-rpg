import * as React from "react";
import * as ReactDom from "react-dom";

import { System } from "./model/system";
import { AppView } from "./view/app-view";
import { getGameModel } from "./model/model";

let system = new System(getGameModel());

function render() {
  ReactDom.render(
    <AppView system={system} />,
  document.getElementById("app")!);
}

setTimeout(()=> {
  render();
});