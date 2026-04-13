import heroBlob from '../assets/images/opeka/hero-blob.png?url'
import promoGlow from '../assets/images/opeka/promo-glow.png?url'

const root = document.documentElement
root.style.setProperty('--opeka-img-hero-blob', `url(${JSON.stringify(heroBlob)})`)
root.style.setProperty('--opeka-img-promo-glow', `url(${JSON.stringify(promoGlow)})`)
