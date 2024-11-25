import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

interface AlertModalProps {
  isOpen: boolean;
  isClosed: VoidFunction
  onConfirm: VoidFunction
}

export const AlertModal  = ({ isOpen, isClosed,onConfirm }:AlertModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={isClosed}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader>
              <div className="w-full flex justify-between items-center">
                <h1>Você Tem certeza?</h1>
              </div>
            </ModalHeader>
            <ModalBody>
              <p>Essa é uma ação permanente e não poderá ser revertida.</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                className="text-red-600 bg-opacity-20"
                onPress={onClose}
              >
                Cancelar
              </Button>
              <Button
                color="success"
                className="text-green-600 bg-opacity-20"
                onPress={onConfirm}
              >
                Confirmar
              </Button>
            </ModalFooter>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};


