import { InputSimpleShadow } from "@component/input/InputSimpleShadow";
import React from "react";

const MenuInputs = ({ form }: { form: any }) => {
  return (
    <>
      <InputSimpleShadow
        control={form.control}
        label="Nombre"
        input={{ name: "name" }}
      />
      <InputSimpleShadow
        control={form.control}
        label="Icono"
        input={{ name: "icon" }}
      />
    </>
  );
};

export default MenuInputs;
