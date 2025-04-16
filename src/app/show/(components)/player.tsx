"use client"

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { CaptionsOff, CaptionsOn, Download, Fullscreen, MoreHorizontal, NextChapter, Pause, Play, PlayerSettings, Share, Volume, VolumeOff } from "@/components/global/icons"
import Image from "next/image"

type Chapter = {
 title: string
 time: number
}

type PlayerProps = {
 src: string
 title: string
 description: string
 captions?: string
 chapters: Chapter[]
 tags: string[]
}

const containerVariants = {
 hidden: {
  opacity: 0,
  y: 20
 },
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   duration: 1,
   ease: "easeInOut"
  }
 }
}

export default function Player({ title, description, src, captions, chapters = [], tags = [] }: PlayerProps) {
 const [isPlaying, setIsPlaying] = useState(false)
 const [volume, setVolume] = useState(1)
 const [progress, setProgress] = useState(0)
 const [duration, setDuration] = useState(0)
 const [playbackRate, setPlaybackRate] = useState(1)
 const [showSettings, setShowSettings] = useState(false)
 const [showCaptions, setShowCaptions] = useState(true)
 const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null)

 const videoRef = useRef<HTMLVideoElement>(null)

 useEffect(() => {
  const video = videoRef.current

  if (!video) return

  const handleTimeUpdate = () => setProgress(video.currentTime)
  const handleLoadedMetadata = () => setDuration(video.duration)

  video.addEventListener("timeupdate", handleTimeUpdate)
  video.addEventListener("loadedmetadata", handleLoadedMetadata)

  if (video.readyState >= 1) {
   setDuration(video.duration)
  }

  return () => {
   video.removeEventListener("timeupdate", handleTimeUpdate)
   video.removeEventListener("loadedmetadata", handleLoadedMetadata)
  }
 }, [])

 useEffect(() => {
  const video = videoRef.current

  if (!video) return

  const handleTimeUpdate = () => {
   const current = video.currentTime
   setProgress(current)

   const active = chapters
    .slice()
    .reverse()
    .find((ch) => current >= ch.time)

   setCurrentChapter(active ?? null)
  }

  const handleLoadedMetadata = () => setDuration(video.duration)

  video.addEventListener("timeupdate", handleTimeUpdate)
  video.addEventListener("loadedmetadata", handleLoadedMetadata)

  if (video.readyState >= 1) {
   setDuration(video.duration)
  }

  return () => {
   video.removeEventListener("timeupdate", handleTimeUpdate)
   video.removeEventListener("loadedmetadata", handleLoadedMetadata)
  }
 }, [ chapters ])

 const togglePlay = () => {
  const video = videoRef.current

  if (!video) return
  if (video.paused) {
   video.play()
   setIsPlaying(true)
  } else {
   video.pause()
   setIsPlaying(false)
  }
 }

 const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
  const vol = parseFloat(e.target.value)
  const video = videoRef.current

  if (video) {
   video.volume = vol
   setVolume(vol)
  }
 }

 const toggleFullscreen = () => {
  const video = videoRef.current

  if (video?.requestFullscreen) {
   video.requestFullscreen()
  }
 }

 const toggleCaptions = () => {
  const video = videoRef.current

  if (!video) return

  const track = video.textTracks[ 0 ]

  if (track) {
   track.mode = track.mode === "showing" ? "hidden" : "showing"
   setShowCaptions(track.mode === "showing")
  }
 }

 const skipToNextChapter = () => {
  const video = videoRef.current

  if (!video) return

  const current = video.currentTime
  const next = chapters.find(ch => ch.time > current)

  if (next) {
   video.currentTime = next.time
  }
 }

 const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")
  return `${mins}:${secs}`
 }

 return (
  <motion.div
   initial="hidden"
   animate="visible"
   variants={containerVariants}
   className="flex flex-col gap-2 col-span-7"
  >
   <div className="relative group">
    <video
     ref={videoRef}
     src={src}
     onClick={togglePlay}
     preload="metadata"
     className="rounded-lg cursor-pointer"
    >
     {captions && (
      <track
       label="English"
       kind="subtitles"
       srcLang="en"
       src={captions}
       default
      />
     )}
    </video>
    <div className="absolute bottom-0 w-full flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
     <div className="px-2">
      <div
       className="relative w-full h-2 cursor-pointer"
       onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const seek = (clientX: number) => {
         const x = clientX - rect.left
         const percentage = Math.min(Math.max(x / rect.width, 0), 1)
         const time = duration * percentage

         if (videoRef.current) {
          videoRef.current.currentTime = time
          setProgress(time)
         }
        }

        const handleMouseMove = (e: MouseEvent) => seek(e.clientX)
        const handleMouseUp = () => {
         document.removeEventListener("mousemove", handleMouseMove)
         document.removeEventListener("mouseup", handleMouseUp)
        }

        seek(e.clientX)

        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
       }}

       onTouchStart={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const seek = (clientX: number) => {
         const x = clientX - rect.left
         const percentage = Math.min(Math.max(x / rect.width, 0), 1)
         const time = duration * percentage

         if (videoRef.current) {
          videoRef.current.currentTime = time
          setProgress(time)
         }
        }

        const handleTouchMove = (e: TouchEvent) => seek(e.touches[0].clientX)
        const handleTouchEnd = () => {
         document.removeEventListener("touchmove", handleTouchMove)
         document.removeEventListener("touchend", handleTouchEnd)
        }

        seek(e.touches[0].clientX)

        document.addEventListener("touchmove", handleTouchMove)
        document.addEventListener("touchend", handleTouchEnd)
       }}
      >
       <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-1 bg-white/20 rounded-full" />
       <div
        className="absolute top-1/2 transform -translate-y-1/2 h-1 bg-blue-500 rounded-full transition-all duration-100 ease-linear"
        style={{ width: `${(progress / duration) * 100 || 0}%` }}
       />
       {chapters.map((ch, i) => {
        const left = (ch.time / duration) * 100
        return (
         <span
          key={i}
          title={ch.title}
          className="absolute h-1 bottom-[2px] w-1 bg-white opacity-60"
          style={{ left: `${left}%` }}
         />
        )
       })}
       <div
        className="absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-blue-500 rounded-full shadow"
        style={{ left: `${(progress / duration) * 100 || 0}%` }}
       />
      </div>
     </div>
     <div className="flex items-center justify-between gap-4 w-full rounded-b-lg bg-gradient-to-t from-slate-900/90 to-slate-900/10 p-2">
       <div className="flex items-center gap-2">
        <button
         onClick={togglePlay}
         aria-label="Toggle play"
         className="text-white cursor-pointer"
        >
         {isPlaying ? <Pause /> : <Play />}
        </button>
        <div className="relative flex items-center">
         <button
          onClick={() => handleVolumeChange({ target: { value: volume > 0 ? "0" : "1" } } as any)}
          aria-label="Toggle volume"
          className="text-white cursor-pointer"
         >
          {volume > 0 ? <Volume /> : <VolumeOff />}
         </button>
        </div>
        <span className="text-white text-xs">{formatTime(progress)} / {formatTime(duration)}</span>
        {chapters.length > 0 && (
         <div className="flex items-center gap-2">
          {currentChapter ? (
           <span className="text-white text-xs">{currentChapter.title}</span>
          ) : (
           <span className="text-white text-xs">Chapter 1</span>
          )}
          <button
           onClick={skipToNextChapter}
           aria-label="Next chapter"
           className="text-white cursor-pointer"
          >
           <NextChapter />
          </button>
         </div>
        )}
       </div>
       <div className="flex items-center gap-4">
        <button
         onClick={toggleCaptions}
         aria-label="Toggle captions"
         className="text-white cursor-pointer"
        >
         {showCaptions ? <CaptionsOn /> : <CaptionsOff />}
        </button>
        <div className="flex relative">
         <button
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Toggle settings"
          className="text-white cursor-pointer"
         >
          <PlayerSettings />
         </button>
         {showSettings && (
          <div className="flex flex-col p-2 rounded-md bg-black/70 text-white absolute bottom-[40px] right-0">
           <div className="flex items-center justify-between gap-4 px-2">
            <label htmlFor="playbackSpeed" className="text-sm text-nowrap">Playback Speed</label>
            <select
             id="playbackSpeed"
             value={playbackRate}
             className="w-full p-2 rounded"
             onChange={(e) => {
              const rate = parseFloat(e.target.value)
              setPlaybackRate(rate)
              if (videoRef.current) videoRef.current.playbackRate = rate
             }}
            >
             {[0.5, 1, 1.25, 1.5, 2].map(rate => (
              <option key={rate} value={rate}>{rate}x</option>
             ))}
            </select>
           </div>
           <div className="flex items-center justify-between gap-4 px-2">
            <label htmlFor="videoQuality" className="text-sm text-nowrap">Video Quality</label>
            <select id="videoQuality" className="w-full p-2 rounded">
             <option>Auto (720p)</option>
             <option>1080p</option>
             <option>720p</option>
             <option>480p</option>
            </select>
           </div>
          </div>
         )}
        </div>
        <button
         onClick={toggleFullscreen}
         aria-label="Toggle fullscreen"
         className="text-white cursor-pointer"
        >
         <Fullscreen />
        </button>
       </div>
     </div>
    </div>
   </div>
   <div className="flex flex-col gap-2">
    <h1 className="text-slate-700 text-lg font-medium">{title}</h1>
    <div className="flex items-center justify-between">
     <div className="flex items-center gap-2">
      <Image
       src="/shield-logo.png"
       alt="UT Health San Antonio logo"
       width={40}
       height={40}
       className="rounded-full"
      />
      <div className="flex flex-col">
       <h2 className="text-slate-700 font-medium">UT Healthier TV</h2>
       <p className="text-slate-500 text-sm">1.1k views | 5 days ago</p>
      </div>
     </div>
     <div className="flex items-center gap-2">
      <button aria-label="Share" className="flex items-center justify-center gap-1 text-slate-700 rounded-full p-2 px-3 bg-gray-100 hover:bg-slate-100 transition cursor-pointer">
       <Share />
       Share
      </button>
      <button aria-label="Download" className="flex items-center justify-center gap-1 text-slate-700 rounded-full p-2 px-3 bg-gray-100 hover:bg-slate-100 transition cursor-pointer">
       <Download />
       Download
      </button>
      <button aria-label="More" className="flex items-center justify-center text-slate-700 p-2 rounded-full bg-gray-100 hover:bg-slate-100 transition cursor-pointer">
       <MoreHorizontal />
      </button>
     </div>
    </div>
    <div className="flex flex-col gap-3 bg-gray-100 rounded-lg p-3">
     <p className="text-slate-700 text-sm">{description}</p>
     <ul className="flex items-center gap-2">
      {tags.map((tag, i) => (
       <li key={i} className="text-slate-700 text-sm">{tag}</li>
      ))}
     </ul>
    </div>
   </div>
  </motion.div>
 )
}