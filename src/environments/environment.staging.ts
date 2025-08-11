export const environment = {
  production: false,
  api: {
    baseUrl: 'https://staging-api.snapbot.com/api', // URL da API em homologação
    endpoints: {
      auth: '/auth',
      devices: '/devices'
    }
  },
  app: {
    name: 'SnapBot - Device Management (Staging)',
    version: '1.0.0'
  }
};
