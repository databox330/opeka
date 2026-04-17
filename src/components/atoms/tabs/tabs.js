export function initTabs(root = document) {
  root.querySelectorAll('.tabs').forEach(tabs => {
    tabs.addEventListener('click', e => {
      const clicked = e.target.closest('.tab-button span[class]')
      if (!clicked) return

      // Derive the type from the current class: tab-button--{type}--{status}
      tabs.querySelectorAll('.tab-button span[class]').forEach(btn => {
        const type = btn.className.replace(/tab-button--(\w[\w-]*)--[\w-]+/, '$1')
        btn.className = `tab-button--${type}--default`
      })

      const type = clicked.className.replace(/tab-button--(\w[\w-]*)--[\w-]+/, '$1')
      clicked.className = `tab-button--${type}--active`
    })
  })
}
