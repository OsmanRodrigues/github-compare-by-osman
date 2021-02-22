const path = require('path')
module.exports = {
  webpack: {
    alias: {
      '@adapters': path.resolve(__dirname, 'src/adapters/'),
      '@app': path.resolve(__dirname, 'src/app/'),
      '@assets': path.resolve(__dirname, 'src/assets/'),
      '@data': path.resolve(__dirname, 'src/data/'),
      '@entities': path.resolve(__dirname, 'src/entities/'),
      '@shared': path.resolve(__dirname, 'src/shared/'),
      '@tools': path.resolve(__dirname, 'src/tools/'),
      '@use-cases': path.resolve(__dirname, 'src/use-cases/')
    }
  }
}
