import Vue from 'vue'
import NuxtLoading from './components/nuxt-loading.vue'


import _6f6c098b from '../layouts/default.vue'

const layouts = { "_default": _6f6c098b }



export default {
  head: {"titleTemplate":"Nuxt HN | %s","meta":[{"property":"og:image","content":"https:\u002F\u002Fuser-images.githubusercontent.com\u002F904724\u002F26879447-689b56a8-4b91-11e7-968f-5eea1d6c71b4.png"},{"property":"twitter:card","content":"summary_large_image"},{"property":"twitter:site","content":"@nuxt_js"},{"hid":"charset","charset":"utf-8"},{"hid":"viewport","name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"mobile-web-app-capable","name":"mobile-web-app-capable","content":"yes"},{"hid":"apple-mobile-web-app-title","name":"apple-mobile-web-app-title","content":"Nuxt Hacker News"},{"hid":"author","name":"author","content":"Denlly"},{"hid":"description","name":"description","content":"HackerNews clone built with Nuxt.js"},{"hid":"theme-color","name":"theme-color","content":"#188269"},{"hid":"og:type","name":"og:type","property":"og:type","content":"website"},{"hid":"og:title","name":"og:title","property":"og:title","content":"Nuxt Hacker News"},{"hid":"og:description","name":"og:description","property":"og:description","content":"HackerNews clone built with Nuxt.js"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"manifest","href":"\u002F_nuxt\u002Fmanifest.52935ccf.json"},{"rel":"shortcut icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_64.9mgd2ZDMcQu.png"},{"rel":"apple-touch-icon","href":"\u002F_nuxt\u002Ficons\u002Ficon_512.9mgd2ZDMcQu.png","sizes":"512x512"}],"style":[],"script":[],"title":"Nuxt Hacker News","htmlAttrs":{"lang":"en"}},
  render(h, props) {
    const loadingEl = h('nuxt-loading', { ref: 'loading' })
    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      }
    }, [ templateEl ])

    return h('div',{
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,
      transitionEl
    ])
  },
  data: () => ({
    layout: null,
    layoutName: ''
  }),
  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (typeof window !== 'undefined') {
      window.$nuxt = this
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
  },
  
  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },
  
  methods: {
    
    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) this.$loading.fail()
        if (this.$loading.finish) this.$loading.finish()
      }
    },
    
    
    setLayout(layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout(layout) {
      if (!layout || !layouts['_' + layout]) layout = 'default'
      return Promise.resolve(layouts['_' + layout])
    }
    
  },
  components: {
    NuxtLoading
  }
}
