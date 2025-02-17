export type TBlog = {
  authorName: string;
  authorEmail: string;
  title: string;
  coverImage: string;
  content: string;
  date: Date;
  category: string;
  comments?: [string];
};
