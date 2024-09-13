import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ThankYou() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">
        Thank you for completing the survey!
      </h1>
    </div>
  )
}

export default ThankYou
