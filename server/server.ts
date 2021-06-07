import { Application } from 'https://deno.land/x/abc@v1.3.1/mod.ts'

const app = new Application()

app
  .get('/hello', () => 'Hello world!')
  .static('/', 'static')
  .file('/', 'static/index.html')
  .start({ port: 8080 })
