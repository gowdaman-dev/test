'use client'
import React, { useEffect } from 'react'
function page() {
  const [audiodata, setAudiodata] = React.useState('')
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
  /*useEffect(() => {
    Tts("hello there im gowdman").then((data) => {
      console.log(data);
      const url = URL.createObjectURL(data);
      setAudiodata(url)
    })
  }, [])*/
  return (
    <div>
      {
        audiodata ? <audio controls src={audiodata} /> : null
      }
    </div>
  )
}

export default page