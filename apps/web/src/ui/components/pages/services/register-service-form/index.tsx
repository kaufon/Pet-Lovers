import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";

interface RegisterServiceFormProps {
  isOpen: boolean;
  isClosed: () => void;
  isRegister: boolean;
}

export const RegisterServiceForm = ({
  isOpen,
  isClosed,
  isRegister,
}: RegisterServiceFormProps) => {
  return (
    <Modal isOpen={isOpen} onClose={isClosed}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader>
              <div className="w-full flex justify-between items-center">
                <h1>
                  {isRegister ? "Registrar Serviço" : "Atualizar Serviço"}
                </h1>
              </div>
            </ModalHeader>
            <ModalBody>
              <Input label="Nome" />
              <Input label="Preço" />
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
                onPress={onClose}
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
