const QuestionCard = ({ question, currentNumber, totalQuestions }) => {
  const displayQuestion = question ?? "No Question Found"

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-2xl space-y-6">
        <p className="text-center text-2xl font-bold text-white">
          <strong>🎤 AI Interview</strong>
        </p>

        <div className="rounded-lg bg-gray-700 px-4 py-2 text-center text-sm text-gray-300">
          Question {currentNumber} of {totalQuestions}
        </div>

        <p className="text-center text-3xl font-bold leading-relaxed text-blue-300">
          {displayQuestion}
        </p>
      </div>
    </div>
  )
}

export default QuestionCard
