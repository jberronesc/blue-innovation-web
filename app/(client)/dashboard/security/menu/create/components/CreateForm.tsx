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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/(client)/shared/ui/shadcn/ui/form";
import { Input } from "@/app/(client)/shared/ui/shadcn/ui/input";

const constant = MenuConst;

export default function MenuCreateForm() {
  const form = useForm<MenuCreateType>({
    resolver: zodResolver(MenuCreateSchema),
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
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre22</FormLabel>
                <FormControl>
                  <Input placeholder={`Ingrese: Nombre`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ButtonsCreate>
            <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
          </ButtonsCreate>
        </form>
      </Form>
    </>
  );
}
