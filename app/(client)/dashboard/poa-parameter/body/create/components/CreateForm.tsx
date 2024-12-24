"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsCreate, ButtonCancelHref } from "@component/button";
import { ErrorField } from "@component/form";
import { InputSimple } from "@component/input";
import BodyConst from "@poaparameter/body/domain/constantClient";
import {
  BodyCreateType,
  BodyCreateSchema,
} from "@poaparameter/body/domain/schemas";
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { ViewModelBackUrl } from "@viewM/index";

const constant = BodyConst;

export default function BodyCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<BodyCreateType>({
    resolver: zodResolver(BodyCreateSchema),
  });

  const vmLoading = ViewModelLoading({});
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  });

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues();
      vmLoading.loadingSimple();

      return (
        await new FetchPOSTTokenBlueI({
          url: "/poa-parameter/v1/bodies/create",
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." });
          vmBackUrl.goBackSimple();
        },
      );
    },
  });

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <InputSimple
            label="Codigo"
            register={{ ...register("code") }}
            errors={<ErrorField field={errors.code} />}
          />
          <InputSimple
            label="Descripcion"
            register={{ ...register("description") }}
            errors={<ErrorField field={errors.description} />}
          />
        </div>
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  );
}
