import React from 'react';
import RowComponent from './RowComponent';

export default class SongData extends React.PureComponent {

  fetchDetails(songObj) {
    // whatever
  }

  renderResultRows(data) {
    return data.map(songObj => (
      <RowComponent
        key={songObj.id}
        data={songObj}
        onClick={this.fetchDetails}
      />;
  }

  render() {

    const { data } = this.props;

    return (
      <div>
        <table>
         <thead>
         </thead>
         <tbody>
          {
            this.renderResultRows(data)
          }
         </tbody>
        </table>
      </div>
    );
  }
}