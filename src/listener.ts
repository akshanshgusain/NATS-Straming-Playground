import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

console.clear();

// Also called client.
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "https://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listner connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  const subject = "ticket:created";
  const queueGroup = "listenerQueueGroup";

  // Options
  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe(subject, queueGroup, options);

  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

process.on("SIGINT", () => {
  stan.close();
});

process.on("SIGTERM", () => {
  stan.close();
});
