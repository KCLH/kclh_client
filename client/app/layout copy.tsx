// import styled from "@emotion/styled";
// import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Header from "../components/header";

// 특정페이지에서 안보이게 하는 방법
// const HIDDEN_HEADER_FOOTER_SIDE = ["/login"];

// interface ILayoutProps {
//   children: ReactNode;
// }

// const Wrapper = styled.main`
//   width: 100vw;
// `;

export const metadata = {
  title: "KCLH Red Dice",
  description: "팀 KCLH의 Red Dice 프로젝트",
};

// export default function RootLayout(props: ILayoutProps) {
export default function RootLayout({
  children,
}: {
  // children: React.ReactNode;
  children: ReactNode;
}) {
  // const isHiddenHeaderFooterSide = HIDDEN_HEADER_FOOTER_SIDE.includes(
  //   usePathname()
  // );

  return (
    <html lang="ko">
      {/* <Wrapper> */}
      {/* <div>{props.children}</div> */}
      {/* {!isHiddenHeaderFooterSide && <Header />} */}
      <Header />
      <body>{children}</body>
      {/* </Wrapper> */}
    </html>
  );
}
