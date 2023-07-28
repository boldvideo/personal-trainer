'use client'
import { formatDuration } from "@/util/format-duration";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MediaCommunitySkin, MediaOutlet, MediaPlayer, MediaPoster } from '@vidstack/react';

import 'vidstack/styles/defaults.css';
import 'vidstack/styles/community-skin/video.css';

export function PlaylistPlayer({ playlist }: { playlist: any }) {
  const searchParams = useSearchParams()
  const [currentVideoId, setCurrentVideoId] = useState(searchParams && searchParams.get('vid'))

  useEffect(() => {
    if (searchParams) {
      setCurrentVideoId(searchParams.get('vid'))
    }
  }, [searchParams])

  const video = playlist.videos[currentVideoId || 0]

  return (
    <div className="flex flex-row">
      <div className="w-[70%]">
        <div className="aspect-[16/9] bg-black mr-8 text-white">
          {video && <MediaPlayer
            title={video.title}
            src={video.stream_url}
            poster={video.thumbnail}
            thumbnails={`https://image.mux.com/${video.mux_playback_id}/storyboard.vtt`}
            aspectRatio={16 / 9}
            autoplay={true}
            crossorigin=""
          >
            <MediaOutlet>
              <MediaPoster
                alt={video.title}
              />
            </MediaOutlet>
            <MediaCommunitySkin />
          </MediaPlayer>
          }
        </div>
        <p>{video.description}</p>
      </div>
      <div className="w-[30%]">
        <ul className="flex flex-col gap-y-4">
          {playlist.videos.map((vid: any, idx: number) => (
            <Link key={vid.id} href={`/pl/${playlist.id}?vid=${idx}`}>
              <li className={`ring-1 flex flex-col ${currentVideoId && parseInt(currentVideoId) == idx && "font-semibold"}`}>
                <span>{vid.title}</span>
                <span>{formatDuration(vid.duration)}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
