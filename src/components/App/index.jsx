import React, { useState } from 'react'
import { hot } from 'react-hot-loader'

import flockingBoids from '../../sketches/flocking-boids'

import p5Wrapper from '../P5Wrapper'

import './style.css' // TODO:

const P5Wrapper = p5Wrapper()

function App() {
    const [state, setState] = useState({
        alignSlider: 1,
        cohesionSlider: 1,
        separationSlider: 1,
    })

    return (
        <>
            <div className="app-content section">
                <div className="inputs-wrapper">
                    <em>
                        align:&nbsp;
                        {state.alignSlider}
                    </em>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.01}
                        value={state.alignSlider}
                        className="slider"
                        onChange={(event) => {
                            event.persist()
                            setState(prevState => ({
                                ...prevState,
                                alignSlider: +event.target.value,
                            }))
                        }}
                    />

                    <em>
                        cohesion:&nbsp;
                        {state.cohesionSlider}
                    </em>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.01}
                        value={state.cohesionSlider}
                        className="slider"
                        onChange={(event) => {
                            event.persist()
                            setState(prevState => ({
                                ...prevState,
                                cohesionSlider: +event.target.value,
                            }))
                        }}
                    />

                    <em>
                        separation:&nbsp;
                        {state.separationSlider}
                    </em>
                    <input
                        type="range"
                        min={0}
                        max={2}
                        step={0.01}
                        value={state.separationSlider}
                        className="slider"
                        onChange={(event) => {
                            event.persist()
                            setState(prevState => ({
                                ...prevState,
                                separationSlider: +event.target.value,
                            }))
                        }}
                    />
                </div>

                <div className="section-content">
                    <P5Wrapper
                        sketch={flockingBoids}
                        state={state}
                    />
                </div>
            </div>

            <p className="github">
                <a href="https://github.com/atorov/react-p5js-flocking-boids-demo">
                    <img
                        alt="github logo"
                        src="/img/github-logo.png"
                        border="0"
                        width="auto"
                        height="28px"
                    />
                </a>
            </p>
        </>
    )
}

export default module.hot ? hot(module)(App) : App
