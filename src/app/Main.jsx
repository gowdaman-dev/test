"use client"
import { useEffect, useState } from 'react'
function Main() {
  const [audiodata, setAudiodata] = useState('')
  useEffect(() => {
    fetch('/api/reader', {
      method: 'POST',
      headers: {
        'Content-Type': 'audio/flac'
      }
    }).then((data) => data.blob()).then((data) => {
      const url = URL.createObjectURL(data);
      setAudiodata(url)
    })
  }, [])
  return (
    <div>
      {
        audiodata ? <audio controls src={audiodata} /> : null
      }
    </div>
  )
}

export default Main