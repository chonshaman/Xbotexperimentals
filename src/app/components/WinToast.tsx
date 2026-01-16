interface WinToastProps {
  show: boolean;
}

export default function WinToast({ show }: WinToastProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-[10] pointer-events-none">
      <div className="animate-[bounceIn_0.5s_ease-out] bg-gradient-to-b from-[#2ddb64] to-[#1fb74f] px-12 py-6 rounded-2xl shadow-[0px_8px_24px_rgba(45,219,100,0.4),0px_4px_8px_rgba(0,0,0,0.3),inset_0px_2px_4px_rgba(255,255,255,0.3)]">
        <div className="text-white text-center">
          <div className="text-5xl font-bold mb-2 drop-shadow-lg">WIN!</div>
          <div className="text-2xl font-semibold">+95.00</div>
        </div>
      </div>
    </div>
  );
}
