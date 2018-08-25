import * as React from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";

export class CreateHeroFormData {
  @observable
  name: string = "";
}

export const CreateHeroForm = observer(
  ({formData, callback}: {formData: CreateHeroFormData, callback: (formData: CreateHeroFormData)=>void}) => {
    function createClicked() {
      callback(formData);
    }

    return (
      <div>
        <label>Name:</label><input value={formData.name} onChange={(e: any)=> {formData.name = e.target.value}} />
        <button onClick={createClicked}>Create!</button>
      </div>
    );
  }
);