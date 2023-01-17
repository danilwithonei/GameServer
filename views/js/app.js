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

onload = function () {
    const id = document.cookie.split("=")[1];
    send(`setClient_${id}`);

    // ws.send(`setClient_${id}`);
    send(`getClients_${id}`);
    console.log(id);
};

function showClientsNames(names) {
    const parent = document.getElementById("clients");
    parent.replaceChildren();

    for (const name of names) {
        const child = document.createElement("div");
        child.textContent = name;
        parent.appendChild(child);
    }
}

ws.onmessage = (res) => {
    const response = JSON.parse(res.data);
    const data = response.data;

    switch (response.type) {
        case "clientsNames":
            showClientsNames(data);
            break;

        default: {
            break;
        }
    }
    console.log(response);
};
