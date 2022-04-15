import { AnnotationResponse } from "@/pages/api/annotation";
import useSWR from "swr";
import fetchJson from "./fetchJson";

const fetcher = (url: string, id: string) => fetchJson<any, any>(`${url}?id=${id}`)

export const useAnnnotationById = (id: string = '') => {
  const { data, error } = useSWR<AnnotationResponse>(['/api/annotation', id], fetcher);

  return {
    data,
    isLoading: !error && !data,
    error
  }
}
