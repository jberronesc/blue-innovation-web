"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsEdit, ButtonCancelHref } from "@component/button";
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
import { Form } from "@/app/(client)/shared/ui/shadcn/ui/form";
import BodyInputs from "@poaparameter/body/domain/components/BodyInputs";

const constant = BodyConst;

export default function BodyEditForm({
  registerToEdit,
}: {
  registerToEdit: BodyFindEntity;
}) {
  const form = useForm<BodyEditType>({
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
      const data = form.getValues();
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
          <BodyInputs form={form} />
          <ButtonsEdit>
            <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
          </ButtonsEdit>
        </form>
      </Form>
    </>
  );
}
