import React from "react";

const UNI_START_YEAR = 2015;

export function YearsFromUni() {
  return <span>{new Date().getFullYear() - UNI_START_YEAR}</span>;
}
