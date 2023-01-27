const ws = new WebSocket(
    //@ts-ignore
    `wss://${import.meta.env.VITE_HOST}/app_wss:${import.meta.env.VITE_SOCKET_PORT}`,
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

const setPlayers = (pos) => {
    let mapMatrix = mapText.split("\n");
    for (const [x, y] of pos) {
        mapMatrix[y + 1] =
            mapMatrix[y + 1].substring(0, x) + "0" + mapMatrix[y + 1].substring(x + 1);
    }
    return mapMatrix;
};

const drawMap = function (allPos) {
    const map = document.getElementById("game-map-div") as HTMLElement;
    const mapMatrix = setPlayers(allPos);
    map.textContent = mapMatrix.join("\n");
};

const send = function (data) {
    if (!ws.readyState) {
        setTimeout(function () {
            send(data);
        }, 100);
    } else {
        ws.send(data);
    }
};
onload = () => {
    const id = document.cookie.split("=")[1];
    send(`setClient_${id}`);
    drawMap([[0, 0]]);
};
this.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        send("go_left");
    } else if (e.keyCode == 38) {
        send("go_up");
    } else if (e.keyCode == 39) {
        send("go_right");
    } else if (e.keyCode == 40) {
        send("go_down");
    }
});

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
