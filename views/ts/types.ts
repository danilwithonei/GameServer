interface Point {
    x: number;
    y: number;
}

export class GameMap {
    gameMap: string;
    mapMatrix: string[];

    constructor(mapText: string) {
        this.gameMap = mapText;
        this.mapMatrix = this.gameMap.split("\n");
    }

    setPlayers(pos: Point[]) {
        const reMapMatrix = this.mapMatrix;
        for (const point of pos) {
            reMapMatrix[point.y] =
                reMapMatrix[point.y].substring(0, point.x) +
                "0" +
                reMapMatrix[point.y].substring(point.x + 1);
        }
        return reMapMatrix.join("\n");
    }
}
