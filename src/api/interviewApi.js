import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/interview"

const startInterview = async (role, experience = "") => {
  try {
    const response = await axios.post(`${BASE_URL}/create`, {
      jobRole: role,
      experience,
    })

    return response.data
  } catch (err) {
    console.error("This is the error", err)
    throw err
  }
}

export const evaluateInterview = async (interviewId, answers, questions = []) => {
  // Send the data to the backend submit endpoint.
  const payload = {
    interviewId,
    answers,
    questions,
  }

  const routes = [
    `${BASE_URL}/submit`,
    `${BASE_URL}/evaluate`,
    `${BASE_URL}/${interviewId}/evaluate`,
  ]

  let lastError = null

  for (const route of routes) {
    try {
      const response = await axios.post(route, payload)
      return response.data
    } catch (err) {
      lastError = err
    }
  }

  throw lastError
}

export default startInterview