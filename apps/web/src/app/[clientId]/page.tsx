import { notFound } from "next/navigation";
import { NextApiClient } from "../../api/next/clients";
import { ClientsService } from "../../api/services";
import { ClientPage } from "../../ui/components/pages/client";

type PageProps = {
  params: {
    clientId: string;
  };
};
const Page = async ({ params }: PageProps) => {
  const apiClient = NextApiClient({ isCacheEnabled: false });
  apiClient.setBaseUrl("http://localhost:3333");
  const clientService = ClientsService(apiClient);
  const reponse = await clientService.getClientDetails(params.clientId);
  return <ClientPage client={reponse.body.client} consumptions={reponse.body.consumptions} />;
};
export default Page;
