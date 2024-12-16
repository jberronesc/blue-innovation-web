"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ButtonCancelHref, ButtonsCreate } from "@component/button"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import { ExerciseNextCreateInfoEntity } from "@contad/exercise/domain/interfaces/ExerciseNextCreateInfoEntity"
import ExerciseConst from "@contad/exercise/domain/constantClient"
import {
  ExerciseCreateType,
  ExerciseCreateSchema,
} from "@contad/exercise/domain/schemas"
import { ViewModelBackUrl } from "@viewM/index"

const constant = ExerciseConst

export default function ExerciseCreateForm({
  exerciseNextCreateInfo,
}: {
  exerciseNextCreateInfo: ExerciseNextCreateInfoEntity
}) {
  const { handleSubmit, getValues } = useForm<ExerciseCreateType>({
    resolver: zodResolver(ExerciseCreateSchema),
  })

  const vmLoading = ViewModelLoading({})
  const vmBackUrl = ViewModelBackUrl({
    persists: constant.getPerst(),
    urlBack: constant.listUrl({}),
  })

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/contad/v1/exercises/create",
          body: { ...data },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          vmBackUrl.goBackSimple()
        }
      )
    },
  })

  return (
    <>
      {modal}
      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <span className="text-black text-2xl">
            Crear ejercicio: {exerciseNextCreateInfo.year}
          </span>
        </div>
        <ButtonsCreate>
          <ButtonCancelHref href={vmBackUrl.urlCompleteBack} />
        </ButtonsCreate>
      </form>
    </>
  )
}
