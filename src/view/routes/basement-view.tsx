import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../../model/system";

export const BasementView = observer(
  ({system}: {system: System}) => {

    function onKillRatClicked() {
      system.quests.ratQuest.killRat();
      system.gotoVillage();
    }

    function onAskRatToLeaveClicked() {
      system.quests.ratQuest.letRatLeave();
      system.gotoVillage();
    }

    return (
      <div id="basement">
      <div className="dialog-bar">
          WOOO
          <ul className="dialog-responses">
            <li onClick={onKillRatClicked}>
              Kill rat
            </li>
            <li onClick={onAskRatToLeaveClicked}>
              Ask rat to kindly leave
            </li>
          </ul>
        </div>
      </div>
    );
  }
);