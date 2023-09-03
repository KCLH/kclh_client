// import "./globals.css";
import { ReactNode } from "react";
import Header from "../components/header";

export const metadata = {
  title: "KCLH Red Dice",
  description: "팀 KCLH의 Red Dice 프로젝트",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // const resp = await fetch("http://localhost:9999/topics", {
  //   // next: { revalidate: 0 },
  //   cache: "no-store",
  // });
  // const topics = await resp.json();
  return (
    <html lang="ko">
      <body>
        <Header />
        {/* {topics.map((topic: any) => {
          return (
            <li key={topic.id}>
              <a href={`/factory/${topic.id}`}>{topic.title}</a>
            </li>
          );
        })} */}
        {children}
      </body>
    </html>
  );
}
