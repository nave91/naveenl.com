import React, { Component } from 'react';
import './index.local.scss';


function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
};

class Wave extends Component {

    drawXYAxes(ctx, xMax, yMax) {
        let x, y;
        for (x = 0; x < xMax; x++) {
            for (y = 0; y < yMax; y++ ) {
                rect({ctx, x:0, y:y, width: 1, height: 1});
                rect({ctx, x:x, y:yMax, width: 1, height: 1});

                if (x % 10 < 5) {
                    rect({ctx, x:x, y:yMax/2, width: 1, height: 1});
                }
            }
        }
    }

    drawSineWave(ctx, xMax, yMax, freq=3, amp=50) {
        let yCenter = yMax / 2;
        let x, y;
        for (x = 0; x < xMax; x++) {
            y = yCenter + amp * Math.sin(2 * Math.PI * freq * x / xMax);
            rect({ctx, x:x, y:y, width: 1, height: 1});
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0, 300, 300);

        let xMax = 400;
        let yMax = 200;

        this.drawXYAxes(ctx, xMax, yMax);

        const sineCanvas = this.refs.canvas;
        const sineCtx = sineCanvas.getContext("2d");
        sineCtx.fillStyle = '#1b9db7';

        this.drawSineWave(sineCtx, xMax, yMax);
    }

    render() {
        return(
            <div className='waveChartContainer'>
                <canvas ref="canvas" width={640} height={425} />
            </div>
        )
    }
}

export default Wave;