import { Geist, Geist_Mono } from "next/font/google";
import "@/app/(client)/shared/ui/globals.css";
import "react-toastify/dist/ReactToastify.css";

import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/es/zod.json";
import { Providers } from "./shared/ui/reduxt-toolkit/provider";

i18next.init({
  lng: "es",
  resources: {
    es: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

export const zConfig = z;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistMono.variable} ${geistSans.className} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
