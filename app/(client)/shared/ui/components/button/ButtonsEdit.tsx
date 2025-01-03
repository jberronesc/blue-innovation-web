import React from "react";
import { Button } from "../../shadcn/ui/button";

interface PropsParams {
  children: JSX.Element;

  left?: JSX.Element;
  center?: JSX.Element;
}

export const ButtonsEdit = (props: PropsParams) => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <div className="">{props.left}</div>
      <div className="">{props.center}</div>
      <div className="flex justify-end gap-3">
        {props.children}{" "}
        <Button type="submit" color="primary">
          Guardar registro
        </Button>
      </div>
    </div>
  );
};
