import React from "react";

const UtterancesComments: React.FC = () => (
  <section
    ref={(elem) => {
      if (!elem) {
        return;
      }
      const scriptElem = document.createElement("script");
      scriptElem.src = "https://utteranc.es/client.js";
      scriptElem.async = true;
      scriptElem.crossOrigin = "anonymous";
      scriptElem.setAttribute("repo", "strdr4605/strdr4605.github.io");
      scriptElem.setAttribute("issue-term", "pathname");
      scriptElem.setAttribute("theme", "github-light");
      elem.appendChild(scriptElem);
    }}
  />
);

export default UtterancesComments;