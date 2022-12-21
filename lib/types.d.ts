export type PostData = {
  date: Date | string;
  title: string;
  description: string;
  draft?: boolean;
  starred?: boolean;
  banner?: string;
  slug: string;
  externalLink?: string;
  tags: string[];
  contentHtml: string;
};

export type PostFolderName = { folderName: string; postSlug: string };
