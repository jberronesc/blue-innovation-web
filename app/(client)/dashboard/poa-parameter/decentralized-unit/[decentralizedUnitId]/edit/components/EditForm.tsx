"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsEdit, ButtonCancelHref } from "@component/button";
import DecentralizedUnitConst from "@poaparameter/decentralized-unit/domain/constantClient";
import {
  DecentralizedUnitEditType,
  DecentralizedUnitEditSchema,
} from "@poaparameter/decentralized-unit/domain/schemas";
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { ViewModelBackUrl } from "@viewM/index";
import { Form } from "@/app/(client)/shared/ui/shadcn/ui/form";
import DecentralizedUnitInputs from "@poaparameter/decentralized-unit/domain/components/DecentralizedUnitInputs";
import { DecentralizedUnitFindEntity } from "@poaparameter/decentralized-unit/domain/interfaces/DecentralizedUnitFindEntity";

const constant = DecentralizedUnitConst;

export default function DecentralizedUnitEditForm({
  registerToEdit,
}: {
  registerToEdit: DecentralizedUnitFindEntity;
}) {
  const form = useForm<DecentralizedUnitEditType>({
    resolver: zodResolver(DecentralizedUnitEditSchema),
    defaultValues: registerToEdit,
  });

  const vmLoading = ViewModelLoading({});
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  });

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = form.getValues();
      vmLoading.loadingSimple();

      return (
        await new FetchPATCHTokenBlueI({
          url: `/poa-parameter/v1/decentralized-units/${registerToEdit.id}/update`,
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async () => {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(openModal)} className="space-y-8">
          <DecentralizedUnitInputs form={form} />
          <ButtonsEdit>
            <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
          </ButtonsEdit>
        </form>
      </Form>
    </>
  );
}
