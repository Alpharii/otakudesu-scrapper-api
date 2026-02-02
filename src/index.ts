import { app } from "./app";
import { homeRoutes } from "./routes/home";

app.get("/", () => {
  console.log('hitted')
  return "hello elysia"
})
app.use(homeRoutes)

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
