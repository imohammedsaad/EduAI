import axios from 'axios';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export interface VideoDetails {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
}

export function extractVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
}

export async function getVideoDetails(url: string): Promise<VideoDetails> {
  const videoId = extractVideoId(url);
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch video details');
  }

  const data = await response.json();
  if (!data.items || data.items.length === 0) {
    throw new Error('Video not found');
  }

  const snippet = data.items[0].snippet;
  return {
    title: snippet.title,
    description: snippet.description,
    channelTitle: snippet.channelTitle,
    publishedAt: snippet.publishedAt
  };
}

interface PlaylistItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  position: number;
}

export async function getPlaylistVideos(playlistUrl: string): Promise<PlaylistItem[]> {
  const playlistId = extractPlaylistId(playlistUrl);
  if (!playlistId) throw new Error('Invalid playlist URL');

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/playlistItems`,
    {
      params: {
        part: 'snippet,contentDetails',
        playlistId: playlistId,
        maxResults: 50,
        key: API_KEY
      }
    }
  );

  const videoIds = response.data.items.map((item: any) => 
    item.contentDetails.videoId
  ).join(',');

  const videoDetails = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos`,
    {
      params: {
        part: 'contentDetails,snippet',
        id: videoIds,
        key: API_KEY
      }
    }
  );

  return response.data.items.map((item: any, index: number) => {
    const video = videoDetails.data.items[index];
    return {
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      duration: formatDuration(video.contentDetails.duration),
      position: item.snippet.position
    };
  });
}

function extractPlaylistId(url: string): string | null {
  const regex = /[?&]list=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';
  
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  
  let result = '';
  if (hours) result += `${hours}:`;
  result += `${minutes.padStart(2, '0')}:`;
  result += seconds.padStart(2, '0');
  return result;
} 