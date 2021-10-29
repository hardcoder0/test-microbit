class Player {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    draw() {
        led.plot(this.x, this.y)
    }

    collision(level: Level) {
        let collided: boolean = false
        level.level_points.forEach((level_point: LevelPoint, index: number) => {
            if(level_point.x == this.x && level_point.y == this.y) {
                collided = true
            }
        })
        
        return collided
    }
}

class LevelPoint {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Level {
    level_points: LevelPoint[] = []

    constructor() {}

    append_point(level_point: LevelPoint) {
        this.level_points.push(level_point)
    }

    draw() {
        this.level_points.forEach((level_point: LevelPoint, index: number) => {
            led.plotBrightness(level_point.x, level_point.y, 100)
        }); 
    }
}

let jumper: Player = new Player(2, 0)
let level: Level = new Level()

level.append_point(new LevelPoint(2, 4))

input.onButtonPressed(Button.A, () => {
    jumper.x -= 1
})

input.onButtonPressed(Button.B, () => {
    jumper.x += 1
})

input.onGesture(Gesture.Shake, function () {
    jumper.y -= 1
})

basic.forever(() => {
    jumper.draw()
    level.draw()

    jumper.y += 1

    if(jumper.collision(level)) {
        jumper.y -= 1;
    }

    basic.pause(100)
    basic.clearScreen()
})