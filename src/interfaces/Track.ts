import { Album } from './Album';
import { Artist } from './Artist';

export interface Track {
  id: number;
  title: string;
  preview: string;
  artist: Artist;
  album: Album;
  link: string;
}
