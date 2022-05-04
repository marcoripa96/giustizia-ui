import { toBase64 } from "@/utils/shared"

export const getAuthHeader = () => {
  return `Basic ${toBase64(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`)}`;
}