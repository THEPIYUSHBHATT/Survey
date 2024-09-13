import { useNavigate } from 'react-router-dom'

function Welcome() {
  const navigate = useNavigate()

  const startSurvey = () => {
    navigate('/survey')
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Survey</h1>
      <button
        onClick={startSurvey}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Start Survey
      </button>
    </div>
  )
}

export default Welcome
