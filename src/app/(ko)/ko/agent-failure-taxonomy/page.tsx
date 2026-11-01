import { hubRoute } from "@/lib/routes";

const r = hubRoute("ko", "agent-failure-taxonomy");
export const metadata = r.metadata;
export default r.Page;
