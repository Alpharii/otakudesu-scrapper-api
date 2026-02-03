import Elysia from "elysia";
import { fetchUtils } from "../utils/fetch-util";
import { home } from "../controller/home";
import { ongoing } from "../controller/ongoing";
import { complete } from "../controller/complete";


export const routes = new Elysia()
    .get("/", home)
    .get("/ongoing/:page", ({params: {page}}) => ongoing(page))
    .get("/complete/:page", ({params: {page}}) => complete(page))