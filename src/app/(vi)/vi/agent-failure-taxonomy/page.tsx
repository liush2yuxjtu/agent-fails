import { hubRoute } from "@/lib/routes";

const r = hubRoute("vi", "agent-failure-taxonomy");
export const metadata = r.metadata;
export default r.Page;
