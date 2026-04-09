import ResumeFile from "../assets/resume.pdf"
import { FaLongArrowAltLeft } from "react-icons/fa"
import { FiDownload } from "react-icons/fi"
import { useNavigate } from "react-router"
import { useState } from "react"

const Resume = () => {
  const navigate = useNavigate()
  const [isLoadingPreview, setIsLoadingPreview] = useState(true)
  const [previewLoadFailed, setPreviewLoadFailed] = useState(false)

  return (
    <section className="space-y-6 sm:space-y-8 w-full border border-gray-300/20 rounded-2xl px-4 sm:px-6 py-6 sm:py-10 font-jetMono">

      
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-text-main)] transition border theme-border-subtle px-3 py-2 rounded-2xl hover:bg-[color:var(--color-accent-soft)] duration-300 cursor-pointer"
        >
          <FaLongArrowAltLeft />
          Go Back
        </button>

        <a
          href={ResumeFile}
          download="Sure-Surya-Resume.pdf"
          className="inline-flex items-center gap-2 text-sm text-[color:var(--color-text-main)] transition border theme-border-subtle px-3 py-2 rounded-2xl hover:bg-[color:var(--color-accent-soft)] duration-300"
        >
          <FiDownload />
          Download PDF
        </a>
      </div>

     
      <div className="space-y-4 text-center">
        <h1 className="mx-auto max-w-2xl text-xl text-[color:var(--color-text-main)] underline-offset-8 hover:underline cursor-pointer">
          My resume.
        </h1>
      </div>

      
      <div className="h-px w-full bg-gray-300/20" />

      
      <div className="mx-auto w-full max-w-4xl" aria-busy={isLoadingPreview && !previewLoadFailed}>
        {isLoadingPreview && !previewLoadFailed && (
          <div className="w-full h-[68vh] sm:h-[80vh] rounded-xl border border-gray-300/20 grid place-items-center text-sm text-[color:var(--color-text-subtle)]">
            Loading resume preview...
          </div>
        )}

        {previewLoadFailed ? (
          <div className="w-full rounded-xl border border-gray-300/20 p-6 text-center text-[color:var(--color-text-main)]">
            <p className="text-sm text-[color:var(--color-text-subtle)]">
              Resume preview could not be loaded in this browser.
            </p>
            <a
              href={ResumeFile}
              download="Sure-Surya-Resume.pdf"
              className="mt-4 inline-flex items-center gap-2 text-sm border theme-border-subtle px-3 py-2 rounded-2xl hover:bg-[color:var(--color-accent-soft)] duration-300"
            >
              <FiDownload />
              Download PDF Instead
            </a>
          </div>
        ) : (
          <iframe
            src={`${ResumeFile}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width`}
            className={`w-full h-[68vh] sm:h-[80vh] rounded-xl border border-gray-300/20 ${isLoadingPreview ? "hidden" : "block"}`}
            title="Sure Surya Resume"
            onLoad={() => {
              setIsLoadingPreview(false)
              setPreviewLoadFailed(false)
            }}
            onError={() => {
              setIsLoadingPreview(false)
              setPreviewLoadFailed(true)
            }}
          />
        )}
      </div>

    </section>
  )
}

export default Resume
