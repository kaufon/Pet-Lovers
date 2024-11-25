"use client";
import { Pen, Trash } from "lucide-react";
import React, { useState } from "react";
import { RegisterServiceForm } from "./register-service-form";
import { ServicesTable } from "./services-table";
import { useServicesPage } from "./use-services-page";
import { Drawer } from "../../commons/drawer";
import { Button } from "@nextui-org/button";

export const ServicesPage = () => {
  const {
    services,
    isFetching,
    handleUpdateService,
    handleRegisterServiceFormSubmit,
    handleDeleteServiceAlertDialogConfirm,
  } = useServicesPage();

  return (
    <>
      <div className=" space-y-4">
        <div className="flex w-full items-center p-4  justify-center">
          <Drawer trigger={<Button color="primary" size="lg" radius="lg" className="w-60">Adicionar Servico</Button>}>
            {(closeDrawer) => (
              <RegisterServiceForm
                onSubmit={async () => {
                  await handleRegisterServiceFormSubmit();
                  closeDrawer();
                }}
                onCancel={closeDrawer}
              />
            )}
          </Drawer>
        </div>
        <ServicesTable
          handleDeleteService={handleDeleteServiceAlertDialogConfirm}
          isLoading={isFetching}
          services={services}
          onUpdateService={handleUpdateService}
        />
      </div>
    </>
  );
};
