"use client";

import dynamic from "next/dynamic";

const ExploreProjects = dynamic(
  () => import("@/components/ProjectsPageComponents/ExploreProjects/ExploreProjects"),
  { ssr: false },
);

export default function ExploreProjectsWrapper() {
  return <ExploreProjects /> ;
  
}
