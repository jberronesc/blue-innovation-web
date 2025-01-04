"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsCreate, ButtonCancelHref } from "@component/button";
import DecentralizedUnitConst from "@poaparameter/decentralized-unit/domain/constantClient";
import {
  DecentralizedUnitCreateType,
  DecentralizedUnitCreateSchema,
} from "@poaparameter/decentralized-unit/domain/schemas";
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { ViewModelBackUrl } from "@viewM/index";
import { Form } from "@/app/(client)/shared/ui/shadcn/ui/form";
import DecentralizedUnitInputs from "@poaparameter/decentralized-unit/domain/components/DecentralizedUnitInputs";

const constant = DecentralizedUnitConst;

export default function DecentralizedUnitCreateForm() {
  const form = useForm<DecentralizedUnitCreateType>({
    resolver: zodResolver(DecentralizedUnitCreateSchema),
    defaultValues: {
      code: "",
      description: "",
    },
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
        await new FetchPOSTTokenBlueI({
          url: "/poa-parameter/v1/decentralized-units/create",
          body: {
            ...data,
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async () => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." });
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
          <ButtonsCreate>
            <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
          </ButtonsCreate>
        </form>
      </Form>
    </>
  );
}
