import logo from "@/assets/logo.png";

export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return <img src={logo} alt="Academy Architect Studio" className={className} width={40} height={40} />;
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.05rem] leading-none tracking-tight ${className}`}>
      Academy Architect <span className="text-accent">Studio</span>
    </span>
  );
}
