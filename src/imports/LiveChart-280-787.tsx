import svgPaths from "./svg-l4bjijpmw4";
import imgCurrentDot from "figma:asset/65ea15cd30bd9f5fd482992b93df1dc0c074d773.png";

function PriceRight() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="price right">
      <p className="css-ew64yg relative shrink-0 text-white">{`Price: `}</p>
      <p className="css-ew64yg relative shrink-0 text-[#2ddb64]">$96,500 (+16%)</p>
    </div>
  );
}

function Title() {
  return (
    <div className="relative shrink-0 w-full" data-name="title">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-['IBM_Plex_Sans_Condensed:SemiBold',sans-serif] items-start justify-between leading-[normal] not-italic relative text-[16px] w-full">
        <p className="css-ew64yg relative shrink-0 text-white">BTC/USDT LIVE CHART</p>
        <PriceRight />
      </div>
    </div>
  );
}

function Currentprice() {
  return (
    <div className="bg-[#1fb74f] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="currentprice">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white">
        <p className="css-ew64yg leading-[20px]">3,932.04</p>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center right-[2px] top-0" data-name="dot">
      <Currentprice />
      <div className="relative shrink-0 size-[16px]" data-name="current dot">
        <div className="absolute inset-[-12.5%_-43.75%_-62.5%_-31.25%]">
          <img alt="" className="block max-w-none size-full" height="28" src={imgCurrentDot} width="28" />
        </div>
      </div>
    </div>
  );
}

function Linedot() {
  return (
    <div className="absolute bottom-[19.65%] left-[-10px] top-[20.44%] w-[304px]" data-name="linedot">
      <div className="absolute inset-[6.68%_3.29%_-21.97%_3.29%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 284 156.076">
          <path d={svgPaths.pcc9cac0} fill="url(#paint0_linear_251_1714)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_251_1714" x1="-0.190148" x2="-0.190148" y1="-16.5231" y2="155.528">
              <stop stopColor="#48BEE5" stopOpacity="0.6" />
              <stop offset="0.5625" stopColor="#48BEE5" stopOpacity="0.2" />
              <stop offset="0.95" stopColor="#48BEE5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[7.42%] left-[10px] top-[7.42%] w-[284px]" data-name="Vector">
        <div className="absolute inset-[-14.03%_-7.02%_-24.03%_-7.12%]" style={{ "--stroke-0": "rgba(72, 190, 229, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324.155 159.165">
            <g filter="url(#filter0_d_251_1712)" id="Vector">
              <path d={svgPaths.p1873b4c0} shapeRendering="crispEdges" stroke="var(--stroke-0, #48BEE5)" strokeWidth="3" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="159.165" id="filter0_d_251_1712" width="324.155" x="0" y="-3.57628e-07">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="9.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.623493 0 0 0 0 0.813251 0 0 0 1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_251_1712" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_251_1712" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Dot />
    </div>
  );
}

function Chart1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="chart">
      <Linedot />
    </div>
  );
}

function Price() {
  return (
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] h-full items-start justify-between leading-[20px] not-italic pl-[8px] pr-0 py-0 relative shrink-0 text-[10px] text-[rgba(255,255,255,0.7)]" data-name="price">
      <p className="css-ew64yg relative shrink-0">3,936.17</p>
      <p className="css-ew64yg relative shrink-0">3,935.17</p>
      <p className="css-ew64yg relative shrink-0">3,935.09</p>
      <p className="css-ew64yg relative shrink-0">3,934.17</p>
      <p className="css-ew64yg relative shrink-0">3,933.04</p>
      <p className="css-ew64yg relative shrink-0">3,932.00</p>
    </div>
  );
}

function Currentprice1() {
  return (
    <div className="bg-[#1fb74f] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-[4px] shrink-0" data-name="currentprice">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white">
        <p className="css-ew64yg leading-[20px]">3,932.04</p>
      </div>
    </div>
  );
}

function Dot1() {
  return (
    <div className="absolute content-stretch flex gap-[4px] items-center left-[214px] top-[46px]" data-name="dot">
      <Currentprice1 />
      <div className="relative shrink-0 size-[16px]" data-name="current dot">
        <div className="absolute inset-[-12.5%_-43.75%_-62.5%_-31.25%]">
          <img alt="" className="block max-w-none size-full" height="28" src={imgCurrentDot} width="28" />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="content">
      <div className="content-stretch flex items-start justify-between pl-0 pr-[6px] py-0 relative size-full">
        <Chart1 />
        <Price />
        <Dot1 />
      </div>
    </div>
  );
}

