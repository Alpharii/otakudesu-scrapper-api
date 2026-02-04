import Elysia from "elysia";
import { home } from "../controller/home";
import { ongoing } from "../controller/ongoing";
import { complete } from "../controller/complete";
import { detailAnime } from "../controller/detail-anime";
import { detailEpisode } from "../controller/detail-episode";
import { search } from "../controller/search";

export const routes = new Elysia()
    .get("/", home)
    .get("/ongoing/:page", ({params: {page}}) => ongoing(page))
    .get("/complete/:page", ({params: {page}}) => complete(page))
    .get("/anime/:slug", ({params: {slug}}) => detailAnime(slug))
    .get("/episode/:slug", ({params: {slug}}) => detailEpisode(slug))
    .get("/anime", ({query : {q}}) => search(q))