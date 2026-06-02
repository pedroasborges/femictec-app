import NoticiasListClient from "./noticias-list-client";
import UnavailableState from "../components/unavailable-state";
import { getNoticiasPageData } from "./noticias-data";

export default async function NoticiasPage() {
  const data = await getNoticiasPageData();

  if (data.status !== "ready") {
    return (
      <UnavailableState
        title={data.status === "empty" ? "Nenhuma noticia publicada" : "Noticias indisponiveis"}
        description={
          data.status === "empty"
            ? "Nao ha noticias publicadas no CMS no momento."
            : "Nao foi possivel carregar as noticias a partir do CMS neste momento."
        }
        detail="Tente novamente mais tarde para ver as publicacoes atualizadas."
        actionHref="/"
        actionLabel="Voltar para a home"
      />
    );
  }

  return <NoticiasListClient noticias={data.noticias} />;
}
