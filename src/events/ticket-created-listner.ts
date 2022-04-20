import { Listner } from "./base-listener";
import { Message } from "node-nats-streaming";

export class TicketCreatedListner extends Listner {
  subject = "ticket:created";
  queueGroupName = "payments-service";

  onMessage(data: any, msg: Message): void {
    console.log("Event data!", data);

    msg.ack();
  }
}
