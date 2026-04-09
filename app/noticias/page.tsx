import NoticiasListClient from "./noticias-list-client";
import { getNoticias } from "./noticias-data";

export default async function NoticiasPage() {
  const noticias = await getNoticias();

  return <NoticiasListClient noticias={noticias} />;
}
