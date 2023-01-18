onload = function () {
    const id = document.cookie.split("=")[1];
    const btnCreateLobby = document.getElementById("btn-create-lobby");
    btnCreateLobby.onclick = () => {
        const lobbyName = document.getElementById("lobby-name").value;
        btnCreateLobby.onclick = () => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000/lobby/create", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(
                JSON.stringify({
                    lobbyName: lobbyName,
                    userId: id,
                }),
            );
        };
    };
};
