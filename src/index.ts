import { app } from "./app";
import { routes } from "./routes/routes";

app.use(routes)

app.listen(3000);

// debug
// app.routes.forEach(r => console.log(r.path));

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
