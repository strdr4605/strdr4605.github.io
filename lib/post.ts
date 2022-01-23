import fs from "fs";

type PostSlug = string;
type PostFolderName = string;

export type SlugFolderNameMap = Record<PostSlug, PostFolderName>;

export function writeSlugFolderNameCache(slugFolderNameMap: SlugFolderNameMap) {
  fs.writeFileSync(
    ".slugFolderNameCache",
    JSON.stringify(slugFolderNameMap),
    "utf8"
  );
}

export function readSlugFolderNameCache(): SlugFolderNameMap {
  return JSON.parse(fs.readFileSync(".slugFolderNameCache", "utf8"));
}
