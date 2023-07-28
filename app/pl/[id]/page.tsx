import { bold } from "@/client";
import { PlaylistPlayer } from "@/components/playlist-player";

export default async function({ params }: any) {
  const { data: playlist } = await bold.playlists.get(params.id);
  return <PlaylistPlayer playlist={playlist} />
}
