"use client";

import ScrollToTopButton from "@/components/Common/ScrollToTopButton";
import WhatsappChatWidget from "@/components/Common/WhatsappChatWidget";
import VilasamProjectFooter from "@/components/VilasamProjectPage/VilasamProjectFooter/page";
import VilasamProjectNavbar from "@/components/VilasamProjectPage/VilasamProjectNavbar/page";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isThankYouPage = pathname === "/vilasam/thank-you";

  return (
    <div className="min-h-screen flex flex-col">
      {!isThankYouPage && <VilasamProjectNavbar />}
      <main className="flex-1">{children}</main>
      <ScrollToTopButton />
      <WhatsappChatWidget />
      {!isThankYouPage && <VilasamProjectFooter />}
    </div>
  );
}
