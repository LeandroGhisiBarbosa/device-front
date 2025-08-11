export const environment = {
  production: true,
  api: {
    baseUrl: 'https://api.snapbot.com/api', // URL da API em produção
    endpoints: {
      auth: '/auth',
      devices: '/devices'
    }
  },
  app: {
    name: 'SnapBot - Device Management',
    version: '1.0.0'
  }
};
