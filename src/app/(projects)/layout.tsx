import ProjectFooter from "@/components/ProjectsPageCommonComponents/ProjectPageFoooter/ProjectPageFooter";
import ProjectNavbar from "@/components/ProjectsPageCommonComponents/ProjectPageNavbar/ProjectPageNavbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col"> 
      <ProjectNavbar />
      <main className="flex-1">{children}</main>
      <ProjectFooter />
    </div>
  );
}
