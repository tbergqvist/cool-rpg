import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../model/system";

export const StatusView = observer(
  ({system}: {system: System}) => {
    function onQuestsClicked() {
      system.showQuestsPopup();
    }
    return (
      <div className="status-view">
        <a onClick={onQuestsClicked}>Quests</a>
      </div>
    );
  }
);