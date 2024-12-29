import { Section } from "../admin/adminform/page";
import { ApiEnd } from "../ContextCode";
interface iDatatype {
  token?: string;
  name?: string;
  username?: string;
  password?: string;
  postId?: string;
  data?: Section[];
  id?: string;
  title?: string;
  sections?: Section[];
  image?: string;
  stock?: string;
  tags?: string;
}
export const fetcher = async (url: string, method: string, data?: iDatatype) =>
  ApiEnd({
    url,
    method,
    data,
    withCredentials: true,
  }).then((response) => response.data);

export const fetcher2 = async (url: string, method: string, data?: iDatatype) =>
  ApiEnd({
    url,
    method,
    data,
  }).then((response) => response.data);
