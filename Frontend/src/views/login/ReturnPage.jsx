import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const ReturnPage = () => {
  const [params] = useSearchParams()
  const goTo = useNavigate()

  useEffect(() => {
    const received = params.get('token')

    if (received) {
      localStorage.setItem('myPass', received)
      goTo('/', { replace: true })
    } else {
      goTo('/login', { replace: true })
    }
  }, [])

  return <p>Accesso in corso...</p>
}

export default ReturnPage