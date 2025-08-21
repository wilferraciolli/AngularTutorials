export interface UnsplashSearchResponse {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  likes: number;
  liked_by_user: boolean;
  description: string;
  user: UnsplashUser;
  current_user_collections: any[];
  urls: UnsplashPhotoUrls;
  links: UnsplashPhotoLinks;
}

export interface UnsplashUser {
  id: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  instagram_username: string;
  twitter_username: string;
  portfolio_url: string | null;
  profile_image: UnsplashProfileImage;
  links: UnsplashUserLinks;
}

export interface UnsplashProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface UnsplashUserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
}

export interface UnsplashPhotoUrls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
}

export interface UnsplashPhotoLinks {
  self: string;
  html: string;
  download: string;
} 