function urlParse() {
    const url = String(window.location.href);
    return url.split("://")[1].split("/")[0].split(":")[0];
}
const ws = await getUrl();

async function getUrl() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/rooms/socketUrl", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
    xhr.onload = () => {
        if (xhr.status != 200) {
            // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
        } else {
            return new WebSocket(xhr.responseText);
        }
    };
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
        const clientId = document.cookie.split("=")[1];
        btnJoin.onclick = () => {
            send(`join_${clientId}|${id}`);
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
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `https://${urlParse()}/room/create`, true);
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
                const roomId = xhr.responseText;
                send(`join_${id}|${roomId}`);
            }
        };
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
