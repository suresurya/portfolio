import { FaCopyright } from "react-icons/fa"
import { CiAt } from "react-icons/ci"
import { SOCIAL } from "../data/constants"
import { useEffect, useState } from "react"

const QUOTES = [
  { text: "I will become the king of the pirates", author: "Monkey D. Luffy" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
  { text: "If you don't take risks, you can't create a future.", author: "Monkey D. Luffy" },
]

const Footer = () => {
  const year = new Date().getFullYear()
  const [quote, setQuote] = useState(QUOTES[0])

  useEffect(() => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)]
    setQuote(randomQuote)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative w-full rounded-2xl px-4 sm:px-6 py-8 sm:py-10 border theme-border-subtle bg-[color:var(--color-bg)] mt-10">

      <div className="flex flex-col items-center justify-center text-center gap-3 sm:gap-4">
        <p className="font-medium font-google text-lg sm:text-2xl text-[color:var(--color-text-main)]/80 leading-snug">
          “{quote.text}”
        </p>
        <span className="text-sm text-[color:var(--color-text-subtle)]">
          — {quote.author}
        </span>
      </div>

      <div className="mt-10 sm:mt-12 flex flex-col items-center gap-2 text-xs sm:text-sm text-[color:var(--color-text-subtle)]">
        <p className="flex items-center gap-1 text-center flex-wrap justify-center">
          Designed & Developed By
          <a
            href={SOCIAL.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Sure Surya on GitHub (opens in new tab)"
            className="flex items-center gap-1 hover:underline underline-offset-4 transition"
          >
            <CiAt />
            Sure Surya 
          </a>
        </p>

        <p className="flex items-center gap-1 text-center">
          <FaCopyright />
          {year} All Rights Reserved
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="mt-2 rounded-full border theme-border-subtle px-3 py-1 text-xs hover:bg-[color:var(--color-accent-soft)] transition-colors cursor-pointer"
          aria-label="Scroll back to top"
        >
          Back to top
        </button>
      </div>

    </footer>
  )
}
export default Footer