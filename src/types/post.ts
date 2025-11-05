export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  cover?: {
    url: string;
  };
  blogpost_categories?: {
    id: number;
    name: string;
  }[];
  author?: {
    full_name: string;
    avatar:{ url: string;}
    created_at: string;
  }
}
