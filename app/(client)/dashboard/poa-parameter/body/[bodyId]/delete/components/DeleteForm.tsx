"use client";

import { ButtonsDelete, ButtonCancelHref } from "@component/button";
import BodyConst from "@poaparameter/body/domain/constantClient";
import { BodyFindEntity } from "@poaparameter/body/domain/interfaces/BodyFindEntity";
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelBackUrl } from "@viewM/index";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";

const constant = BodyConst;

export default function BodyDeleteForm({
  registerToEdit,
}: {
  registerToEdit: BodyFindEntity;
}) {
  const vmLoading = ViewModelLoading({});
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  });

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      vmLoading.loadingSimple();

      return (
        await new FetchDELETETokenBlueI({
          url: `/poa-parameter/v1/bodies/${registerToEdit.id}/delete`,
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro eliminado con exito!" });
          vmBackUrl.goBackSimple();
        },
      );
    },
  });

  return (
    <>
      {modal}
      <div>
        <ButtonsDelete onClick={() => openModal()}>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsDelete>
      </div>
    </>
  );
}
