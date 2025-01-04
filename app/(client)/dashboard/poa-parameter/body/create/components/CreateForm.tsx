"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ButtonsCreate, ButtonCancelHref } from "@component/button";
import BodyConst from "@poaparameter/body/domain/constantClient";
import {
  BodyCreateType,
  BodyCreateSchema,
} from "@poaparameter/body/domain/schemas";
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";
import { ViewModelBackUrl } from "@viewM/index";
import { Form } from "@/app/(client)/shared/ui/shadcn/ui/form";
import { InputSimpleShadow } from "@component/input/InputSimpleShadow";

const constant = BodyConst;

export default function BodyCreateForm() {
  const form = useForm<BodyCreateType>({
    resolver: zodResolver(BodyCreateSchema),
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
          url: "/poa-parameter/v1/bodies/create",
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
        <form onSubmit={form.handleSubmit(openModal)}>
          <InputSimpleShadow
            control={form.control}
            label="Codigo"
            input={{ name: "code" }}
          />
          <InputSimpleShadow
            control={form.control}
            label="Descripcion"
            input={{ name: "description" }}
          />
          <ButtonsCreate>
            <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
          </ButtonsCreate>
        </form>
      </Form>
    </>
  );
}
