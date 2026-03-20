import { FaCopyright } from "react-icons/fa"
import { CiAt } from "react-icons/ci"

const Footer = () => {
  return (
    <footer className="relative w-full rounded-2xl px-6 py-10 border theme-border-subtle bg-[color:var(--color-bg)]">

      <div className="h-10 flex flex-col items-center justify-center text-center gap-4">
        <p className="font-medium font-google text-2xl text-[color:var(--color-text-main)]/80">
          “I will become the king of the pirates”
        </p>
        <span className="text-sm text-[color:var(--color-text-subtle)]">
          — Monkey D. Luffy
        </span>
      </div>

      <div className="mt-12 flex flex-col items-center gap-2 text-sm text-[color:var(--color-text-subtle)]">
        <p className="flex items-center gap-1">
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

        <p className="flex items-center gap-1">
          <FaCopyright />
          2025 All Rights Reserved
        </p>
      </div>

    </footer>
  )
}
export default Footer