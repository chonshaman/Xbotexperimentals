import { useState, useEffect, useRef } from 'react';

interface AnimatedBalanceProps {
  balance: number;
  className?: string;
  showCurrency?: boolean;
}

export default function AnimatedBalance({ balance, className = '', showCurrency = true }: AnimatedBalanceProps) {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [animationKey, setAnimationKey] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down' | null>(null);
  const prevBalanceRef = useRef(balance);

  useEffect(() => {
    if (balance !== prevBalanceRef.current) {
      // Determine animation direction
      if (balance > prevBalanceRef.current) {
        setAnimationDirection('up'); // Balance increased (green slide up)
      } else {
        setAnimationDirection('down'); // Balance decreased (red slide down)
      }
      
      setAnimationKey(prev => prev + 1);
      
      // Small delay to show animation, then update display
      const timer = setTimeout(() => {
        setDisplayBalance(balance);
        setAnimationDirection(null);
      }, 150);
      
      prevBalanceRef.current = balance;
      
      return () => clearTimeout(timer);
    }
  }, [balance]);

  const formatBalance = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <span
      key={animationKey}
      className={className}
      style={{
        animation: animationDirection 
          ? `balanceSlide${animationDirection === 'up' ? 'Up' : 'Down'} 0.3s ease-in-out`
          : 'none',
        // Always keep gold color, just flash with animation
      }}
    >
      {formatBalance(displayBalance)}{showCurrency ? ' USDT' : ''}
    </span>
  );
}