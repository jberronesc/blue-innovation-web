"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsEdit, ButtonCancelHref } from "@component/button";
import { ErrorField } from "@component/form";
import { InputSimple } from "@component/input";
import BodyConst from "@poaparameter/body/domain/constantClient";
import { BodyFindEntity } from "@poaparameter/body/domain/interfaces/BodyFindEntity";
import {
  BodyEditType,
  BodyEditSchema,
} from "@poaparameter/body/domain/schemas";
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { ViewModelBackUrl } from "@viewM/index";

const constant = BodyConst;

export default function BodyEditForm({
  registerToEdit,
}: {
  registerToEdit: BodyFindEntity;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<BodyEditType>({
    resolver: zodResolver(BodyEditSchema),
    defaultValues: registerToEdit,
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
        await new FetchPATCHTokenBlueI({
          url: `/poa-parameter/v1/bodies/${registerToEdit.id}/update`,
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({
            message: "Registro actualizado con exito!",
          });
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
        <ButtonsEdit>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsEdit>
      </form>
    </>
  );
}
