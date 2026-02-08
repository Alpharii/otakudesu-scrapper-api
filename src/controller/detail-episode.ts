import { load } from "cheerio"
import { fetchUtils } from "../utils/fetch-util.js"
import axios from "axios"

type Mirror = {
    quality: string
    provider: string
    token: string
    url?: string | null
}
type DownloadProvider = {
    provider: string
    url: string
}

type Download = {
    quality: string
    size?: string
    providers: DownloadProvider[]
}

const extractSlug = (url?: string | null) => {
    if (!url) return null

    return url
        .replace(/^https:\/\/otakudesu\.[a-zA-Z0-9-]+\//, '')
        .replace(/^episode\//, '')
        .replace(/\/$/, '')
}

export const detailEpisode = async (slug: string) => {
    const html = await fetchUtils(`/episode/${slug}`)
    const $ = load(html)
    console.log($.html())
    const title = $(".posttl").text().trim()

    const metadata = {
        author: $(".kategoz span").first().text().replace("Posted by", "").trim(),
        release: $(".kategoz span").eq(1).text().replace("Release on", "").trim()
    }

    //info
    const info: Record<string, any> = {}

    const thumbnail = $(".cukder").find("img").attr("src") ?? null
    info.thumbnail = thumbnail

    $(".infozingle p").each((_, el) => {

        const label = $(el).find("b").text().replace(":", "").trim()

        const fullText = $(el).text()
        const value = fullText.replace(label, "")
            .replace(":", "")
            .trim()

        if (label === "Genres") {
            const genres = $(el).find("a")
            .map((_, g) => $(g).text().trim())
            .get()
            
            info.genres = genres
        }
        else {
            info[label.toLowerCase().replace(/\s/g, "_")] = value
        }
    })


    const iframe = $("#pembed iframe").attr("src") ?? null

    let previousUrl: string | null = null
    let nextUrl: string | null = null
    let animeUrl: string | null = null

    $(".prevnext a").each((_, el) => {

        const text = $(el).text().toLowerCase()
        const href = $(el).attr("href")

        if (!href) return

        if (text.includes("see all")) {
            animeUrl = href
        }

        else if (text.includes("next")) {
            nextUrl = href
        }

        else if (text.includes("prev")) {
            previousUrl = href
        }
    })

    const navigation = {
        previous: previousUrl ? {
            url: previousUrl,
            slug: extractSlug(previousUrl)
        } : null,

        anime: animeUrl ? (() => {
            const url = animeUrl as string

            return {
                url,
                slug: url.split("/anime/")[1]?.replace("/", "")
            }
            })(
        ) : null,


        next: nextUrl ? {
            url: nextUrl,
            slug: extractSlug(nextUrl)
        } : null
    }

    const episodes:any[] = []

    $(".keyingpost li a").each((_, el) => {
        const link = $(el).attr("href")
        episodes.push({
            title: $(el).text().trim(),
            url: link,
            slug: extractSlug(link)
        })
    })

    const downloads: Download[] = []

    $(".download ul li").each((_, li) => {

        const providers: DownloadProvider[] = []

        $(li).find("a").each((_, a) => {

            providers.push({
                provider: $(a).text().trim(),
                url: $(a).attr("href") ?? ""
            })
        })

        downloads.push({
            quality: $(li).find("strong").text().trim(),
            size: $(li).find("i").text().trim(),
            providers
        })
    })

    const AJAX_URL = "https://otakudesu.best/wp-admin/admin-ajax.php"
    const mirrors: Mirror[] = []

    let nonceCache: string | null = null

    const referer =
        `https://otakudesu.best/episode/${slug}`

    const getNonce = async () => {

        if (nonceCache) return nonceCache

        const res = await axios.post(AJAX_URL, 
            new URLSearchParams({
                action: "aa1208d27f29ca340c92c66d1926f13f"
            })
        )

        const json = await res.data

        nonceCache = json.data
        return nonceCache
    }

    const resolveMirror = async (token: string) => {

        try {

            const payload = JSON.parse(
                Buffer.from(token, "base64").toString()
            )

            const nonce = await getNonce()

            const res = await axios.post(AJAX_URL, 
                new URLSearchParams({
                    ...payload,
                    nonce,
                    action:
                    "2a3505c93b0035d3f455df82bf976b84"
                })
            )

            const json = await res.data

            const iframeHtml =
                Buffer.from(json.data, "base64")
                .toString()

            const $$ = load(iframeHtml)

            return $$("iframe").attr("src") ?? null

        }
        catch {
            return null
        }
    }

    $(".mirrorstream ul").each((_, ul) => {

        $(ul).find("li a").each((_, a) => {

            const token = $(a).attr("data-content")
            if (!token) return

            let quality = ""

            try {

                const payload = JSON.parse(
                    Buffer.from(token, "base64").toString()
                )

                quality = payload.q ?? ""

            } catch {}

            mirrors.push({
                quality,
                provider: $(a).text().trim(),
                token
            })
        })
    })

    await Promise.all(
        mirrors.map(async (mirror) => {

            mirror.url =
                await resolveMirror(
                    mirror.token
                )

        })
    )

    const aliveMirrors =
        mirrors.filter(m => m.url)

    return {
        success: true,
        data: {
            title,
            metadata,
            info,
            iframe,
            navigation,
            episodes,
            mirrors: aliveMirrors,
            downloads
        }
    }
}
