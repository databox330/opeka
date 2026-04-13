import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function expandIncludes(root, html, stack = new Set()) {
  return html.replace(/<!--\s*@opeka-include\s+([^>]+?)\s*-->/g, (_, rel) => {
    const abs = path.resolve(root, rel.trim())
    if (stack.has(abs)) throw new Error(`[opeka-layout] Circular include: ${rel}`)
    stack.add(abs)
    return expandIncludes(root, fs.readFileSync(abs, 'utf8'), stack)
  })
}

function pageHtmlPath(root, pageId) {
  if (pageId === 'home') return path.join(root, 'src', 'pages', 'index.html')
  return path.join(root, 'src', 'pages', `${pageId}.html`)
}

function opekaLayoutPlugin() {
  const root = __dirname
  const watchRoot = path.join(root, 'src')
  return {
    name: 'opeka-layout',
    configureServer(server) {
      if (fs.existsSync(watchRoot)) server.watcher.add(watchRoot)
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes('@opeka-page-body')) return html

        const pageMatch = html.match(/data-opeka-page="([^"]+)"/)
        const pageId = pageMatch?.[1] ?? 'home'

        let out = expandIncludes(root, html)

        const pagePath = pageHtmlPath(root, pageId)
        if (!fs.existsSync(pagePath)) {
          throw new Error(`[opeka-layout] Missing: ${pagePath}`)
        }
        const pageHtml = expandIncludes(root, fs.readFileSync(pagePath, 'utf8'))
        return out.replace(/<!--\s*@opeka-page-body\s*-->/, pageHtml)
      },
    },
  }
}

export default defineConfig({
  plugins: [opekaLayoutPlugin()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
})
