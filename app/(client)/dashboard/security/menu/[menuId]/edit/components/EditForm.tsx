"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsEdit, ButtonCancelHref } from "@component/button";
import MenuConst from "@security/menu/domain/constantClient";
import { MenuFindEntity } from "@security/menu/domain/interfaces/MenuFindEntity";
import { MenuEditType, MenuEditSchema } from "@security/menu/domain/schemas";
import { FetchPATCHTokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { ViewModelBackUrl } from "@viewM/index";
import { Form } from "@/app/(client)/shared/ui/shadcn/ui/form";
import MenuInputs from "@security/menu/domain/components/MenuInputs";

const constant = MenuConst;

export default function MenuEditForm({
  registerToEdit,
}: {
  registerToEdit: MenuFindEntity;
}) {
  const form = useForm<MenuEditType>({
    resolver: zodResolver(MenuEditSchema),
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
          url: `/security/v1/menus/${registerToEdit.id}/update`,
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
          <MenuInputs form={form} />
          <ButtonsEdit>
            <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
          </ButtonsEdit>
        </form>
      </Form>
    </>
  );
}
