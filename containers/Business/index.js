import React from 'react';
import getConfig from 'next/config';
import Router from 'next/router'

import DeckGL, {ScatterplotLayer} from 'deck.gl';
import {StaticMap} from 'react-map-gl';
import {MapboxLayer} from '@deck.gl/mapbox';

import './index.local.scss';

const { publicRuntimeConfig: config } = getConfig();

// Set your mapbox token here
const MAPBOX_TOKEN = config.mapBox.MAPBOX_ACCESS_TOKEN; // eslint-disable-line


const INITIAL_VIEW_STATE = {
    longitude: -85.3097,
    latitude: 35.0456,
    zoom: 13
};

export class Business extends React.Component {
    state = {};

    // DeckGL and mapbox will both draw into this WebGL context
    _onWebGLInitialized = (gl) => {
        this.setState({gl});
    }

    _onMapLoad = () => {
        const map = this._map;
        const deck = this._deck;

        map.addLayer(new MapboxLayer({id: 'my-scatterplot', deck}));
    }

    _renderTooltip() {
        const {hoveredObject, pointerX, pointerY} = this.state || {};
        return hoveredObject && (
            <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
                { hoveredObject.businessName }- {hoveredObject.businessStartDate} - {hoveredObject.recency}
            </div>
        );
    }

    _getColorAndRadius(d) {
        const red = [255, 102, 26];
        const green  = [140, 217, 140];
        const blue = [0, 51, 204];
        let color = green;
        let radius = 15;

        if (d.recency > 0.95) {
            color = blue;
            radius = 30;
        }
        if (d.recency <= 0.95 && d.recency > 0.70){
            color = red;
            radius = 20;
        }
        return {
            color: color,
            radius: radius
        };
    }

    backButton() {
        return (
            <div className='goBack'><a onClick={() => Router.back()}>Go Back</a></div>
        )
    }

    renderLegend() {
        return (
            <div className='legend'>
                <h3><b>Businesses that started between 1984-2019</b></h3>
                <p>
                    Each dot represents a business that applied for a new license in city of Chattanooga, TN.
                    Cluster of blue bots represents where businesses have opened recently.
                </p>
                <p>
                    Data source: <br />
                    <a href='https://data.chattlibrary.org/Economy/Business-License/cxem-8hbr'>
                        Chattanooga Open Data Portal
                    </a>
                </p>
                <p>
                Data provided by: <br />
                Chattanooga Finance and Administration Department
                </p>
                <hr />
                <table className='colors'>
                    <tr>
                        <td> Opened after 2017 </td>
                        <td className='blue' />
                    </tr>
                    <tr>
                        <td> Between 2008 and 2017 </td>
                        <td className='red' />
                    </tr>
                    <tr>
                        <td> Before 2008 </td>
                        <td className='green' />
                    </tr>
                </table>
                { this.backButton() }
            </div>
        )
    }

    render() {
        const {gl} = this.state;
        const layers = [
            new ScatterplotLayer({
                id: 'my-scatterplot',
                data: '/static/business_license.json',
                getPosition: d => [d.longitude, d.latitude],
                getRadius: d => this._getColorAndRadius(d).radius,
                getColor: d => this._getColorAndRadius(d).color,
                pickable: true,
                onHover: info => this.setState({
                    hoveredObject: info.object,
                    pointerX: info.x,
                    pointerY: info.y
                })
            })
        ];

        return (
            <div className='businessPage'>
                <DeckGL
                    className='deckContainer'
                    ref={ref => {
                        // save a reference to the Deck instance
                        this._deck = ref && ref.deck;
                    }}
                    layers={layers}
                    initialViewState={INITIAL_VIEW_STATE}
                    controller={true}
                    onWebGLInitialized={this._onWebGLInitialized}
                >
                    {gl && (
                        <StaticMap
                            ref={ref => {
                                // save a reference to the mapboxgl.Map instance
                                this._map = ref && ref.getMap();
                            }}
                            gl={gl}
                            mapStyle="mapbox://styles/mapbox/light-v9"
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            onLoad={this._onMapLoad}
                        />
                    )}
                    { this._renderTooltip() }
                </DeckGL>
                { this.renderLegend() }
            </div>
        );
    }
}

export default Business;