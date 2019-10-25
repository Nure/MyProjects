import React, { Component } from 'react';
import Track from '../Track/Track';


class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track
                            key={track.id}
                            track={track}
                            artist={track.artist}
                            album={track.album}
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval}
                        />
                    })}
            </div>
        );
    }
}

export default TrackList;
