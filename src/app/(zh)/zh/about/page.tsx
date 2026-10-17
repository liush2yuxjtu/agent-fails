import { staticRoute } from "@/lib/routes";

const r = staticRoute("zh", "about");
export const metadata = r.metadata;
export default r.Page;
