// Components
import { Rss } from "lucide-react";
// Hooks
import { useQuery } from "@tanstack/react-query";
// Services
import { NewsService } from "../services";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

interface RssResponse {
  status: string;
  feed: {
    title: string;
    url: string;
    link: string;
  };
  items: Article[];
}

const G1_TECNOLOGIA_RSS = "https://g1.globo.com/rss/g1/tecnologia/";

const NewsFeed = () => {
  const { data, isLoading, isError, error } = useQuery<RssResponse, Error>({
    queryKey: ["techNewsFeed", G1_TECNOLOGIA_RSS],
    queryFn: () => NewsService.getNewsFromRss(G1_TECNOLOGIA_RSS),

    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 60 * 15,
  });

  return (
    <div className="w-full md:w-[750px] p-4 bg-popover/70 backdrop-blur-lg border border-zinc-700/50 rounded-xl">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Rss size={20} className="text-blue-400" />
        Feed de Notícias
      </h2>

      {isLoading && <p className="text-zinc-400">Carregando...</p>}
      {isError && <p className="text-red-500">{error.message}</p>}
      {data && (
        <ul className="space-y-3">
          {data.items.slice(0, 5).map((article) => (
            <li key={article.link}>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/70 transition-colors"
              >
                <h3 className="font-semibold text-zinc-100 truncate">
                  {article.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {new Date(article.pubDate).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsFeed;
