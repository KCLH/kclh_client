"use client";

// import { ParsedUrlQuery } from "querystring";

import FactoryUI from "@/components/factory/factory.presenter";

// interface IProps {
//   query: ParsedUrlQuery;
// }

// export default function FactoryContainer({ query }: IProps) {
export default function FactoryContainer(props: any) {
  // return <FactoryUI query={query} />;
  return <FactoryUI props={props} />;
}

// "use client";

// import FactoryUI from "@/components/factory/factory.presenter";

// interface IProps {
//   id: string | string[] | undefined;
//   name: string | string[] | undefined;
//   num: string | string[] | undefined;
// }

// export default function FactoryContainer({ id, name, num }: IProps) {
//   return <FactoryUI id={id} name={name} num={num} />;
// }
