import { Application } from "https://deno.land/x/abc@v1.0.0-rc10/mod.ts";

const app = new Application();

app
  .get("/hello", (c) => "Hello world!")
  .static("/", "static")
  .file("/", "static/index.html")
  .start({ port: 8080 });
