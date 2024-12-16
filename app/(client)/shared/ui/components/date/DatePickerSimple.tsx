import React, { JSX } from "react";
import { IconCalendar } from "@tabler/icons-react";
import { DatePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { CalendarDate, parseDate } from "@internationalized/date";

interface PropsParams {
  children?: JSX.Element;
  label: string;
  icon?: JSX.Element;
  errors?: JSX.Element;
  helpText?: string;

  defaultValue?: string;
  minValue?: string;
  maxValue?: string;
  // onChange: (e: DateValue) => void;
  onChange: (value: CalendarDate | null) => void;
}

export const DatePickerSimple = ({
  label,
  icon,
  errors,
  helpText,
  defaultValue,
  minValue,
  maxValue,
  onChange,
}: PropsParams) => {
  const getDateCalendar = (date: string | undefined) => {
    if (!date) return undefined;
    return parseDate(date);
  };

  const getDefaultDate = () => getDateCalendar(defaultValue);
  const getMinValue = () => getDateCalendar(minValue);
  const getMaxValue = () => getDateCalendar(maxValue);

  return (
    <div className="mb-4">
      <div className="relative mt-10 rounded-md">
        <div className="relative">
          {
            // locale={locale}
          }
          <I18nProvider locale={"es-EC"}>
            <DatePicker
              label={label}
              startContent={
                icon || <IconCalendar className="form-input-group-icon" />
              }
              variant="bordered"
              labelPlacement="outside"
              defaultValue={getDefaultDate()}
              minValue={getMinValue()}
              maxValue={getMaxValue()}
              onChange={onChange}
              className="text-black"
            />
          </I18nProvider>
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
