import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../model/system";
import { Wallet } from "../model/wallet";
import { Hero } from "../model/hero";

export const StatusView = observer(
  ({ system, wallet, hero }: { system: System, wallet: Wallet, hero: Hero }) => {
    function onQuestsClicked() {
      system.showQuestsPopup();
    }

    return (
      <div className="status-view">
      <div className="status-view-section">
        <span>Name: </span>
        <span>{hero.name}</span>
      </div>
      <div className="status-view-section">
        <span>Money: </span>
        <span>${wallet.money}</span>
      </div>
      <div className="status-view-section">
        <a onClick={onQuestsClicked}>Quests</a>
      </div>
      </div>
    );
  }
);