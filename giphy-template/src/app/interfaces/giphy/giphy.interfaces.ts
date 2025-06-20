export interface GiphyApiResponse {
  data: GiphyGif[];
  meta: GiphyMeta;
  pagination: GiphyPagination;
}

export interface GiphyGif {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: GiphyImages;
  analytics_response_payload: string;
  analytics: GiphyAnalytics;
  alt_text?: string;
}

export interface GiphyImages {
  original: GiphyImageFormat;
  fixed_height: GiphyImageFormat;
  fixed_height_downsampled: GiphyImageFormat;
  fixed_height_small: GiphyImageFormat;
  fixed_width: GiphyImageFormat;
  fixed_width_downsampled: GiphyImageFormat;
  fixed_width_small: GiphyImageFormat;
  // Add more formats as needed
}

export interface GiphyImageFormat {
  height: string;
  width: string;
  size?: string;
  url: string;
  mp4_size?: string;
  mp4?: string;
  webp_size?: string;
  webp?: string;
  frames?: string;
  hash?: string;
}

export interface GiphyAnalytics {
  onload: GiphyAnalyticsEvent;
  onclick: GiphyAnalyticsEvent;
  onsent: GiphyAnalyticsEvent;
}

export interface GiphyAnalyticsEvent {
  url: string;
}

export interface GiphyMeta {
  status: number;
  msg: string;
  response_id: string;
}

export interface GiphyPagination {
  total_count: number;
  count: number;
  offset: number;
} 