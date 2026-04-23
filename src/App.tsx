import { useEffect, useState } from 'react'
import { Counter } from './Counter'
import { Settings } from './Settings'
import { getError } from './Logic'
import './App.css'
import './Counter.css'

function App() {
  const [startValue, setStartValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0)
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [isSet, setIsSet] = useState<boolean>(false)

  const error = getError(startValue, maxValue)
  const hasError = error !== null


  const resetSettings = () => {
    setStartValue(0)
    setMaxValue(0)
    setCounter(0)
    setIsSet(false)

    localStorage.removeItem('startValue')
    localStorage.removeItem('maxValue')
  }

  //Enter values and press set
  //загрузка из localstorage
  useEffect(() => {
    const savedStart = localStorage.getItem('startValue')
    const savedMax = localStorage.getItem('maxValue')
    const savedTheme = localStorage.getItem('theme')

    if (savedStart && savedMax) {
      const start = (Number(savedStart))
      const max = (Number(savedMax))
      setStartValue(start)
      setMaxValue(max)
      setCounter(start)
      setIsSet(true)

    }
    if (savedTheme === 'light') {
      setTheme('light')
    }
  }, [])


  useEffect(() => {
    if (isSet && !hasError) {
      localStorage.setItem('startValue', startValue.toString())
      localStorage.setItem('maxValue', maxValue.toString())
    }
    localStorage.setItem('theme', theme)

  }, [isSet, hasError, startValue, maxValue, theme])

  const setValues = () => {
    const error = getError(startValue, maxValue)
    if (error) return
    setCounter(startValue)
    setIsSet(true)
  }
  const maxNumber = () => {
    setCounter(prev => Math.min(prev + 1, maxValue))
  }

  const resetButton = () => {
    setCounter(startValue)
  }

  return (
    <div className={`app ${theme}`}>
      <div className="theme-switch">
        <span>Dark</span>
        <label className='switch'>
          <input type="checkbox"
            checked={theme == 'light'}
            onChange={() =>
              setTheme(theme === 'dark' ? 'light' : 'dark')} />
          <span className='slider'></span>
        </label>
        <span>Light</span>
      </div>
      <Settings
        startValue={startValue}
        maxValue={maxValue}
        setStartValue={setStartValue}
        setMaxValue={setMaxValue}
        setValues={setValues}
        hasError={hasError}
        error={error}
        resetSettings={resetSettings}
        isSet={isSet}
      />
      <Counter
        counter={counter}
        maxValue={maxValue}
        isSet={isSet}
        error={error}
        maxNumber={maxNumber}
        resetButton={resetButton}
      />
    </div >
  )
}

export default App
