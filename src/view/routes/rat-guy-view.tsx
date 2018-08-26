import * as React from "react";
import { observer } from "mobx-react";

import { DialogView } from "./dialog-view";
import { DialogController } from "../../model/dialog/dialog-controller";

export const RatGuyView = observer(
  ({dialogController}: {dialogController: DialogController}) => {
    return (
      <div id="rat-guy">
        <DialogView dialog={dialogController}/>
      </div>
    );
  }
);