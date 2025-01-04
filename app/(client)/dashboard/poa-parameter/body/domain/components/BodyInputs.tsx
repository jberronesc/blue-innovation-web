import { InputSimpleShadow } from "@component/input/InputSimpleShadow";
import React from "react";

const BodyInputs = ({ form }: { form: any }) => {
  return (
    <>
      <InputSimpleShadow
        control={form.control}
        label="Codigo"
        input={{ name: "code" }}
      />
      <InputSimpleShadow
        control={form.control}
        label="ID Institución/ADM-Fin"
        input={{ name: "description" }}
      />
    </>
  );
};

export default BodyInputs;
