import ResumeFile from "../assets/resume.pdf"
import { FaLongArrowAltLeft } from "react-icons/fa"
import { useNavigate } from "react-router"

const Resume = () => {
  const navigate = useNavigate()

  return (
    <section className="relative space-y-8 w-full border border-gray-300/20 rounded-2xl px-6 py-10 font-jetMono">

      
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm  text-white transition
        border-white border  p-3 rounded-2xl hover:text-black hover:bg-white duration-300 hover:rounded-3xl cursor-pointer
        "
      >
        <FaLongArrowAltLeft />
        Go Back
      </button>

     
      <div className="space-y-4 text-center">
        <h1 className="mx-auto max-w-2xl text-xl text-white underline-offset-8 hover:underline cursor-pointer">
          My resume.
        </h1>
      </div>

      
      <div className="h-px w-full bg-gray-300/20" />

      
      <div className="mx-auto w-full max-w-4xl">
        <iframe
          src={`${ResumeFile}#toolbar=0&navpanes=0&scrollbar=1&zoom=page-width`}
          className="w-full h-[80vh] rounded-xl border border-gray-300/20"
          title="Resume"
        />
      </div>

    </section>
  )
}

export default Resume
