import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import mime from "mime-types";
import process from "node:process";

const base_dir = import.meta.dirname;
if (base_dir === undefined) throw new Error("dirname is undefined");

process.on("uncaughtException", console.log);
process.on("unhandledRejection", console.log);

const server = http.createServer((req, res) => {
    if (req.method !== "GET" ||
        (req.headers["host"] !== "site.argv.nl" &&
            req.headers["host"] !== "jsite.argv.nl" &&
            req.headers["host"] !== "argv.nl" &&
            req.headers["host"] !== "www.argv.nl")
    ) { res.writeHead(404); res.end(); return; }

    if (req.url == undefined) req.url = "/";
    if (req.url == "/") req.url = "/index.html";

    const req_url = new URL(req.url, "http://localhost");
    const req_path = path.join(base_dir, req_url.pathname);
    const relative_path = path.relative(base_dir, req_path);
    if (relative_path.startsWith("..")) { res.writeHead(404); res.end(); return; }

    if (!fs.existsSync(req_path) ||
        !(fs.statSync(req_path).isFile())) { res.writeHead(404); res.end(); return; }

    if (req.url == "/index.html") {
        let html = fs.readFileSync(req_path, "utf-8");

        // inline css
        html = html.replace(/<link(?:(?:.*rel="stylesheet".*href="([^"]+?)".*)|(?:.*href="([^"]+?)".*rel="stylesheet".*))>/g, (_link_tag, filename) => {
            return `<style>\n${fs.readFileSync(path.join(base_dir, filename), "utf-8")}\n</style>`;
        });

        // inline js
        html = html.replace(/<script (?:.*src="([^"]+?)".*?)><\/script>/g, (_script_tag, filename) => {
            return `<script>\n${fs.readFileSync(path.join(base_dir, filename), "utf-8")}\n</script>`;
        });

        // inline profile picture
        html = html.replace(`src="images/FurriousFox.webp"`, `src="data:image/webp;base64,${fs.readFileSync(path.join(base_dir, "images/FurriousFox.webp"), "base64")}"`);

        res.writeHead(200, "OK", {
            "content-type": `${mime.lookup(req_path) || 'application/octet-stream'}`,
        });
        res.end(html);

        return;
    } else {
        res.writeHead(200, "OK", {
            "content-type": `${mime.lookup(req_path) || 'application/octet-stream'}`,
        });
        fs.createReadStream(req_path).pipe(res);
        return;
    }

});
server.listen(5113, "127.0.0.1");