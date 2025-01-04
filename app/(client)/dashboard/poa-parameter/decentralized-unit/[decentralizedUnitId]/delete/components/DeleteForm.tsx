"use client";

import { ButtonsDelete, ButtonCancelHref } from "@component/button";
import DecentralizedUnitConst from "@poaparameter/decentralized-unit/domain/constantClient";
import { DecentralizedUnitFindEntity } from "@poaparameter/decentralized-unit/domain/interfaces/DecentralizedUnitFindEntity";
import { FetchDELETETokenBlueI } from "@utils/fetch/fetchBlueInnovation";
import { ViewModelBackUrl } from "@viewM/index";
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal";
import { ViewModelLoading } from "@viewM/ViewModelLoading";

const constant = DecentralizedUnitConst;

export default function DecentralizedUnitDeleteForm({
  registerToEdit,
}: {
  registerToEdit: DecentralizedUnitFindEntity;
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
          url: `/poa-parameter/v1/decentralized-units/${registerToEdit.id}/delete`,
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async () => {
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
