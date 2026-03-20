import { FaCopyright } from "react-icons/fa"
import { CiAt } from "react-icons/ci"

const Footer = () => {
  return (
    <footer className="relative w-full rounded-2xl px-4 sm:px-6 py-8 sm:py-10 border theme-border-subtle bg-[color:var(--color-bg)] mt-10">

      <div className="flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
        <p className="font-medium font-google text-lg sm:text-2xl text-[color:var(--color-text-main)]/80 leading-snug">
          “I will become the king of the pirates”
        </p>
        <span className="text-sm text-[color:var(--color-text-subtle)]">
          — Monkey D. Luffy
        </span>
      </div>

      <div className="mt-10 sm:mt-12 flex flex-col items-center gap-2 text-xs sm:text-sm text-[color:var(--color-text-subtle)]">
        <p className="flex items-center gap-1 text-center flex-wrap justify-center">
          Designed & Developed By
          <a
            href="https://github.com/suresurya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline underline-offset-4 transition"
          >
            <CiAt />
            Sure Surya 
          </a>
        </p>

        <p className="flex items-center gap-1 text-center">
          <FaCopyright />
          2025 All Rights Reserved
        </p>
      </div>

    </footer>
  )
}
export default Footer