function Time() {
  return (
    <div className="relative shrink-0 w-full" data-name="time">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex font-['IBM_Plex_Sans:Regular',sans-serif] items-end justify-between leading-[0] not-italic pl-0 pr-[40px] py-0 relative text-[12px] text-[rgba(255,255,255,0.7)] w-full">
          <div className="css-g0mm18 flex flex-col justify-center relative shrink-0">
            <p className="css-ew64yg leading-[20px]">03:34:05</p>
          </div>
          <div className="css-g0mm18 flex flex-col justify-center relative shrink-0">
            <p className="css-ew64yg leading-[20px]">03:34:08</p>
          </div>
          <div className="css-g0mm18 flex flex-col justify-center relative shrink-0">
            <p className="css-ew64yg leading-[20px]">03:34:24</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-[54px]">
            <p className="css-4hzbpn leading-[20px]">03:34:38</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-[54px]">
            <p className="css-4hzbpn leading-[20px]">03:34:59</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chart() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[4]" data-name="chart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Content />
        <Time />
      </div>
    </div>
  );
}

function SettleStatus() {
  return (
    <div className="content-stretch flex items-center opacity-0 px-[3px] py-0 relative shrink-0 w-[80px] z-[3]" data-name="settle status">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Condensed:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)] text-center">
        <p className="css-ew64yg leading-[20px]">Settles in: 18s</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[20px] opacity-0 relative shrink-0 w-[80px] z-[1]">
      <div className="absolute css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Condensed:Medium',sans-serif] justify-center leading-[0] left-[22.5px] not-italic text-[12px] text-[rgba(255,255,255,0.72)] text-center top-[10px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[20px]">Bet Amount: 100 USDT</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-[376px] z-[1]" data-name="footer" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 376 28\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'0.6000000238418579\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(16.035 4.6542e-15 8.0454e-12 0.039007 170.49 0.73684)\\\'><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0.22115\\\'/><stop stop-color=\\\'rgba(160,230,246,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 376 28\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'0.6000000238418579\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(14.837 1.3021e-15 1.648e-12 0.02123 178.78 26.526)\\\'><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0.22115\\\'/><stop stop-color=\\\'rgba(160,230,246,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(1.0372e-07deg, rgb(12, 8, 17) 37.778%, rgb(41, 45, 52) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(130,207,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] isolate items-center justify-center px-[8px] py-[4px] relative w-full">
        <SettleStatus />
        <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Condensed:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)] text-center z-[2]">
          <p className="css-ew64yg leading-[20px]">Pick UP or DOWN to start</p>
        </div>
        <Frame />
      </div>
    </div>
  );
}

function Inside() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="inside" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 392 306\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(6.3057e-14 58.539 -51.633 -0.0000015244 112.65 -290.2)\\\'><stop stop-color=\\\'rgba(50,56,66,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(31,32,38,1)\\\' offset=\\\'0.52331\\\'/><stop stop-color=\\\'rgba(29,31,39,1)\\\' offset=\\\'0.721\\\'/><stop stop-color=\\\'rgba(18,20,28,1)\\\' offset=\\\'0.8605\\\'/><stop stop-color=\\\'rgba(8,9,16,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }}>
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] isolate items-center justify-center p-[8px] relative size-full">
          <Chart />
          <div className="absolute bottom-[-100px] flex h-[148px] items-center justify-center left-[calc(50%-1px)] mix-blend-screen translate-x-[-50%] w-[384px] z-[3]">
            <div className="flex-none rotate-[180deg]">
              <div className="h-[148px] relative w-[384px]" data-name="glowing">
                <div className="absolute inset-[-67.57%_-26.04%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 584 348">
                    <g filter="url(#filter0_f_131_381)" id="glowing" opacity="0.6" style={{ mixBlendMode: "screen" }}>
                      <path d={svgPaths.pb9ebd00} fill="url(#paint0_linear_131_381)" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="348" id="filter0_f_131_381" width="584" x="-1.11793e-07" y="-2.85423e-06">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_131_381" stdDeviation="50" />
                      </filter>
                      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_131_381" x1="462.596" x2="115.393" y1="176.918" y2="176.918">
                        <stop stopColor="#4EB4FF" stopOpacity="0" />
                        <stop offset="0.359375" stopColor="#2D9AFF" stopOpacity="0.92" />
                        <stop offset="0.51753" stopColor="#1380FF" stopOpacity="0.75589" />
                        <stop offset="0.760516" stopColor="#0A4FFF" stopOpacity="0.869792" />
                        <stop offset="1" stopColor="#0057FF" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_1px_1px_0px_rgba(0,0,0,0.25)]" />
    </div>
  );
}

export default function LiveChart() {
  return (
    <div className="bg-gradient-to-b content-stretch flex flex-col from-[#0e4b60] gap-[4px] items-start pb-[8px] pt-[10px] px-[8px] relative rounded-[12px] shadow-[0px_4px_0px_0px_#191e27,0px_8px_12px_-2px_rgba(14,17,22,0.69)] size-full to-[#272d38]" data-name="live chart">
      <Title />
      <Inside />
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0.5px_1px_0px_0px_rgba(88,102,123,0.33),inset_0px_0.2px_1px_0.5px_rgba(133,140,150,0.55)]" />
    </div>
  );
}