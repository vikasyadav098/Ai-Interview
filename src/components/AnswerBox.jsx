const AnswerBox = ({ value, onChange, onSubmit, loading, isLastQuestion }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-4 pb-20">
      <div className="w-full max-w-2xl rounded-xl border border-gray-700 bg-gray-800 p-6 shadow-2xl space-y-4">
        <textarea
          className="w-full resize-none rounded-lg bg-gray-700 p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your answer here..."
          value={value}
          onChange={onChange}
          rows="6"
        />

        <button
          onClick={onSubmit}
          disabled={loading || !value.trim()}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-bold text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : isLastQuestion
            ? "Finish Interview"
            : "Submit Answer"}
        </button>
      </div>
    </div>
  )
}

export default AnswerBox