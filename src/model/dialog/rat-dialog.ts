import { RatQuest } from "../quests/rat-quest";
import { System } from "../system";
import { DialogMessage, DialogResponseTuple, message } from "./dialog-controller";
import { RatQuestState } from "../model";

export function ratDialog(system: System, ratQuest: RatQuest): () => DialogMessage {
  const byeMessage: DialogResponseTuple = ["Bye", () => system.router.gotoVillage() || null];

  if (ratQuest.state === RatQuestState.FightStarted) {
    ratQuest.killRat();
    system.router.gotoVillage();
    return ()=> message("BLA", [byeMessage]);
  }

  return () => message("Hi dude!", [
    ["Die monster! (Attack rat)", attackRat],
    ["Please leave, Mr Rat", leaveRat],
    byeMessage,
  ]);

  function attackRat() {
    ratQuest.startFight();
    
    return message("WAAAAAA!!! (rat dies horribly)", [byeMessage]);
  }

  function leaveRat() {
    system.quests.ratQuest.letRatLeave();
    system.router.gotoVillage();
    return message("Cheers mate!", [byeMessage]);
  }
}