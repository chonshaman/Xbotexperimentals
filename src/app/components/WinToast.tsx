import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

interface WinToastProps {
  show: boolean;
}

export default function WinToast({ show }: WinToastProps) {
  const hasFiredRef = useRef(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (show && !hasFiredRef.current) {
      hasFiredRef.current = true;
      
      // Create a canvas that covers the entire viewport
      const canvas = document.createElement('canvas');
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '99999';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);
      canvasRef.current = canvas;

      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true
      });

      // Fire confetti explosion
      const duration = 2500;
      const animationEnd = Date.now() + duration;

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          // Remove canvas after animation
          setTimeout(() => {
            if (canvasRef.current) {
              document.body.removeChild(canvasRef.current);
              canvasRef.current = null;
            }
          }, 500);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Fire confetti from center with explosive spread
        myConfetti({
          particleCount,
          startVelocity: 45,
          spread: 360,
          ticks: 80,
          origin: { 
            x: randomInRange(0.45, 0.55), 
            y: randomInRange(0.4, 0.6) 
          },
          colors: ['#2ddb64', '#1fb74f', '#FFD700', '#FFEA00', '#FFA500', '#FF6347', '#FFFFFF'],
          gravity: 1.2,
          scalar: 1.2
        });
      }, 200);

      return () => {
        clearInterval(interval);
        if (canvasRef.current && document.body.contains(canvasRef.current)) {
          document.body.removeChild(canvasRef.current);
          canvasRef.current = null;
        }
      };
    }

    if (!show) {
      hasFiredRef.current = false;
    }
  }, [show]);

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