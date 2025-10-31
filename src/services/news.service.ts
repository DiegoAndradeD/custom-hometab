import axios from "axios";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
}

export interface RssResponse {
  status: string;
  feed: {
    title: string;
    url: string;
    link: string;
  };
  items: Article[];
}

const RSS2JSON_API_URL = "https://api.rss2json.com/v1/api.json";

class NewsService {
  static async getNewsFromRss(rssUrl: string): Promise<RssResponse> {
    const { data } = await axios.get<RssResponse>(RSS2JSON_API_URL, {
      params: {
        rss_url: rssUrl,
      },
    });

    if (data.status !== "ok") {
      throw new Error(`The RSS API returned an error status: ${data.status}`);
    }

    return data;
  }
}

export default NewsService;
