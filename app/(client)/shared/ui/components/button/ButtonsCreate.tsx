import React, { JSX } from "react";
import { Button } from "@nextui-org/button";

interface PropsParams {
  children: JSX.Element;

  saveLabel?: string;
  left?: JSX.Element;
  center?: JSX.Element;
}

export const ButtonsCreate = (props: PropsParams) => {
  const { saveLabel = "Guardar registro" } = props;
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <div className="">{props.left}</div>
      <div className="">{props.center}</div>
      <div className="flex justify-end gap-3">
        {props.children}
        <Button type="submit" variant="shadow" color="primary">
          {saveLabel}
        </Button>
      </div>
    </div>
  );
};
