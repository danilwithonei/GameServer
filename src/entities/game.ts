import { Client } from "./client";

export class Game {
    gameMap: string = `############################################################################################################
#                                                     |    |                                               #
#                                                     |    |                                               #
#                                                     |____|                                               #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                +----------------+                                                                        #
#                |                |                                                                        #
#                                 |                                                                        #
#                |                +----------------+                                                       #
#                |                                 |                                                       #
#                |                                 |                                                       #
#                |                       +---------+                                                       #
#                |                       |                                                                 #
#                +-----------------------+       +------+                                                  #
#                                                |      |                                                  #
#                                                |      |                                                  #
#                                                |      |                                                  #
#                                                |      |                                                  #
#                                                +------+                                                  #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                     +----------+                                                         #
#                                     |          |                                                         #
#                                     |          |                                                         #
#                                     |          |                                                         #
#                                     |          |                                                         #
#                            +---] [--+          +---[ ]-+                                                 #
#                            |                           |                                                 #
#                            |                   +-------+                                                 #
#                            |                   |                                                         #
#                            |                   |                                                         #
#                            |                   |                                                         #
#                            |                   |                                                         #
#                            +-------------------+                                                         #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
#                                                                                                          #
############################################################################################################`;
    mapMatrix = this.gameMap.split("\n");
    goTo(client: Client, duration: string) {
        switch (duration) {
            case "left": {
                if (this.mapMatrix[client.y][client.x - 1] === " ") {
                    client.x -= 1;
                }
                break;
            }
            case "right": {
                if (this.mapMatrix[client.y][client.x + 1] === " ") {
                    client.x += 1;
                }
                break;
            }
            case "up": {
                if (this.mapMatrix[client.y - 1][client.x] === " ") {
                    client.y -= 1;
                }
                break;
            }
            case "down": {
                if (this.mapMatrix[client.y + 1][client.x] === " ") {
                    client.y += 1;
                }
                break;
            }
        }
        // console.log(
        //     `left: ${this.mapMatrix[client.y][client.x - 1]} up: ${
        //         this.mapMatrix[client.y - 1][client.x]
        //     } right: ${this.mapMatrix[client.y][client.x + 1]} down: ${
        //         this.mapMatrix[client.y + 1][client.x]
        //     }`,
        // );
        // console.log(this.mapMatrix);
    }
}
