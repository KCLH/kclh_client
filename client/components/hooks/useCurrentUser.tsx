import fetcher from "@/components/utils/fetcher";
import useSWR from "swr";

export default function useCurrentUser() {
  const { data: userData, error, mutate } = useSWR("currentUser", fetcher);

  const loading = !userData && !error;

  return { userData, error, loading, mutate };
}
