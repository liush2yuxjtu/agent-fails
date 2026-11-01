import { hubRoute } from "@/lib/routes";

const r = hubRoute("en", "examples-of-ai-failure");
export const metadata = r.metadata;
export default r.Page;
