import { useState } from "react"
import { InterviewContext } from "./InterviewContext"

export const InterviewProvider = ({ children }) => {
  // Store the questions loaded for the current interview.
  const [questions, setQuestions] = useState([])

  // Store all user answers for each question.
  const [answers, setAnswers] = useState([])

  // Basic loading state for data fetching and form submission.
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Shared error and result state for the interview flow.
  const [error, setError] = useState("")
  const [result, setResult] = useState(null)

  return (
    <InterviewContext.Provider
      value={{
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
        result,
        setResult,
      }}
    >
      {children}
    </InterviewContext.Provider>
  )
}

export default InterviewProvider