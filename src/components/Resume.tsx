const ResumeFile = "/resume.pdf";
import { FaLongArrowAltLeft, FaRegFilePdf } from "react-icons/fa"
import { FiDownload } from "react-icons/fi"
import { useNavigate } from "react-router"
import { useState } from "react"

const Resume = () => {
  const navigate = useNavigate()
  const [isLoadingPreview, setIsLoadingPreview] = useState(true)
  const [previewLoadFailed, setPreviewLoadFailed] = useState(false)

  return (
    <section className="relative w-full px-4 py-8 sm:px-8 sm:py-12 border border-gray-300/20 rounded-3xl font-jetMono overflow-hidden group transition-all duration-700 hover:border-gray-300/40 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] bg-gradient-to-b from-transparent to-[color:var(--color-accent-soft)]">

      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[color:var(--color-text-main)] rounded-full blur-[120px] opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity duration-1000 transform translate-x-1/3 -translate-y-1/3" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-10">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="group inline-flex items-center gap-3 text-sm text-[color:var(--color-text-main)] transition-all border border-gray-300/20 px-5 py-2.5 rounded-2xl hover:bg-[color:var(--color-text-main)] hover:text-black duration-500 cursor-pointer"
        >
          <FaLongArrowAltLeft className="transition-transform duration-500 group-hover:-translate-x-1.5" />
          <span className="font-medium tracking-wide">Back to Home</span>
        </button>

        <a
          href={ResumeFile}
          download="Sure-Surya-Resume.pdf"
          className="group inline-flex items-center gap-3 text-sm font-medium tracking-wide text-black bg-[color:var(--color-text-main)] transition-all border border-transparent px-5 py-2.5 rounded-2xl hover:bg-transparent hover:text-[color:var(--color-text-main)] hover:border-gray-300/40 duration-500 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-none"
        >
          <span className="relative overflow-hidden flex items-center gap-2">
            <FiDownload className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:scale-110" />
            Download PDF
          </span>
        </a>
      </div>

      <div className="relative z-10 space-y-4 text-center mb-10">
        <div className="inline-flex items-center justify-center gap-2 mx-auto px-4 py-1.5 rounded-full border border-gray-300/20 bg-black/20 backdrop-blur-md">
          <FaRegFilePdf className="text-[color:var(--color-text-subtle)] text-sm" />
          <span className="text-xs font-semibold tracking-[0.2em] text-[color:var(--color-text-subtle)] uppercase">
            Curriculum Vitae
          </span>
        </div>
        <h1 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-bold bg-gradient-to-br from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight">
          My Resume
        </h1>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl" aria-busy={isLoadingPreview && !previewLoadFailed}>
        <div className="relative bg-[#0A0A0A] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-all duration-700 hover:ring-white/20">

          {isLoadingPreview && !previewLoadFailed && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-xl">
              <div className="relative flex justify-center items-center w-16 h-16 mb-6">
                <div className="absolute w-full h-full border border-white/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute w-10 h-10 border border-white/40 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
              </div>
              <p className="text-xs tracking-[0.3em] font-medium text-white/70 uppercase animate-pulse">
                Rendering Preview
              </p>
            </div>
          )}

          {previewLoadFailed ? (
            <div className="w-full h-[68vh] sm:h-[80vh] flex flex-col items-center justify-center p-8 text-center bg-[#111]">
              <div className="w-20 h-20 mb-6 rounded-full bg-red-500/5 flex items-center justify-center border border-red-500/20 text-red-400">
                <FaRegFilePdf className="text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3">Preview Unavailable</h3>
              <p className="text-sm text-gray-400 max-w-md mb-8 leading-relaxed">
                Your browser seems to have restricted PDF preview rendering. You can safely download the file securely below.
              </p>
              <a
                href={ResumeFile}
                download="Sure-Surya-Resume.pdf"
                className="inline-flex items-center gap-3 text-sm border border-gray-300/20 px-6 py-3 rounded-2xl hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 font-medium tracking-wide"
              >
                <FiDownload className="text-lg" />
                Download PDF
              </a>
            </div>
          ) : (
            <iframe
              src={`${ResumeFile}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width`}
              className={`w-full h-[68vh] sm:h-[80vh] transition-all duration-1000 ${isLoadingPreview ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
              title="Sure Surya Resume"
              style={{ backgroundColor: '#0A0A0A' }}
              onLoad={() => {
                setTimeout(() => {
                  setIsLoadingPreview(false)
                  setPreviewLoadFailed(false)
                }, 600)
              }}
              onError={() => {
                setIsLoadingPreview(false)
                setPreviewLoadFailed(true)
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default Resume
