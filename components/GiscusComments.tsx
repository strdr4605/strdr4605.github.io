import Giscus from "@giscus/react";
import React from "react";

const GiscusComments: React.FC = () => (
  <Giscus
    id="comments"
    repo="strdr4605/strdr4605.github.io"
    repoId="MDEwOlJlcG9zaXRvcnkxNDk5ODc2NDA="
    category="General"
    categoryId="DIC_kwDOCPChOM4COePA"
    mapping="pathname"
    term="Welcome to @giscus/react component!"
    reactionsEnabled="1"
    emitMetadata="0"
    inputPosition="bottom"
    theme="light"
    lang="en"
    loading="lazy"
  />
);

export default GiscusComments;
