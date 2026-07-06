import { useLocation, useNavigate } from "react-router-dom"

const Report = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const result = location?.state?.result
  const interviewId = location?.state?.interviewId

  const score = result?.totalScore ?? result?.score ?? result?.data?.score ?? result?.overallScore ?? "N/A"
  const feedback =
    result?.evaluation?.overAllFeedback ??
    result?.overAllFeedback ??
    result?.feedback ??
    result?.data?.feedback ??
    result?.summary ??
    "No feedback available yet."
  const suggestions =
    result?.evaluation?.improvements ??
    result?.improvements ??
    result?.suggestions ??
    result?.improvementSuggestions ??
    result?.data?.suggestions ??
    result?.data?.improvementSuggestions ??
    []
  const rating =
    result?.evaluation?.finalRating ??
    result?.finalRating ??
    result?.rating ??
    result?.data?.finalRating ??
    result?.data?.rating ??
    "N/A"

  const suggestionList = Array.isArray(suggestions) ? suggestions : [suggestions]

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-lg">
        <p className="text-sm uppercase tracking-wide text-gray-400">Interview Summary</p>
        <h1 className="mt-2 text-2xl font-bold">Your interview result</h1>
        <p className="mt-2 text-sm text-gray-400">Interview ID: {interviewId || "Unknown"}</p>

        <div className="mt-6 rounded-lg border border-gray-700 bg-gray-900 p-4">
          <p className="text-sm text-gray-400">Score</p>
          <p className="mt-1 text-3xl font-semibold text-green-400">{score}</p>
        </div>

        <div className="mt-4 rounded-lg border border-gray-700 bg-gray-900 p-4">
          <p className="text-sm text-gray-400">Rating</p>
          <p className="mt-1 text-xl font-semibold text-blue-400">{rating}</p>
        </div>

        <div className="mt-4 rounded-lg border border-gray-700 bg-gray-900 p-4">
          <p className="text-sm text-gray-400">Feedback</p>
          <p className="mt-2 text-sm leading-6 text-gray-300">{feedback}</p>
        </div>

        <div className="mt-4 rounded-lg border border-gray-700 bg-gray-900 p-4">
          <p className="text-sm text-gray-400">Suggestions</p>
          {suggestionList.length > 0 ? (
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-300">
              {suggestionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-300">No suggestions were returned.</p>
          )}
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Try another interview
        </button>
      </div>
    </div>
  )
}

export default Report