import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jace-nextjs-recreation.aitjamaayouness1.chatgpt.site"),
  title: "Jace — Your AI email assistant",
  description: "Let Jace draft. You review and send. An AI email assistant for Gmail and Outlook that organizes your inbox and writes in your voice.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Jace — Your AI email assistant",
    description: "Write less, achieve more. Your inbox, with a little help from Jace.",
    images: [{ url: "/assets/hero-inbox.webp", width: 1052, height: 712 }],
  },
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
