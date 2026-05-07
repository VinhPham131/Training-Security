import { useEffect, useRef, useState } from 'react'

export function useBackgroundMusic(src, { volume = 0.4, loop = true } = {}) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    audioRef.current = new Audio(src)
    audioRef.current.loop = loop
    audioRef.current.volume = volume

    return () => {
      audioRef.current.pause()
      audioRef.current = null
    }
  }, [src, loop, volume])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {})
    }
    setPlaying(prev => !prev)
  }

  return { playing, toggle }
}
