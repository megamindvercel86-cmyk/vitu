import ScrollToTopButton from "@/components/Common/ScrollToTopButton";
import WhatsappChatWidget from "@/components/Common/WhatsappChatWidget";
import VilasamProjectFooter from "@/components/VilasamProjectPage/VilasamProjectFooter/page";
import VilasamProjectNavbar from "@/components/VilasamProjectPage/VilasamProjectNavbar/page";


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col"> 
      <VilasamProjectNavbar/>
      <main className="flex-1">{children}</main>
      <ScrollToTopButton/>
      <WhatsappChatWidget/>
      <VilasamProjectFooter />
    </div>
  );
}
