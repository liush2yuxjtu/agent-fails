import { patternRoute } from "@/lib/routes";

const r = patternRoute("en");
export const dynamicParams = false;
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export default r.Page;
