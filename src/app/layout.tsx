import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "HackPerfil — HACK SCHOOL®",
  description:
    "Descubra qual dos 5 Perfis de Talentos HACK SCHOOL® é o seu: Creator, Builder, Connector, Tech Maker ou Leader.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
