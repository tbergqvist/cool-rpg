import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../../model/system";

export const QuestsPopupView = observer(
  ({system}: {system: System}) => {
    return (
      <div className="quests-popup">
        <div className="popup-content">
          <h4>Quests:</h4>
          <ul className="quest-list">
            {system.quests.activeQuests.map(quest => (
              <li key={quest.name}>
                <div>{quest.name}</div>
              </li>
            ))}
          </ul>
          <button onClick={()=>system.closePopup()}>Close</button>
        </div>
      </div>
    );
  }
);