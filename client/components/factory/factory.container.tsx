"use client";

import FactoryUI from "@/components/factory/factory.presenter";

export default function FactoryContainer(props: any) {
  return (
    <FactoryUI
      id={props.id}
      pathname={props.pathname}
      idFromPath={props.idFromPath}
    />
  );
}
