import { staticRoute } from "@/lib/routes";

const r = staticRoute("en", "about");
export const metadata = r.metadata;
export default r.Page;
