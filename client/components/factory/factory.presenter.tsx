// components/factory/factory.presenter.tsx
"use client";

// import { ParsedUrlQuery } from "querystring";

// interface IProps {
//   query: ParsedUrlQuery;
// }

// export default function FactoryUI({ query }: IProps) {
export default function FactoryUI(props: any) {
  return (
    // <>
    //   <>{query.id === "1" ? "양주 1 공장" : "파주 2 공장"}</>
    //   입니다. 이름은 {query.name}, 번호는 {query.num} 입니다.
    // </>
    <>
      {/* <>{query.id === "1" ? "양주 1 공장" : "파주 2 공장"}</> */}
      <>{props.id === "1" ? "양주 1 공장" : "파주 2 공장"}</>
      {/* 입니다. 이름은 {query.name}, 번호는 {query.num} 입니다. */}
    </>
  );
}

// "use client";

// interface IProps {
//   id: string | string[] | undefined;
//   name: string | string[] | undefined;
//   num: string | string[] | undefined;
// }

// export default function FactoryUI({ id, name, num }: IProps) {
//   return (
//     <>
//       <>{id === "1" ? "양주 1 공장" : "파주 2 공장"}</>
//       입니다.
//       이름은 {name}, 번호는 {num} 입니다.
//     </>
//   );
// }
