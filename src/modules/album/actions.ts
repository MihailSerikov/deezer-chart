import { Dispatch } from 'redux';
import { Track } from '../../interfaces';
import { api, createApiAction, FetchedInstance } from '../../utils/api';

export interface FetchAlbumTracksAction {
  type: string;
  payload: FetchedInstance<Track>;
  id: number;
}

export const FETCH_ALBUM_TRACKS = createApiAction('FETCH_ALBUM_TRACKS');

export const startFetchAlbumTracks = () => ({
  type: FETCH_ALBUM_TRACKS.REQUEST,
});

export const finishFetchAlbumTracks = (data: Track[]) => ({
  type: FETCH_ALBUM_TRACKS.SUCCESS,
  payload: data,
});

export const failFetchAlbumTracks = (error: Error) => ({
  type: FETCH_ALBUM_TRACKS.FAIL,
  payload: error,
});

// export const fetchAlbumTracks = (id: number) => async (dispatch: Dispatch) => {
//   const response = await api.get(`/album/${id}/tracks/`);

//   dispatch<FetchAlbumTracksAction>({
//     type: ActionTypes.fetchAlbumTracks,
//     payload: response.data,
//     id,
//   });
// };
