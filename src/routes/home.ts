import Elysia from "elysia";
import { homeController } from "../controller/homeController";
import { fetchUtils } from "../utils/fetch-util";


export const homeRoutes = new Elysia({prefix: "/home"})
    .get("/", homeController)