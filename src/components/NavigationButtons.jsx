/* eslint-disable react/prop-types */
const NavigationButtons = ({
  currentQuestion,
  setCurrentQuestion,
  totalQuestions,
  submitSurvey,
  isAnswered,
}) => {
  return (
    <div className="flex space-x-4 mt-6">
      {currentQuestion > 0 && (
        <button
          className="px-4 py-2 bg-gray-300 border border-black rounded"
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          Previous
        </button>
      )}
      {currentQuestion < totalQuestions - 1 ? (
        <button
          className={`px-4 py-2 rounded border border-black transition-all ${
            isAnswered
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={setCurrentQuestion}
          disabled={!isAnswered}
        >
          Next
        </button>
      ) : (
        <button
          className={`px-4 py-2 rounded border border-black transition-all ${
            isAnswered
              ? 'bg-green-500 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          onClick={submitSurvey}
          disabled={!isAnswered}
        >
          Submit
        </button>
      )}
    </div>
  )
}

export default NavigationButtons
