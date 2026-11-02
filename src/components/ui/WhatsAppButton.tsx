import { motion } from "framer-motion";

import { WhatsAppIcon } from "../icons/WhatsAppIcon";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { WHATSAPP_URL } from "../../lib/whatsapp";
import { EASE, DUR } from "../../lib/motion";

function WhatsAppButton() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      initial={prefersReduced ? false : { opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: DUR.md, ease: EASE.out, delay: 1.5 }}
      whileHover={prefersReduced ? undefined : { scale: 1.06 }}
      whileTap={prefersReduced ? undefined : { scale: 0.96 }}
      className="
        group fixed bottom-6 right-6 z-50
        flex items-center gap-3
        rounded-full bg-[#25D366] text-white
        p-4 shadow-lg shadow-black/40
      "
    >
      {!prefersReduced && (
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"
        />
      )}

      <WhatsAppIcon size={26} className="relative" />

      <span
        className="
          relative hidden md:block
          max-w-0 overflow-hidden whitespace-nowrap
          text-sm font-medium
          transition-all duration-300 ease-out
          group-hover:max-w-[160px] group-hover:pr-1
        "
      >
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}

export default WhatsAppButton;