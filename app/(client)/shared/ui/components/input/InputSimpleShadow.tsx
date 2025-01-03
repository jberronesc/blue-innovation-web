import React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../shadcn/ui/form";
import { Input } from "../../shadcn/ui/input";

interface PropsParams {
  children?: JSX.Element;
  label: string;
  control: any;
  helpText?: string;
  input: {
    name: string;
    placeHolder?: string;
  };
}

export const InputSimpleShadow = ({
  label,
  control,
  helpText,
  input,
}: PropsParams) => {
  return (
    <FormField
      control={control}
      name={input.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={input.placeHolder || `Ingrese: ${label}`}
              {...field}
            />
          </FormControl>
          {helpText && <FormDescription>{helpText}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
