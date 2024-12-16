"use client"

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react"

import { memo, useState } from "react"

export const ModalSimple = ({
  title,
  show,
  onSuccess,
  onSuccessText = "Si, guardar registro",
  onCancel,
  children,
  isDismissable = true,
}: {
  title: string
  show: boolean
  onSuccess?: () => any
  onSuccessText?: string
  onCancel?: () => any
  children: JSX.Element
  isDismissable?: boolean
}) => {
  const [scrollBehavior, setScrollBehavior] = useState("inside")

  return (
    <Modal
      isOpen={show}
      size="5xl"
      placement="top-center"
      onOpenChange={onCancel}
      backdrop="blur"
      scrollBehavior="inside"
      isDismissable={isDismissable}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-black">
              {title}
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {onSuccess && (
                <Button color="danger" onPress={onSuccess}>
                  {onSuccessText}
                </Button>
              )}
              <Button color="primary" onPress={onCancel}>
                No, cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
