import React, { JSX } from "react";

import { Textarea } from "@nextui-org/react";

interface PropsParams {
  children?: JSX.Element;
  label: string;
  input?: JSX.Element;
  icon?: JSX.Element;
  errors?: JSX.Element;
  helpText?: string;
  isClearable?: boolean;

  register: {
    [x: string]: any;
  };
}

export const TextAreaSimple = ({
  label,
  input,
  icon,
  errors,
  register,
  helpText,
  isClearable = false,
}: PropsParams) => {
  return (
    <div className="mb-4 w-full">
      <div className="relative mt-3 rounded-md">
        <div className="relative">
          <Textarea
            label={label}
            {...register}
            placeholder={`Ingrese: ${label}`}
            labelPlacement="outside"
            variant="bordered"
            autoComplete="off"
            startContent={icon}
            className="text-black"
          />
        </div>
        {helpText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
      </div>
      {errors}
    </div>
  );
};
