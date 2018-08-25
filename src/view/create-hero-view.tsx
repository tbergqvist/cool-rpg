import * as React from "react";
import { observer } from "mobx-react";

import { System } from "../model/system";
import { CreateHeroFormData, CreateHeroForm } from "./create-hero-form";

export const CreateHeroView = observer(
  ({system}: {system: System}) => {
    function createClicked() {
      system.createHero();
    }

    return (
      <div>
        Create a hero!
        <CreateHeroForm formData={new CreateHeroFormData()} callback={createClicked}/>
      </div>
    );
  }
);