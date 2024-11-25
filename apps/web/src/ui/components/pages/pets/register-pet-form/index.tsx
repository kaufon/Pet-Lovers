import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import React from "react";

interface RegisterPetFormProps {
  isOpen: boolean;
  isClosed: () => void;
  isRegister?: boolean;
}

export const RegisterPetForm = ({
  isOpen,
  isClosed,
  isRegister = true, // Default value for isRegister
}:RegisterPetFormProps) => {
  return (
    <Modal isOpen={isOpen} onClose={isClosed}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader>
              <div className="w-full flex justify-between items-center">
                <h1>{isRegister ? "Registrar Pet" : "Atualizar Pet"}</h1> {/* Conditional header text */}
              </div>
            </ModalHeader>
            <ModalBody>
              <Input label="Nome" />
              <Input label="Raça" />
              <Select label="Gênero do Pet">
                <SelectItem key="Male">Macho</SelectItem>
                <SelectItem key="Female">Fêmea</SelectItem>
              </Select>
              <Select label="Tipo do Pet">
                <SelectItem key="Dog">Cachorro</SelectItem>
                <SelectItem key="Cat">Gato</SelectItem>
                <SelectItem key="Lizard">Réptil</SelectItem>
              </Select>
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



