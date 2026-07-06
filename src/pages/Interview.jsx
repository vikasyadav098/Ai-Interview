import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import AnswerBox from "../components/AnswerBox"
import Loader from "../components/Loader"
import QuestionCard from "../components/QuestionCard"
import { useInterview } from "../context/useInterview"
import { evaluateInterview } from "../api/interviewApi"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/interview"

const Interview = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    questions,
    setQuestions,
    answers,
    setAnswers,
    loading,
    setLoading,
    submitting,
    setSubmitting,
    error,
    setError,
    setResult,
  } = useInterview()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")

  useEffect(() => {
    let isMounted = true

    const fetchInterview = async () => {
      setLoading(true)
      setCurrentIndex(0)
      setCurrentAnswer("")
      setError("")
      setAnswers([])

      try {
        const res = await axios.get(`${API_BASE_URL}/${id}`)
        const fetchedQuestions = Array.isArray(res?.data?.questions)
          ? res.data.questions
          : []

        if (isMounted) {
          setQuestions(fetchedQuestions)
        }
      } catch (error) {
        console.error("Failed to fetch interview questions:", error)

        if (isMounted) {
          setQuestions([])
          setError("Could not load questions. Please try again.")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (id) {
      fetchInterview()
    }

    return () => {
      isMounted = false
    }
  }, [id, setAnswers, setError, setLoading, setQuestions])

  const safeQuestions = Array.isArray(questions) ? questions : []
  const currentQuestion = safeQuestions[currentIndex]
  const hasQuestions = safeQuestions.length > 0
  const isLastQuestion = currentIndex === safeQuestions.length - 1

  const saveAnswer = () => {
    const trimmedAnswer = currentAnswer.trim()

    if (!trimmedAnswer) {
      setError("Please write an answer before submitting.")
      return null
    }

    const newAnswers = [...answers]
    newAnswers[currentIndex] = trimmedAnswer
    setAnswers(newAnswers)
    setCurrentAnswer("")
    setError("")

    return newAnswers
  }

  const handleSubmit = async () => {
    const updatedAnswers = saveAnswer()

    if (!updatedAnswers) {
      return
    }

    if (!isLastQuestion) {
      setCurrentIndex((prevIndex) => prevIndex + 1)
      return
    }

    try {
      setSubmitting(true)
      setError("")

      const resultData = await evaluateInterview(id, updatedAnswers, safeQuestions)
      setResult(resultData)
      navigate("/report", { state: { result: resultData, interviewId: id } })
    } catch (error) {
      console.error("Failed to complete interview:", error)
      setError("The interview could not be completed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex items-center justify-center bg-gray-800 py-4 text-2xl font-bold">
        Interview Page
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {hasQuestions ? (
            <QuestionCard
              question={currentQuestion?.question ?? "No Question Found"}
              currentNumber={currentIndex + 1}
              totalQuestions={safeQuestions.length}
            />
          ) : (
            <div className="mt-10 text-center text-gray-300">
              No questions found for this interview.
            </div>
          )}

          {error ? (
            <div className="mx-auto mt-4 w-full max-w-2xl rounded-lg border border-red-500 bg-red-900/40 px-4 py-3 text-sm text-red-100">
              {error}
            </div>
          ) : null}

          {hasQuestions ? (
            <AnswerBox
              value={currentAnswer}
              onChange={(event) => setCurrentAnswer(event.target.value)}
              onSubmit={handleSubmit}
              loading={submitting}
              isLastQuestion={isLastQuestion}
            />
          ) : null}
        </>
      )}
    </div>
  )
}

export default Interview