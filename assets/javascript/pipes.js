
const {
    innerWidth,
    TweenMax,
    Power0,
    Zdog: { Illustration, TAU, Shape },
  } = window
  const randomInRange = (max, min) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const Scene = new Illustration({
    element: 'canvas',
    resize: 'fullscreen',
    dragRotate: true,
    rotate: {
      x: TAU * -0.075,
      y: TAU * 0.1,
    },
  })
  
  const AXIS_LENGTH = Math.max(300, innerWidth * 0.25)
  const PIPE_LIFESPAN = 2000
  const PIPE_SPEED = 0.002
  const PIPE_STROKE = 5
  const PIPE_COLORS = [
    '#e4e9ed',
    '#f27935',
    '#fef160',
    '#7befb2',
    '#6bb9f0',
    '#be90d4',
    '#f64747',
  ]
  let CURRENT_PIPE = undefined
  class Pipe {
    IS_ALIVE = true
    ACTIVE_AXIS = undefined
    LENGTH = 0
    SHAPE = undefined
    constructor(opts) {
      this.SHAPE = new Shape({
        addTo: Scene,
        stroke: PIPE_STROKE,
        closed: false,
        ...opts,
      })
      new Shape({
        addTo: Scene,
        stroke: PIPE_STROKE * 2,
        translate: opts.path[0],
        color: opts.color
      })
      this.start()
    }
    start = () => {
      this.ACTIVE_AXIS = ['x', 'y', 'z'].filter(v => v !== this.ACTIVE_AXIS)[
        this.ACTIVE_AXIS
          ? Math.floor(Math.random() * 2)
          : Math.floor(Math.random() * 3)
      ]
      this.SHAPE.path = [
        ...this.SHAPE.path,
        { ...this.SHAPE.path[this.SHAPE.path.length - 1] },
      ]
      const currentPos = this.SHAPE.path[this.SHAPE.path.length - 1][
        this.ACTIVE_AXIS
      ]
      const newPos = randomInRange(-AXIS_LENGTH / 2, AXIS_LENGTH / 2)
      const distance = Math.abs(newPos - currentPos)
      this.LENGTH += distance
      const duration = distance * PIPE_SPEED
      TweenMax.to(this.SHAPE.path[this.SHAPE.path.length - 1], duration, {
        [this.ACTIVE_AXIS]: newPos,
        ease: Power0.easeNone,
        onComplete: () => {
          new Shape({
            addTo: Scene,
            stroke: PIPE_STROKE * 2,
            color: this.SHAPE.color,
            translate: this.SHAPE.path[this.SHAPE.path.length - 1],
          })
          if (this.LENGTH > PIPE_LIFESPAN) {
            this.IS_ALIVE = false
          } else {
            this.start()
          }
        },
      })
    }
  }
  const start = () => {
    Scene.updateRenderGraph()
    Scene.rotate.y += 0.003
    requestAnimationFrame(start)
    if (!CURRENT_PIPE || !CURRENT_PIPE.IS_ALIVE) {
      const PIPE_OPTIONS = {
        color: PIPE_COLORS[Math.floor(Math.random() * PIPE_COLORS.length)],
        path: [
          {
            x: randomInRange(-AXIS_LENGTH / 2, AXIS_LENGTH / 2),
            y: randomInRange(-AXIS_LENGTH / 2, AXIS_LENGTH / 2),
            z: randomInRange(-AXIS_LENGTH / 2, AXIS_LENGTH / 2),
          },
        ],
      }
      CURRENT_PIPE = new Pipe(PIPE_OPTIONS)
    }
    if (CURRENT_PIPE && CURRENT_PIPE.IS_ALIVE) {
      CURRENT_PIPE.SHAPE.updatePathCommands()
    }
  }
  
  start();
  