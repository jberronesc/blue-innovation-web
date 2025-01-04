import { InputSimpleShadow } from "@component/input/InputSimpleShadow";
import React from "react";

const DecentralizedUnitInputs = ({ form }: { form: any }) => {
  return (
    <>
      <InputSimpleShadow
        control={form.control}
        label="Codigo"
        input={{ name: "code" }}
      />
      <InputSimpleShadow
        control={form.control}
        label="Descripcion"
        input={{ name: "description" }}
      />
    </>
  );
};

export default DecentralizedUnitInputs;
