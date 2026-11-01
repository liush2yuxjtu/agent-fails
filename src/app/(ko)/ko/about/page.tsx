import { staticRoute } from "@/lib/routes";

const r = staticRoute("ko", "about");
export const metadata = r.metadata;
export default r.Page;
