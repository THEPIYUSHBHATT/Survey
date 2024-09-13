import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid' // For generating unique session ID

const questions = [
  {
    id: 1,
    text: 'How satisfied are you with our products?',
    type: 'rating',
    scale: 5,
  },
  {
    id: 2,
    text: 'How fair are the prices compared to similar retailers?',
    type: 'rating',
    scale: 5,
  },
  {
    id: 3,
    text: 'How satisfied are you with the value for money of your purchase?',
    type: 'rating',
    scale: 5,
  },
  {
    id: 4,
    text: 'On a scale of 1-10 how would you recommend us to your friends and family?',
    type: 'rating',
    scale: 10,
  },
  { id: 5, text: 'What could we do to improve our service?', type: 'text' },
]

function Survey() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState(null) // To show error if no answer is selected
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false) // For submit confirmation
  const [sessionId] = useState(uuidv4()) // Unique session ID

  // Handle answer change
  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value,
    })
    setError(null) // Reset error when an answer is selected
  }

  // Handle skipping a question
  const handleSkip = () => {
    const confirmSkip = window.confirm(
      'Do you really want to skip this question?'
    )
    if (confirmSkip) {
      setAnswers({
        ...answers,
        [questions[currentQuestion].id]: 'unanswered',
      })
      setError(null) // Clear any previous errors
      handleNext() // Proceed to the next question
    }
  }

  // Handle next question
  const handleNext = () => {
    if (
      !answers[questions[currentQuestion].id] &&
      answers[questions[currentQuestion].id] !== 'unanswered'
    ) {
      setError(
        'Please select or enter an answer before proceeding, or skip the question.'
      )
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowSubmitConfirm(true) // Show submit confirmation on the last question
    }
  }

  // Handle previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // Submit survey
  const handleSubmit = () => {
    const surveyData = {
      sessionId,
      answers,
    }
    localStorage.setItem('surveyAnswers', JSON.stringify(surveyData)) // Save with session ID
    navigate('/thank-you')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">
          {questions[currentQuestion].text} ({currentQuestion + 1}/
          {questions.length})
        </h2>

        {/* Display Rating Input */}
        {questions[currentQuestion].type === 'rating' && (
          <div className="flex space-x-2 mb-4">
            {[...Array(questions[currentQuestion].scale).keys()].map((num) => (
              <button
                key={num + 1}
                onClick={() => handleAnswerChange(num + 1)}
                className={`w-12 h-12 rounded-full border ${
                  answers[questions[currentQuestion].id] === num + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-black'
                }`}
              >
                {num + 1}
              </button>
            ))}
          </div>
        )}

        {/* Display Text Input */}
        {questions[currentQuestion].type === 'text' && (
          <textarea
            value={answers[questions[currentQuestion].id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            className="border rounded-lg p-2 w-full"
            rows="3"
          />
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          ) : (
            <>
              <button
                onClick={handleSkip}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
              >
                Skip
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </>
          )}
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">
              Are you sure you want to submit the survey?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Survey
