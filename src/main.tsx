import * as React from "react";
import * as ReactDom from "react-dom";

import { System } from "./model/system";
import { AppView } from "./view/app-view";
import { LocalStorage } from "./model/localstorage";

let system = new System(LocalStorage.getGameModel());

function render() {
  ReactDom.render(
    <AppView system={system} />,
  document.getElementById("app")!);
}

setTimeout(()=> {
  render();
});