/**
 * Footer nav accordion (mobile): `.accordionItem` gets `.is-open` when the row
 * trigger is clicked; CSS shows `.accordionContent` only when open.
 */
export function initFooterAccordion() {
  document.querySelectorAll('.accordionItem').forEach((item) => {
    const trigger = item.querySelector('.site-footer__bwn')
    if (!trigger) return

    trigger.addEventListener('click', (event) => {
      event.preventDefault()
      item.classList.toggle('is-open')
    })
  })
}