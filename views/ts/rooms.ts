const ws = new WebSocket(
    //@ts-ignore
    `${import.meta.env.VITE_MODE == "dev" ? "ws" : "wss"}://${import.meta.env.VITE_SOCKET_HOST}:${
        //@ts-ignore
        import.meta.env.VITE_SOCKET_PORT
    }`,
);

const send = function (data: any) {
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
    const parent = document.getElementById("rooms") as HTMLElement;
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
            window.location.href = "game/";
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
    const btnCreateRoom = document.getElementById("btn-create-room") as HTMLElement;

    btnCreateRoom.onclick = () => {
        //@ts-ignore
        const roomName = (document.getElementById("room-name") as HTMLElement).value;
        //@ts-ignore
        (document.getElementById("room-name") as HTMLElement).value = "";
        var xhr = new XMLHttpRequest();
        //@ts-ignore
        xhr.open(
            "POST",
            //@ts-ignore
            `${import.meta.env.VITE_MODE == "dev" ? "http" : "https"}://${
                //@ts-ignore
                import.meta.env.VITE_HOST
            }${
                //@ts-ignore
                import.meta.env.VITE_MODE == "dev" ? ":" + import.meta.env.VITE_EXPRESS_PORT : ""
            }/room/create`,
            true,
        );
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
                window.location.href = "game/";
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
