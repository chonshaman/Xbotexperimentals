import svgPaths from "./svg-lxo9x8w2bl";
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

function UpDown() {
  return (
    <div className="h-[20px] relative shrink-0 w-[24px]" data-name="up down">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] inset-0 justify-center leading-[0] not-italic text-[#48bee5] text-[12px] text-center">
        <p className="css-4hzbpn leading-[20px]">UP</p>
      </div>
    </div>
  );
}

function Bg() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.16)] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="bg">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)]">
        <p className="css-ew64yg leading-[20px]">{`Live Round  -`}</p>
      </div>
      <UpDown />
    </div>
  );
}

function Status() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Status">
      <Bg />
    </div>
  );
}

function Floating() {
  return (
    <div className="absolute left-[8px] top-[10px] w-[376px] z-[4]" data-name="floating">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Status />
      </div>
    </div>
  );
}

function Greenzone() {
  return (
    <div className="h-[56px] relative shrink-0 w-full z-[3]" data-name="greenzone" style={{ backgroundImage: "linear-gradient(rgba(138, 185, 30, 0) 10.587%, rgba(93, 188, 61, 0.04) 12.309%, rgba(57, 191, 86, 0.2) 37.641%, rgba(54, 185, 30, 0.6) 99.649%)" }}>
      <div className="size-full" />
    </div>
  );
}

function Bg1() {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(0,0,0,0.16)] content-stretch flex flex-col items-center justify-center px-[4px] py-0 relative rounded-tl-[4px] rounded-tr-[4px] shrink-0" data-name="bg">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="css-4hzbpn leading-[20px]">Entry Price</p>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="bg-[#1f61b7] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-bl-[4px] rounded-br-[4px] shrink-0">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white">
        <p className="css-ew64yg leading-[20px]">3,932.04</p>
      </div>
    </div>
  );
}

function EntryPrice() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start justify-center relative shrink-0" data-name="entry price">
      <Bg1 />
      <Frame1 />
    </div>
  );
}

function Entryprice() {
  return (
    <div className="content-stretch flex flex-col h-px items-start justify-center relative shrink-0 w-[324px] z-[2]" data-name="entryprice">
      <EntryPrice />
      <div className="absolute h-0 left-0 top-[calc(50%+0.5px)] translate-y-[-50%] w-[324px]" data-name="dash">
        <div className="absolute inset-[-1px_0_0_0]" style={{ "--stroke-0": "rgba(255, 255, 255, 1)" } as React.CSSProperties}>
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 324 1">
            <line id="dash" stroke="var(--stroke-0, white)" strokeDasharray="2 2" strokeOpacity="0.72" x2="324" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Redzonne() {
  return (
    <div className="bg-gradient-to-b flex-[1_0_0] from-[10.587%] from-[rgba(229,72,75,0.4)] min-h-px min-w-px relative to-[94.137%] to-[rgba(229,72,75,0)] via-[51.421%] via-[rgba(229,72,75,0)] w-full z-[1]" data-name="redzonne">
      <div className="size-full" />
    </div>
  );
}

function Liveindicator() {
  return (
    <div className="absolute content-stretch flex flex-col h-[203px] isolate items-center left-[10px] top-[-44.36px] w-[324px]" data-name="liveindicator">
      <Greenzone />
      <Entryprice />
      <Redzonne />
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
      <div className="absolute inset-[6.68%_3.29%_-21.97%_3.29%]" data-name="visual">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 284 149.86">
          <path d={svgPaths.p379b8c80} fill="url(#paint0_linear_251_2164)" id="visual" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_251_2164" x1="-0.190148" x2="-0.190148" y1="-15.8651" y2="149.334">
              <stop stopColor="#AFD77B" stopOpacity="0.6" />
              <stop offset="0.5625" stopColor="#AFD77B" stopOpacity="0.2" />
              <stop offset="0.95" stopColor="#AFD77B" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-[7.42%] left-[10px] top-[7.42%] w-[284px]" data-name="line">
        <div className="absolute inset-[-33.6%_-14.41%_-43.84%_-14.51%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 366.115 196.424">
            <g filter="url(#filter0_d_251_2162)" id="line">
              <path d={svgPaths.p1cfae600} shapeRendering="crispEdges" stroke="var(--stroke-0, #AFD77B)" strokeWidth="3" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="196.424" id="filter0_d_251_2162" width="366.115" x="1.07288e-06" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="20" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.92549 0 0 0 0 0.823529 0 0 0 0 0.368627 0 0 0 1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_251_2162" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_251_2162" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Liveindicator />
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
    <div className="content-stretch flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] h-full items-start justify-between leading-[20px] not-italic pl-[12px] pr-0 py-0 relative shrink-0 text-[10px] text-[rgba(255,255,255,0.7)]" data-name="price">
      <p className="css-ew64yg relative shrink-0">3,936.17</p>
      <p className="css-ew64yg relative shrink-0">3,935.17</p>
      <p className="css-ew64yg relative shrink-0">3,935.09</p>
      <p className="css-ew64yg relative shrink-0">3,934.17</p>
      <p className="css-ew64yg relative shrink-0">3,933.04</p>
      <p className="css-ew64yg relative shrink-0">3,932.00</p>
    </div>
  );
}

function Content() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="content">
      <div className="content-stretch flex items-start justify-between pl-0 pr-[6px] py-0 relative size-full">
        <Chart1 />
        <Price />
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
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full z-[3]" data-name="chart">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between relative size-full">
        <Content />
        <Time />
      </div>
    </div>
  );
}

