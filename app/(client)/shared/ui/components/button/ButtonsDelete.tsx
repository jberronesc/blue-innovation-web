import React from "react";
import { Button } from "../../shadcn/ui/button";

interface PropsParams {
  children: JSX.Element;

  left?: JSX.Element;
  center?: JSX.Element;
  onClick: () => void;
}

export const ButtonsDelete = (props: PropsParams) => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      <div className="">{props.left}</div>
      <div className="">{props.center}</div>
      <div className="flex justify-end gap-3">
        {props.children}
        <Button onClick={props.onClick}>Eliminar registo</Button>
      </div>
    </div>
  );
};
