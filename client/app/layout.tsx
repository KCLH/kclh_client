import { ReactNode } from "react";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "KCLH Red Dice",
  description: "팀 KCLH의 Red Dice 프로젝트",
  icons: {
    icon: "/teamLogo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
