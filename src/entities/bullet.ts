import { Point, Duration } from "../interfaces";

export class Bullet {
    clientId: string;
    position: Point;
    duration: Duration;
    live: boolean = true;

    constructor(clientId: string, position: Point, duration: Duration) {
        this.clientId = clientId;
        this.position = { x: position.x, y: position.y };
        this.duration = duration;
    }
    go() {
        switch (this.duration) {
            case Duration.up: {
                this.position.y -= 1;
                break;
            }
            case Duration.right: {
                this.position.x += 1;
                break;
            }
            case Duration.down: {
                this.position.y += 1;
                break;
            }
            case Duration.left: {
                this.position.x -= 1;
                break;
            }
        }
    }
}
