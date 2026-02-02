import { app } from "./app";

app.get("/", () => "Hello Elysia")

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