function SettleStatus() {
  return (
    <div className="content-stretch flex items-center px-[3px] py-0 relative shrink-0 w-[100px] z-[3]" data-name="settle status">
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Condensed:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.72)] text-center">
        <p className="css-ew64yg leading-[20px]">Settles in 18s</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex flex-col h-[20px] items-center justify-center px-[4px] py-0 relative rounded-bl-[4px] shrink-0">
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.2)] border-b-2 border-dashed border-t-2 inset-[-2px_0] pointer-events-none rounded-bl-[4px]" />
      <div className="flex flex-col font-['IBM_Plex_Sans:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white w-full">
        <p className="css-4hzbpn leading-[20px]">PnL</p>
      </div>
    </div>
  );
}

function Bgborder() {
  return (
    <div className="bg-[#188b3c] content-stretch flex items-center justify-center px-[4px] py-0 relative rounded-br-[4px] shrink-0 w-[48px]" data-name="bgborder">
      <div aria-hidden="true" className="absolute border border-[#1fb74f] border-dashed inset-[-1px] pointer-events-none rounded-br-[5px]" />
      <div className="css-g0mm18 flex flex-col font-['IBM_Plex_Sans:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white">
        <p className="css-ew64yg leading-[20px]">+56.27</p>
      </div>
    </div>
  );
}

function Slbox() {
  return (
    <div className="content-stretch flex gap-px items-center relative shrink-0" data-name="slbox">
      <Frame />
      <Bgborder />
    </div>
  );
}

function Pnl() {
  return (
    <div className="content-stretch flex flex-col h-[21px] items-center justify-center relative shrink-0 z-[2]" data-name="pnl">
      <Slbox />
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[80px] z-[1]">
      <div className="absolute css-g0mm18 flex flex-col font-['IBM_Plex_Sans_Condensed:Medium',sans-serif] justify-center leading-[0] left-[22.5px] not-italic text-[12px] text-[rgba(255,255,255,0.72)] text-center top-[10px] translate-x-[-50%] translate-y-[-50%]">
        <p className="css-ew64yg leading-[20px]">Bet Amount: 100 USDT</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full z-[1]" data-name="footer" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 376 29\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'0.6000000238418579\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(16.035 4.8204e-15 8.0454e-12 0.0404 170.49 0.76316)\\\'><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0.22115\\\'/><stop stop-color=\\\'rgba(160,230,246,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 376 29\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'0.6000000238418579\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(14.837 1.3486e-15 1.648e-12 0.021988 178.78 27.474)\\\'><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(160,230,246,1)\\\' offset=\\\'0.22115\\\'/><stop stop-color=\\\'rgba(160,230,246,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>'), linear-gradient(1.07424e-07deg, rgb(12, 8, 17) 37.778%, rgb(41, 45, 52) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[rgba(130,207,255,0.1)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex isolate items-center justify-between px-[8px] py-[4px] relative w-full">
          <SettleStatus />
          <Pnl />
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

function Inside() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[8px] w-full" data-name="inside" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 392 298\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(6.3057e-14 57.009 -51.633 -0.0000014845 112.65 -282.61)\\\'><stop stop-color=\\\'rgba(50,56,66,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(31,32,38,1)\\\' offset=\\\'0.52331\\\'/><stop stop-color=\\\'rgba(29,31,39,1)\\\' offset=\\\'0.721\\\'/><stop stop-color=\\\'rgba(18,20,28,1)\\\' offset=\\\'0.8605\\\'/><stop stop-color=\\\'rgba(8,9,16,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }}>
      <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] isolate items-center p-[8px] relative size-full">
          <Floating />
          <Chart />
          <div className="absolute bottom-[-100px] flex h-[148px] items-center justify-center left-[calc(50%-1px)] mix-blend-screen translate-x-[-50%] w-[384px] z-[2]">
            <div className="flex-none rotate-[180deg]">
              <div className="h-[148px] relative w-[384px]" data-name="glowing">
                <div className="absolute inset-[-67.57%_-26.04%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 584 348">
                    <g filter="url(#filter0_f_251_1931)" id="glowing" opacity="0.6" style={{ mixBlendMode: "screen" }}>
                      <path d={svgPaths.pb9ebd00} fill="url(#paint0_linear_251_1931)" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="348" id="filter0_f_251_1931" width="584" x="-6.0884e-08" y="3.20592e-06">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                        <feGaussianBlur result="effect1_foregroundBlur_251_1931" stdDeviation="50" />
                      </filter>
                      <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_251_1931" x1="462.596" x2="115.393" y1="176.918" y2="176.918">
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