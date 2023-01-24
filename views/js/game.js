const ws = new WebSocket("ws://localhost:5000");

function drawMap() {
    const map = document.getElementById("game-map-div");
    map.textContent = `
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
}

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
    drawMap();
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
    console.log(data);
    switch (response.type) {
        case "playersPos": {
            drawMap();
            break;
        }

        default: {
            break;
        }
    }
};
