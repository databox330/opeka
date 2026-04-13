/**
 * @param {ParentNode} [root]
 */
export function initMainBanner(root = document) {
  root.querySelectorAll('[data-main-banner]').forEach((section) => {
    const pager = section.querySelector('[data-pager]')
    if (!(pager instanceof HTMLElement)) return

    const dots = pager.querySelectorAll('.pager__dot')
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        dots.forEach((d) => {
          d.classList.remove('pager__dot--active')
          d.setAttribute('aria-selected', 'false')
        })
        dot.classList.add('pager__dot--active')
        dot.setAttribute('aria-selected', 'true')
      })
    })
  })
}
