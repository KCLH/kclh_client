"use client";

import Factory2UI from "@/components/factory/factory2.presenter";

export default function Factory2Container(props: any) {
  return (
    <Factory2UI
      id={props.id}
      pathname={props.pathname}
      idFromPath={props.idFromPath}
    />
  );
}
