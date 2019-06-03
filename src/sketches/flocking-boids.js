export default function (s) {
    class Boid {
        constructor() {
            this.position = s.createVector(s.random(s.width), s.random(s.height))
            this.velocity = window.p5.Vector.random2D()
            this.velocity.setMag(s.random(2, 4))
            this.acceleration = s.createVector()
            this.maxForce = 1
            this.maxSpeed = 4
        }

        edges() {
            if (this.position.x > s.width) {
                this.position.x = 0
            }
            else if (this.position.x < 0) {
                this.position.x = s.width
            }
            if (this.position.y > s.height) {
                this.position.y = 0
            }
            else if (this.position.y < 0) {
                this.position.y = s.height
            }
        }

        align(boids) {
            const perceptionRadius = 50
            const steering = s.createVector()
            let total = 0
            boids.forEach((other) => {
                const d = s.dist(this.position.x, this.position.y, other.position.x, other.position.y)
                if (other !== this && d < perceptionRadius) {
                    steering.add(other.velocity)
                    total++
                }
            })
            if (total > 0) {
                steering.div(total)
                steering.setMag(this.maxSpeed)
                steering.sub(this.velocity)
                steering.limit(this.maxForce)
            }
            return steering
        }

        cohesion(boids) {
            const perceptionRadius = 100
            const steering = s.createVector()
            let total = 0
            boids.forEach((other) => {
                const d = s.dist(this.position.x, this.position.y, other.position.x, other.position.y)
                if (other !== this && d < perceptionRadius) {
                    steering.add(other.position)
                    total++
                }
            })
            if (total > 0) {
                steering.div(total)
                steering.sub(this.position)
                steering.setMag(this.maxSpeed)
                steering.sub(this.velocity)
                steering.limit(this.maxForce)
            }
            return steering
        }

        separation(boids) {
            const perceptionRadius = 50
            const steering = s.createVector()
            let total = 0
            boids.forEach((other) => {
                const d = s.dist(this.position.x, this.position.y, other.position.x, other.position.y)
                if (other !== this && d < perceptionRadius) {
                    const diff = window.p5.Vector.sub(this.position, other.position)
                    diff.div(d * d)
                    steering.add(diff)
                    total++
                }
            })
            if (total > 0) {
                steering.div(total)
                steering.setMag(this.maxSpeed)
                steering.sub(this.velocity)
                steering.limit(this.maxForce)
            }
            return steering
        }

        flock(boids) {
            const alignment = this.align(boids)
            const cohesion = this.cohesion(boids)
            const separation = this.separation(boids)

            const {
                alignSlider = 1,
                cohesionSlider = 1,
                separationSlider = 1,
            } = s.state || {}
            alignment.mult(alignSlider)
            cohesion.mult(cohesionSlider)
            separation.mult(separationSlider)

            this.acceleration.add(alignment)
            this.acceleration.add(cohesion)
            this.acceleration.add(separation)
        }

        update() {
            this.position.add(this.velocity)
            this.velocity.add(this.acceleration)
            this.velocity.limit(this.maxSpeed)
            this.acceleration.mult(0)
        }

        show() {
            s.strokeWeight(8)
            s.stroke(255)
            s.point(this.position.x, this.position.y)
        }
    }

    const flocks = []

    s.setup = () => {
        s.createCanvas(640, 360)

        for (let i = 0; i < 200; i++) {
            flocks.push(new Boid());
        }
    }

    s.draw = () => {
        s.background(51)
        flocks.forEach((boid) => {
            boid.edges()
            boid.flock(flocks)
            boid.update()
            boid.show()
        })
    }
}
