import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../../modules/reducers';
import { isEmptyObject } from '../../../utils/helpers';
import TracksList from '../../../components/TracksList';
import AlbumsList from '../../../components/AlbumsList';
import { Chart, fetchChart } from '../../../modules/chart/actions';

interface ChartProps {
  data: Chart;
  fetchChart: Function;
}

const ChartPage = ({ data, fetchChart }: ChartProps) => {
  useEffect(() => {
    // Fix charts fetch !!!
    if (isEmptyObject(data)) {
      fetchChart();
    }
  }, [data, fetchChart]);

  return (
    <>
      <h1 className="center-align">Chart</h1>
      {data.tracks?.data.length && (
        <TracksList title="Top 10 Tracks" tracks={data.tracks} isCarousel />
      )}
      {data.albums?.data.length && (
        <AlbumsList title="Top 10 Albums" albums={data.albums} isCarousel />
      )}
    </>
  );
};

const mapStateToProps = ({ chart: { data } }: StoreState) => {
  return { data };
};

const mapDispatchToProps = { fetchChart };

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);
