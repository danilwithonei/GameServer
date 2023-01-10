import { Client } from "entities/client"
import { Room } from "entities/room"
import WebSocket from "ws"

export class ServerServices {
  private server: WebSocket.Server<WebSocket.WebSocket>
  clients: Client[] = []
  rooms: Room[] = []

  constructor(server: WebSocket.Server<WebSocket.WebSocket>) {
    this.server = server
  }

  getOnline(): number {
    return this.clients.length
  }
  getAllXYExept(ws: WebSocket): string {
    const allXY = []
    // исправить что бы цикл был по uuid clients у комнаты
    for (let index = 0; index < this.clients.length; index++) {
      const client = this.clients[index]
      if (client.ws !== ws && this.getOneByWs(ws).roomUuid == client.roomUuid)
        allXY.push(`${client.x} ${client.y}`)
    }
    return allXY.toString()
  }

  sendAll(msg: string) {
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) client.send(msg)
    })
  }
  sendAllExept(ws: WebSocket) {
    const allXY = this.getAllXYExept(ws)
    this.getOneByWs(ws).ws.send(allXY)
  }

  getOneByWs(ws: WebSocket): Client {
    return this.clients.filter((c) => c.ws === ws)[0]
  }
  getRoomsNames() {
    const roomNames = []
    this.rooms.forEach((room) => {
      roomNames.push(room.name)
    })
    return roomNames
  }
  getRoomByName(name: string): Room {
    return this.rooms.filter((r) => r.name === name)[0]
  }
}
