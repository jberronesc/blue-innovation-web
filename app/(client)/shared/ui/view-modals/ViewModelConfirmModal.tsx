"use client";
import React from "react";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../shadcn/ui/alert-dialog";

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
    if (onCancel) onCancel();
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
      <AlertDialog open={show}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmacion?</AlertDialogTitle>
            <AlertDialogDescription>
              Estas seguro de realizar la siguiente accion?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancelWrapper}>
              No, cancelar.
            </AlertDialogCancel>
            <AlertDialogAction onClick={onSuccessWrapper}>
              Si, estoy seguro.
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  };
};
