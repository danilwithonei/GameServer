function showLobbiesNames(names) {
    const parent = document.getElementById("lobbies");
    parent.replaceChildren();

    for (const name of names) {
        const child = document.createElement("div");
        child.textContent = name;
        parent.appendChild(child);
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
            }
        };
    };
    const btnRefreshLobbies = document.getElementById("btn-refresh-lobbies");
    btnRefreshLobbies.onclick = () => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/lobby/all", true);
        xhr.send();
        xhr.onload = () => {
            if (xhr.status != 200) {
                // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else {
                const roomNames = JSON.parse(xhr.response).roomNames;
                showLobbiesNames(roomNames);
            }
        };
    };
};
