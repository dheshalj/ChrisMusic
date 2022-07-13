const bUrls = [
  'https://154.82.111.45.nip.io',
  'https://154.82.111.41.sslip.io',
  'https://154.82.111.42.sslip.io',
  'https://154.82.111.111.sslip.io',
  'https://154.82.111.112.sslip.io',
  'https://154.82.111.113.sslip.io',
  'https://154.82.111.116.sslip.io',
  'https://154.82.111.99.sslip.io',
  'https://154.82.111.77.sslip.io',
  'https://66.90.84.66.sslip.io',
]

function baseUrl() { return bUrls[Math.floor(Math.random()*bUrls.length)] }

module.exports = {
  bUrls,
  baseUrl
}