/*
 *
 * Package: `@exsys-clinio/date-picker`.
 *
 */
import { memo, useCallback, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useTranslateIdFactory } from "@exsys-clinio/labels-provider";
import FloatLabel from "@exsys-clinio/labeled-input";
import { onChangeEvent } from "@exsys-clinio/types";
import { StyledDatePicker } from "./styled";

interface DatePickerProps {
  onChange?: onChangeEvent;
  name: string;
  value?: string;
  placeholder?: string;
  width?: string;
  label?: string;
  margin?: string;
  labelType?: "inlined";
  error?: string;
  forceFloatingLabel?: boolean;
  disabledDate?: (currentDate: Dayjs) => boolean;
  disabled?: boolean;
  allowClear?: boolean;
}

const format = "DD-MM-YYYY";

const DatePicker = ({
  onChange,
  name,
  value,
  placeholder,
  width,
  label,
  margin,
  labelType,
  error,
  forceFloatingLabel,
  disabledDate,
  ...resetProps
}: DatePickerProps) => {
  const translateLabels = useTranslateIdFactory();

  const translatedPlaceHolder = useMemo(() => {
    if (typeof placeholder === "string" && !!placeholder) {
      return translateLabels(placeholder as string);
    }

    return undefined;
  }, [placeholder, translateLabels]);

  const dateComponentExtraProps = useMemo(() => {
    if (!label) {
      return {
        width,
        error,
        margin,
        title: error ? translateLabels(error as string) : undefined,
      };
    }

    return null;
  }, [error, label, margin, translateLabels, width]);

  const handleChange = useCallback(
    (date?: Dayjs) => onChange?.({ name, value: date?.format(format) }),
    [onChange, name]
  );

  const formattedValue = useMemo(
    () => (value ? dayjs(value, format) : undefined),
    [value]
  );

  const dateComponent = (
    <StyledDatePicker
      // {...actualDateType}
      onChange={handleChange}
      value={formattedValue}
      format={format}
      placeholder={translatedPlaceHolder as string}
      {...resetProps}
      {...dateComponentExtraProps}
      disabledDate={disabledDate}
    />
  );

  switch (!!label) {
    case true:
      return (
        <FloatLabel
          width={width}
          label={label as string}
          margin={margin}
          value={value}
          type={labelType}
          error={error}
          forceFloatingLabel={forceFloatingLabel}
        >
          {dateComponent}
        </FloatLabel>
      );

    default:
      return dateComponent;
  }
};

export default memo(DatePicker);
