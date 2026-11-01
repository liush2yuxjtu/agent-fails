import { hubRoute } from "@/lib/routes";

const r = hubRoute("zh", "agent-failure-taxonomy");
export const metadata = r.metadata;
export default r.Page;
