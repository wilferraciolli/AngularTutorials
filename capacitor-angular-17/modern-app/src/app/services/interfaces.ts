export interface ApiResult {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  id: number;
  imdb_id?: string;
  adult: boolean;
  genres_ids: number[];
  original_language: string;
  original_title: string;
  title: string;
  video: boolean;
  release_date: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;


  belongs_to_collection?: any;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  production_companies?: Productioncompany[];
  production_countries?: Productioncountry[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: Spokenlanguage[];
  status?: string;
  tagline?: string;

}

interface Spokenlanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Productioncountry {
  iso_3166_1: string;
  name: string;
}

interface Productioncompany {
  id: number;
  logo_path?: string;
  name: string;
  origin_country: string;
}

interface Genre {
  id: number;
  name: string;
}
