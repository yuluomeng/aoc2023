import express from "express"

function main() {
    const app = express()
    const port = 3000

    app.get("/", (req: express.Request, resp: express.Response) => {
        resp.json({ body: "AOC 2023 server" })
    })

    const server = app.listen(port, () => {
        console.log(`[server]: Server is listening on port ${port}`)
    })

    process.on("SIGTERM", () => {
        server.close(() => {
            console.log("[server]: Server is shutting down.")
        })
    })
}

main()
