"use client";

import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "@rdtkl/store";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { FetchPOSTTokenBlueW } from "@utils/fetch/fetchBlueWeb";
import AuthSlice from "@rdtkl/slices/authSlice";

type Inputs = {
  month: {
    value: number;
    label: string;
  };
};

const GeneralLedgerSelect = () => {
  const dispatch = useDispatch();
  const vmLoading = ViewModelLoading({});
  const { setValue, control } = useForm<Inputs>();
  const { generalLedgers, generalLedger, exercise } = useSelector(
    (store: AppStore) => store.auth,
  );

  const options = generalLedgers.map((elem) => ({
    value: elem.id,
    label: `${exercise.year} - ${elem.monthDisplay}`,
  }));

  const changeMonth = async ({
    value,
    label,
  }: {
    value: number;
    label: string;
  }) => {
    vmLoading.loadingSimple();

    return (
      await new FetchPOSTTokenBlueW({
        url: `/backend/api/security/auth/v1/select-general-ledger`,
        body: {
          generalLedger: value,
        },
      }).exec()
    ).fold(
      async (error) => {
        vmLoading.errorSimple({ error });
        setValue("month", {
          value: generalLedger.id,
          label: `${exercise.year} - ${generalLedger.monthDisplay}`,
        });
      },
      async (value) => {
        vmLoading.succesSimpleWithoutLoadings({
          message: "Cambiado con exito!.",
        });
        dispatch(
          AuthSlice.actions.updateGeneralLedger({
            generalLedger: value.data.generalLedger,
            accessToken: value.data.accessToken,
          }),
        );
      },
    );
  };

  return (
    <Controller
      name="month"
      control={control}
      defaultValue={
        options.length > 0
          ? options.find((elem) => elem.value == generalLedger?.id)
          : undefined
      }
      render={({ field }) => (
        <Select
          instanceId={1}
          {...field}
          options={options}
          required={true}
          className="min-w-52 text-black"
          onChange={(...event: any[]) => {
            changeMonth(event[0]);
            return field.onChange(...event);
          }}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: 14,
              borderRadius: 20,
              paddingLeft: 6,
            }),
          }}
        />
      )}
    />
  );
};

export default GeneralLedgerSelect;
