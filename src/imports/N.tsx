function Bg() {
  return <div className="rounded-[36px] shrink-0 size-[24px]" data-name="bg" />;
}

export default function N() {
  return (
    <div className="bg-[rgba(163,163,163,0.1)] relative size-full" data-name="n">
      <div className="content-stretch flex items-center justify-center p-[2px] relative size-full">
        <Bg />
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.04)] border-b border-l border-solid inset-0 pointer-events-none" />
    </div>
  );
}