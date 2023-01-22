const ws = new WebSocket("ws://localhost:5000");

const send = function (data) {
    if (!ws.readyState) {
        setTimeout(function () {
            send(data);
        }, 100);
    } else {
        ws.send(data);
    }
};

function showRoomsNames(names) {
    console.log(names);
    const parent = document.getElementById("rooms");
    parent.replaceChildren();

    for (const { name, id } of names) {
        console.log(name);
        const btnJoin = document.createElement("button");
        btnJoin.textContent = "Join";
        btnJoin.className = "btn-join";
        btnJoin.id = id;
        btnJoin.onclick = () => {
            send({});
        };

        const child = document.createElement("div");
        child.textContent = name;
        child.className = "one-room";
        parent.appendChild(child);
        parent.appendChild(btnJoin);
    }
}

onload = function () {
    const id = document.cookie.split("=")[1];
    send(`setClient_${id}`);
    const btnCreateRoom = document.getElementById("btn-create-room");

    btnCreateRoom.onclick = () => {
        const roomName = document.getElementById("room-name").value;
        document.getElementById("room-name").value = "";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/room/create", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
            JSON.stringify({
                roomName: roomName,
                userId: id,
            }),
        );
        xhr.onload = () => {
            if (xhr.status != 200) {
                // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else {
                // window.location.href = "/";
            }
        };
        send("getRooms");
    };
    send("getRooms");
};

ws.onmessage = (res) => {
    const response = JSON.parse(res.data);
    const data = response.data;
    switch (response.type) {
        case "roomsNames": {
            showRoomsNames(data);
            break;
        }

        default: {
            break;
        }
    }
};
