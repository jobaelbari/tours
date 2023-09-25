import { useState, useEffect } from 'react'

import Loading from './Components/Loading'
import Tours from './Components/Tours'
const url = 'https://course-api.com/react-tours-project'

const App = () => {
  const [tours, setTours] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [readMore, setReadMore] = useState(false)

  const handleNotInterested = (id) => {
    const newTours = tours.filter((tour) => tour.id != id)
    setTours(newTours)
  }
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setTours(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No Tours Left</h2>
          <button
            type='button'
            className='btn'
            style={{ marginTop: '2rem' }}
            onClick={fetchData}
          >
            Refresh
          </button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} onDelete={handleNotInterested} />
    </main>
  )
}
export default App
