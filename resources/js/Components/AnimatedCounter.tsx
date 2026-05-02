import { useEffect, useState, useRef } from "react";

interface Props {
  target: string;
  label: string;
  duration?: number;
}

export default function AnimatedCounter({ target, label, duration = 2000 }: Props) {
  const [count, setCount] = useState("0");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numericPart = target.replace(/[^0-9]/g, "");
  const prefix = target.match(/^[^0-9]*/)?.[0] || "";
  const suffix = target.match(/[^0-9]*$/)?.[0] || "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const end = parseInt(numericPart) || 0;
    if (end === 0) { setCount(target); return; }

    let start = 0;
    const step = Math.ceil(end / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(`${prefix}${end.toLocaleString()}${suffix}`);
        clearInterval(timer);
      } else {
        setCount(`${prefix}${start.toLocaleString()}${suffix}`);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [started, numericPart, prefix, suffix, target, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
        {count}
      </div>
      <p className="text-slate-400 text-xs font-medium mt-1.5 uppercase tracking-wider">{label}</p>
    </div>
  );
}
