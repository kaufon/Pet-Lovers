import { notFound } from "next/navigation";
import { NextApiClient } from "../../api/next/clients";
import { ClientsService } from "../../api/services";
import { ClientPage } from "../../ui/components/pages/client";

type PageProps = {
  params: {
    clientId: number;
  };
};
const Page = async ({ params }: PageProps) => {
  const apiClient = NextApiClient({ isCacheEnabled: false });
  apiClient.setBaseUrl("http://localhost:32831");
  const clientService = ClientsService(apiClient);
  const reponse = await clientService.getClient(params.clientId);
  if (reponse.isFailure) {
    return notFound();
  }
  return <ClientPage client={reponse.body} />;
};
export default Page;
