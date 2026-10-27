import Link from "next/link";
import { href, type Lang } from "@/lib/site";

export function RecorderPlane({
  lang,
  frameId,
  title,
  slug,
}: {
  lang: Lang;
  frameId: string;
  title: string;
  slug?: string;
}) {
  const inner = (
    <>
      <div className="af-glass">
        <span className="af-mk af-mk-tl" aria-hidden />
        <span className="af-mk af-mk-tr" aria-hidden />
        <span className="af-mk af-mk-bl" aria-hidden />
        <span className="af-mk af-mk-br" aria-hidden />
        <svg viewBox="0 0 760 460" aria-hidden>
          <g className="af-gridline">
            <line x1="150" y1="36" x2="150" y2="392" />
            <line x1="296" y1="36" x2="296" y2="392" />
            <line x1="443" y1="36" x2="443" y2="392" />
            <line x1="590" y1="36" x2="590" y2="392" />
            <line x1="736" y1="36" x2="736" y2="392" />
          </g>
          <line className="af-base" x1="150" y1="92" x2="736" y2="92" />
          <line className="af-base" x1="150" y1="188" x2="736" y2="188" />
          <line className="af-env" x1="150" y1="292" x2="736" y2="292" />
          <line className="af-env" x1="150" y1="356" x2="736" y2="356" />
          <path className="af-bracket" d="M142 292 H150 V356 H142" />

          <text className="af-ch-code" x="16" y="86">
            WF
          </text>
          <text className="af-ch-name" x="16" y="104">
            {lang === "zh" ? "做错了功能" : "WRONG FEATURE"}
          </text>

          <text className="af-ch-code" x="16" y="182">
            BUG
          </text>
          <text className="af-ch-name" x="16" y="200">
            {lang === "zh" ? "有 Bug" : "Bug"}
          </text>

          <rect x="16" y="300" width="4" height="16" fill="#e8a317" />
          <rect x="23" y="300" width="4" height="16" fill="#e8a317" />
          <text className="af-ch-code" x="34" y="314">
            OVR
          </text>
          <text className="af-ch-name" x="16" y="338">
            {lang === "zh" ? "越界" : "OVERREACH"}
          </text>

          <path className="af-tr af-tr-wf af-draw-dash" pathLength={100} d="M150 92 H280 L320 74 H450 L490 92 H736" />
          <path
            className="af-tr af-tr-bug af-draw-solid af-draw-late"
            pathLength={100}
            d="M150 188 H400 L416 146 L432 214 L448 188 H736"
          />
          <path
            className="af-tr af-tr-ovr af-draw-solid af-draw-later"
            pathLength={100}
            d="M150 324 H260 L340 324 L430 250 L500 128 L560 128 L640 250 L700 324 H736"
          />

          <g className="af-mark">
            <line className="af-mark-line" x1="530" y1="128" x2="530" y2="108" />
            <text className="af-evt-tag" x="538" y="106">
              {frameId}
            </text>
          </g>

          <text className="af-axis" x="150" y="420" textAnchor="middle">
            00:00
          </text>
          <text className="af-axis" x="296" y="420" textAnchor="middle">
            00:04
          </text>
          <text className="af-axis" x="443" y="420" textAnchor="middle">
            00:08
          </text>
          <text className="af-axis" x="590" y="420" textAnchor="middle">
            00:12
          </text>
          <text className="af-axis" x="736" y="420" textAnchor="middle">
            00:16
          </text>
        </svg>
        <div className="af-playhead" aria-hidden />
      </div>
      {title ? (
        <div className="af-evt">
          <span className="id">{frameId}</span>
          <span className="ttl">{title}</span>
        </div>
      ) : null}
    </>
  );

  if (!slug) return <div className="af-plane">{inner}</div>;
  return (
    <Link className="af-plane" href={href(lang, `/patterns/${slug}`)}>
      {inner}
    </Link>
  );
}
