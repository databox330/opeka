import { defineConfig } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = __dirname
const pagesRoot = path.join(projectRoot, 'src', 'pages')

function expandIncludes(root, html, stack = new Set()) {
  return html.replace(/<!--\s*@opeka-include\s+([^>]+?)\s*-->/g, (_, rel) => {
    const abs = path.resolve(root, rel.trim())
    if (stack.has(abs)) throw new Error(`[opeka-layout] Circular include: ${rel}`)
    stack.add(abs)
    return expandIncludes(root, fs.readFileSync(abs, 'utf8'), stack)
  })
}

function opekaIncludesPlugin() {
  const root = projectRoot
  const watchRoot = path.join(root, 'src')
  return {
    name: 'opeka-includes',
    configureServer(server) {
      if (fs.existsSync(watchRoot)) server.watcher.add(watchRoot)
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!html.includes('@opeka-include')) return html
        return expandIncludes(root, html)
      },
    },
  }
}

export default defineConfig({
  root: pagesRoot,
  publicDir: false,
  plugins: [opekaIncludesPlugin()],
  build: {
    assetsInlineLimit: 0,
    outDir: path.join(projectRoot, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(pagesRoot, 'index.html'),
    },
  },
})
