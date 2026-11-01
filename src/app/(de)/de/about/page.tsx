import { staticRoute } from "@/lib/routes";

const r = staticRoute("de", "about");
export const metadata = r.metadata;
export default r.Page;
