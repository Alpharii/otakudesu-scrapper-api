import Elysia from "elysia";
import { home } from "../controller/home.js";
import { ongoing } from "../controller/ongoing.js";
import { complete } from "../controller/complete.js";
import { detailAnime } from "../controller/detail-anime.js";
import { detailEpisode } from "../controller/detail-episode.js";
import { search } from "../controller/search.js";

export const routes = new Elysia()
    .get("/", home)
    .get("/ongoing/:page", ({params: {page}}) => ongoing(page))
    .get("/complete/:page", ({params: {page}}) => complete(page))
    .get("/anime/:slug", ({params: {slug}}) => detailAnime(slug))
    .get("/episode/:slug", ({params: {slug}}) => detailEpisode(slug))
    .get("/anime", ({query : {q}}) => search(q))