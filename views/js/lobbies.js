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

function showLobbiesNames(names) {
    const parent = document.getElementById("lobbies");
    parent.replaceChildren();

    for (const { name, id } of names) {
        const btnJoin = document.createElement("button");
        btnJoin.textContent = "Join";
        btnJoin.className = "btn-join";
        btnJoin.id = id;
        btnJoin.onclick = () => {
            send({});
        };

        const child = document.createElement("div");
        child.textContent = name;
        child.className = "one-lobby";
        parent.appendChild(child);
        parent.appendChild(btnJoin);
    }
}

onload = function () {
    const id = document.cookie.split("=")[1];
    const btnCreateLobby = document.getElementById("btn-create-lobby");

    btnCreateLobby.onclick = () => {
        const lobbyName = document.getElementById("lobby-name").value;
        console.log(lobbyName);
        document.getElementById("lobby-name").value = "";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/lobby/create", true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
            JSON.stringify({
                lobbyName: lobbyName,
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
    };

    send("getLobbies");
};

ws.onmessage = (res) => {
    const response = JSON.parse(res.data);
    const data = response.data;

    switch (response.type) {
        case "lobbiesNames":
            showLobbiesNames(data);
            break;

        default: {
            break;
        }
    }
    console.log(response);
};
