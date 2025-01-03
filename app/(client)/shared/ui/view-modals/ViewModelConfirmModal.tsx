"use client";
import React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../shadcn/ui/dialog";
import { Button } from "../shadcn/ui/button";

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
      <Dialog
        open={show}
        onOpenChange={(open) => {
          if (open) return;
          onCancelWrapper();
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmacion</DialogTitle>
            <DialogDescription>
              Estas seguro de realizar la siguiente accion?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4"></div>
          <DialogFooter>
            <Button onClick={onSuccessWrapper}>Si, estoy seguro.</Button>
            <Button variant="destructive" onClick={onCancelWrapper}>
              No, cancelar.
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  };
};
