import { hubRoute } from "@/lib/routes";

const r = hubRoute("de", "examples-of-ai-failure");
export const metadata = r.metadata;
export default r.Page;
