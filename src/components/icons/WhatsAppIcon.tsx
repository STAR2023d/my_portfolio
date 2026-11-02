import { siWhatsapp } from "simple-icons";

interface Props {
  size?: number;
  className?: string;
}

export function WhatsAppIcon({ size = 20, className }: Props) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d={siWhatsapp.path} />
    </svg>
  );
}