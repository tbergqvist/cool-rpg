import { RatQuest } from "../quests/rat-quest";
import { System } from "../system";
import { DialogMessage, message, DialogResponseTuple } from "./dialog-controller";
import { RatQuestState } from "../model";

export function ratGuyDialog(system: System, ratQuest: RatQuest): () => DialogMessage {
  const byeMessage: DialogResponseTuple = ["Bye", () => system.gotoVillage() || undefined];

  return () => {
    switch (ratQuest.state) {
      case RatQuestState.NotStarted:
        return questNotStarted();
      case RatQuestState.Started:
        return questStarted();
      case RatQuestState.RatKilled:
      case RatQuestState.RatLeft:
        return giveReward();
      case RatQuestState.Finished:
        return questFinished();
      default:
        return message("Nice", [byeMessage]);
    }
  }

  function questNotStarted() {
    return message(
      "My basement is filled with rats, please help me!", [
        ["Ok", acceptQuest],
        byeMessage
      ]
    );

    function acceptQuest() {
      ratQuest.start();
      return message("Thanks man!", [byeMessage]);
    }
  }

  function questStarted() {
    return message(
      "Please go to my basement and deal with the rats!", [
        byeMessage
      ]
    );
  }

  function giveReward() {
    ratQuest.finish();
    return message(
      "Thanks man, here's your reward!", [
        byeMessage
      ]
    );
  }

  function questFinished() {
    return message(
      "Thanks again for helping me with the rat!", [
        byeMessage
      ]
    );
  }
}

