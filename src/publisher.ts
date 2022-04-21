import nats from "node-nats-streaming";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

// Also called client.
const stan = nats.connect("ticketing", "abc", {
  url: "https://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  // let data = JSON.stringify({
  //   id: "as23",
  //   title: "concert",
  //   price: 35,
  // });

  // const subject = "ticket:created";

  // // data is called a Message in NATS terminology

  // stan.publish(subject, data, () => {
  //   console.log("Event Pusblished");
  // });

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "Concert",
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }
});
