import React, { Component } from 'react';
import './App.css';

const c = (...args) => console.info(...args)

class App extends Component {

  constructor(props) {

    super(props)

    this.drag = false
    this.initialDragPoints = undefined
    this.initialPosition = {
      x: 0,
      y: 0
    }

  }

  componentDidMount() {

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    setTimeout(() => {
      const img = document.getElementById("img")
      ctx.drawImage(img, this.initialPosition.x, this.initialPosition.y)
    }, 1000);

  }

  onMouseDown = e => {

    this.drag = true

    this.initialDragPoints = {
      x: e.clientX,
      y: e.clientY
    }

  }

  onMouseMove = e => {

    if (this.drag) {

      const initialDragPoints = this.initialDragPoints
      const finalDragPoints = { x: e.clientX, y: e.clientY }

      const movements = {
        x: this.initialPosition.x + (finalDragPoints.x - initialDragPoints.x),
        y: this.initialPosition.y + (finalDragPoints.y - initialDragPoints.y),
      }

      this.lastCanvasPosition = movements

      this.drawImage(movements.x, movements.y)

    }

  }

  onMouseUp = e => {

    this.drag = false
    this.initialPosition = this.lastCanvasPosition

  }

  onMouseOut = e => {

    this.drag = false

  }

  drawImage = (x = 0, y = 0) => {

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    const img = document.getElementById("img")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y)

  }

  render() {

    return (

      <div className="App">
        <canvas
          id="canvas"
          style={{ background: "gainsboro" }}
          onMouseDown={e => this.onMouseDown(e)}
          onMouseMove={e => this.onMouseMove(e)}
          onMouseUp={e => this.onMouseUp(e)}
          onMouseOut={e => this.onMouseOut(e)}
        />
        <div style={{ display: "none" }} >
          <img id="img" alt="default_img" src="../../images/matricula.png" />
        </div>
      </div>
    )

  }

}

export default App;