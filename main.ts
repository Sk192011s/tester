import { serve } from "https://deno.land/std@0.203.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);

  // Homepage / index.html serve
  if (url.pathname === "/" || url.pathname === "/index.html") {
    try {
      const file = await Deno.readFile("./index.html");
      return new Response(file, { headers: { "content-type": "text/html" } });
    } catch {
      return new Response("index.html not found", { status: 404 });
    }
  }

  // Static assets serve (CSS / JS / images)
  if (url.pathname.startsWith("/assets/") || url.pathname.startsWith("/templates/")) {
    try {
      const file = await Deno.readFile("." + url.pathname);
      const ext = url.pathname.split(".").pop();
      const mime = ext === "js" ? "application/javascript"
                : ext === "css" ? "text/css"
                : ext === "html" ? "text/html"
                : "image/jpeg";
      return new Response(file, { headers: { "content-type": mime } });
    } catch {
      return new Response("File not found", { status: 404 });
    }
  }

  // Example API route (movies JSON)
  if (url.pathname === "/api/movies") {
    try {
      const data = await Deno.readTextFile("./movies.json");
      return new Response(data, { headers: { "content-type": "application/json" } });
    } catch {
      return new Response("movies.json not found", { status: 404 });
    }
  }

  return new Response("Not found", { status: 404 });
});
