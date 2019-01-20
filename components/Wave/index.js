import React, { Component } from 'react';
import Link from 'next/link'

import './index.local.scss';


function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.fillRect(x, y, width, height);
}

class Wave extends Component {

    state = {
        currentCount: 0,
        xMax: 300,
        yMax: 150
    };

    timer = () => {
        const canvas = this.refs.canvas;

        if (canvas != null) {
            // setState method is used to update the state
            this.setState({ currentCount: this.state.currentCount +1 });


            // Keep re-drawing X-Y axes
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = 'black';
            ctx.clearRect(0,0, 300, 300);

            this.drawXYAxes(ctx, this.state.xMax, this.state.yMax);

            // Keep re-drawing Sine-waves
            ctx.fillStyle = '#1b9db7';
            this.drawSineWave(ctx, this.state.xMax, this.state.yMax);
        }
    };

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

    drawSineWave(ctx, xMax, yMax, freq=3, amp=40) {
        let yCenter = yMax / 2;
        let x, y;
        for (x = 0; x < xMax; x++) {
            let movingX = x - this.state.currentCount % xMax;
            y = yCenter + amp * Math.sin(2 * Math.PI * freq * movingX / xMax);
            rect({ctx, x:x, y:y, width: 1, height: 1});
        }
    }

    componentDidMount() {
        setInterval(this.timer, 50);

        window.requestAnimationFrame(this.timer);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({
            currentCount: 0
        })
    }

    render() {
        return(
            <div className='waveChartContainer'>
                <Link prefetch href='/about'>
                    <canvas ref="canvas" width={this.state.xMax} height={this.state.yMax + 1} />
                </Link>
            </div>
        )
    }
}

export default Wave;