import nats from "node-nats-streaming";

console.clear();

// Also called client.
const stan = nats.connect("ticketing", "abc", {
  url: "https://localhost:4222",
});

stan.on("connect", () => {
  console.log("Publisher connected to NATS");

  let data = JSON.stringify({
    id: "as23",
    title: "concert",
    price: 35,
  });

  const subject = "ticket:created";

  // data is called a Message in NATS terminology

  stan.publish(subject, data, () => {
    console.log("Event Pusblished");
  });
});
