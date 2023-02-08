const ws = new WebSocket(
    //@ts-ignore
    `${import.meta.env.VITE_MODE == "dev" ? "ws" : "wss"}://${import.meta.env.VITE_SOCKET_HOST}:${
        //@ts-ignore
        import.meta.env.VITE_SOCKET_PORT
    }`,
);
let mapText = `
############################################################################################################
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
############################################################################################################
`;

function setPlayers(pos) {
    let mapMatrix = mapText.split("\n");
    for (const [x, y] of pos) {
        mapMatrix[y + 1] =
            mapMatrix[y + 1].substring(0, x) + "0" + mapMatrix[y + 1].substring(x + 1);
    }
    return mapMatrix;
}

function drawMap(allPos) {
    const map = document.getElementById("game-map-div") as HTMLElement;
    const mapMatrix = setPlayers(allPos);
    map.textContent = mapMatrix.join("\n");
}

function send(data: string) {
    if (!ws.readyState) {
        setTimeout(() => {
            send(data);
        }, 100);
    } else {
        ws.send(data);
    }
}

onload = () => {
    const id = document.cookie.split("=")[1];
    send(`setClient_${id}`);
    drawMap([[0, 0]]);
};
var keyCode = "none";
addEventListener("keydown", (e) => {
    switch (e.keyCode) {
        case 37:
            keyCode = "go_left";
            break;
        case 38:
            keyCode = "go_up";
            break;
        case 39:
            keyCode = "go_right";
            break;
        case 40:
            keyCode = "go_down";
            break;
        default:
            break;
    }
});

setInterval(() => {
    if (keyCode !== "none") {
        send(keyCode);
        keyCode = "none";
    }
}, 100);

ws.onmessage = (res) => {
    const response = JSON.parse(res.data);
    const data = response.data;
    switch (response.type) {
        case "playersPos": {
            console.log(data);
            drawMap(data);
            break;
        }

        default: {
            break;
        }
    }
};
