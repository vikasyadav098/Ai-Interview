import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import startInterview from "../api/interviewApi"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/interview"

const Home = () => {
  const navigate = useNavigate()
  const [isStarting, setIsStarting] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleRole = async (jobRole, experience = "2") => {
    // Show loading and clear old errors before starting.
    setIsStarting(true)
    setErrorMessage("")

    try {
      const res = await startInterview(jobRole, experience)
      const id = res?.interviewId || res?.data?.interviewId

      if (!id) {
        throw new Error("Cannot find any interview id")
      }

      await axios.post(`${API_BASE_URL}/generatequestions`, {
        interviewId: id,
        role: jobRole,
        experience,
        techStack: "React Node MongoDB",
        difficulty: "medium",
        numberOfQuestions: 5,
      })

      navigate(`/interview/${id}`)
    } catch (err) {
      console.error("this is error", err)
      const serverMessage = err?.response?.data?.message || err?.message || "Something went wrong. Please try again."
      setErrorMessage(serverMessage)
    } finally {
      setIsStarting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 text-slate-100">
      <div className="w-full max-w-4xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Calm Practice</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">AI Interviewer</h1>
          <p className="mt-4 text-lg text-slate-300">Choose a role and begin your interview in a calm, focused space.</p>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {errorMessage}
          </div>
        ) : null}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <button
            onClick={() => handleRole("Frontend")}
            disabled={isStarting}
            className="rounded-2xl bg-slate-700 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isStarting ? "Starting..." : "Frontend"}
          </button>
          <button
            onClick={() => handleRole("Backend")}
            disabled={isStarting}
            className="rounded-2xl bg-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isStarting ? "Starting..." : "Backend"}
          </button>
          <button
            onClick={() => handleRole("MERN Stack")}
            disabled={isStarting}
            className="rounded-2xl bg-stone-600 px-6 py-3 font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isStarting ? "Starting..." : "MERN Stack"}
          </button>
          <button
            onClick={() => handleRole("Fullstack")}
            disabled={isStarting}
            className="rounded-2xl bg-slate-500 px-6 py-3 font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isStarting ? "Starting..." : "Fullstack"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
