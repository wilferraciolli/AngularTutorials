import { PostInterface } from './post.interface';

export interface PostStateInterface {
  posts: PostInterface[],
  error: string | null,
  isLoading: boolean
}
