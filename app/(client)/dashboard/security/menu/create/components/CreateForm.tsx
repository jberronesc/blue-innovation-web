"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsCreate, ButtonCancelHref } from "@component/button";
import MenuConst from "@security/menu/domain/constantClient";
import {
  MenuCreateType,
  MenuCreateSchema,
} from "@security/menu/domain/schemas";
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { ViewModelBackUrl } from "@viewM/index";
import { Form } from "@/app/(client)/shared/ui/shadcn/ui/form";
import MenuInputs from "@security/menu/domain/components/MenuInputs";

const constant = MenuConst;

export default function MenuCreateForm() {
  const form = useForm<MenuCreateType>({
    resolver: zodResolver(MenuCreateSchema),
    defaultValues: {
      name: "",
      icon: "",
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
          url: "/security/v1/menus/create",
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
          <MenuInputs form={form} />
          <ButtonsCreate>
            <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
          </ButtonsCreate>
        </form>
      </Form>
    </>
  );
}
