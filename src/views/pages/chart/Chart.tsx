import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../../modules/reducers';
import { isEmptyObject } from '../../../utils/helpers';
import { Chart, fetchChart } from '../../../modules/chart/actions';
import { AlbumsChart } from '../../../components/AlbumsChart';
import { ArtistsChart } from '../../../components/ArtistsChart';
import { TracksChart } from '../../../components/TracksChart';

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
        <TracksChart title="Top 10 Tracks" tracks={data.tracks} isCarousel />
      )}
      {data.albums?.data.length && (
        <AlbumsChart title="Top 10 Albums" albums={data.albums} isCarousel />
      )}
      {data.artists?.data.length && (
        <ArtistsChart
          title="Top 10 Artists"
          artists={data.artists}
          isCarousel
        />
      )}
    </>
  );
};

const mapStateToProps = ({ chart: { data } }: StoreState) => {
  return { data };
};

const mapDispatchToProps = { fetchChart };

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);
