import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/uno-variations/',
  title: 'uno-variations',
  description: 'A first-class variant API for UnoCSS.',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Setup', link: '/setup' },
      { text: 'API', link: '/api' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Overview', link: '/' },
          { text: 'Setup', link: '/setup' },
          { text: 'Development', link: '/development' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API', link: '/api' },
          { text: 'Release', link: '/release' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/chatondearu/uno-variations' },
    ],
  },
})
