import { createContext, useContext, type ReactNode } from "react";
import { defaultContent, toProject, type SiteContent } from "@/lib/content";

const ContentContext = createContext<SiteContent>(defaultContent);

export function ContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function useProjectList() {
  return useContent().projects.map(toProject);
}
