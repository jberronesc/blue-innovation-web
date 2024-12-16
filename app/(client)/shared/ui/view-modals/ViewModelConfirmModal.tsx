"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useState } from "react";

export const ViewModelConfirmModal = ({
  onSuccess,
  onCancel,
}: {
  onSuccess: () => any;
  onCancel?: () => any;
}) => {
  const [show, setShow] = useState<boolean>(false);

  const onSuccessWrapper = () => {
    onSuccess();
  };
  const onCancelWrapper = () => {
    onCancel && onCancel();
    setShow(false);
  };

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  return {
    setShow,
    openModal,
    closeModal,
    modal: show && (
      <Modal
        isOpen={show}
        placement="top-center"
        onOpenChange={onCancelWrapper}
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">
                Confirmacion
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-between px-1 py-2 text-black">
                  Estas seguro de realizar la siguiente accion?
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="shadow"
                  onPress={onSuccessWrapper}
                >
                  Si, estoy seguro.
                </Button>
                <Button color="danger" onPress={onCancelWrapper}>
                  No, cancelar.
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    ),
  };
};
