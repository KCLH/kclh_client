export default function FactoryPage(props: any) {
  return (
    <>
      <>{props.params.id === "1" ? "양주 1 공장" : "파주 2 공장"}</>
      입니다.
    </>
  );
}

// // import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
// import FactoryContainer from "@/components/factory/factory.container";

// export default function FactoryPage() {
//   const router = useRouter();
//   // return <FactoryContainer query={router.query} />;
//   return <FactoryContainer props={router.} />;
//   // const { id, name, num } = router.query;
//   // return <FactoryContainer id={id} name={name} num={num} />;
// }
