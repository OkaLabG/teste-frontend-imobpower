// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPWA({
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true
  },
  images: {
    domains: ['raw.githubusercontent.com']
  },
  swcMinify: true,

  pwa: {
    dest: 'public',
    disable: !isProd
  }
})
