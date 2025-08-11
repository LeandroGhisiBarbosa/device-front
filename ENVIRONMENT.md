# Environment Configuration Guide

Este projeto utiliza diferentes arquivos de environment para gerenciar configurações específicas de cada ambiente (desenvolvimento, homologação e produção).

## Estrutura dos Environments

### 🛠️ Desenvolvimento (`environment.ts`)
- **URL da API**: `http://127.0.0.1:8000/api`
- **Uso**: Ambiente local de desenvolvimento
- **Características**: Debug habilitado, source maps disponíveis

### 🧪 Homologação (`environment.staging.ts`)
- **URL da API**: `https://staging-api.snapbot.com/api`
- **Uso**: Ambiente de testes e validação
- **Características**: Similiar à produção, mas com dados de teste

### 🚀 Produção (`environment.prod.ts`)
- **URL da API**: `https://api.snapbot.com/api`
- **Uso**: Ambiente de produção
- **Características**: Otimizado, sem debug, compactado

## Como usar

### Comandos para Development
```bash
npm start                    # Usa environment.ts (padrão)
ng serve                     # Equivalente ao comando acima
```

### Comandos para Staging
```bash
npm run start:staging        # Serve com environment.staging.ts
ng serve --configuration=staging
```

### Comandos para Production
```bash
npm run start:prod           # Serve com environment.prod.ts (para testes)
ng serve --configuration=production
```

### Builds
```bash
npm run build               # Build desenvolvimento
npm run build:staging       # Build para homologação
npm run build:prod          # Build para produção
```

## ConfigService

O `ConfigService` centraliza o acesso às configurações:

```typescript
import { ConfigService } from './services/config.service';

// Injetar no constructor
constructor(private configService: ConfigService) {}

// Usar nas requisições
this.http.get(`${this.configService.devicesApiUrl}`)
this.http.post(`${this.configService.authApiUrl}/login`, data)
```

### Métodos disponíveis:
- `apiBaseUrl`: URL base da API
- `authApiUrl`: URL completa para endpoints de autenticação
- `devicesApiUrl`: URL completa para endpoints de dispositivos
- `appName`: Nome da aplicação
- `appVersion`: Versão da aplicação
- `isProduction`: Boolean indicando se está em produção
- `getApiUrl(endpoint)`: Constrói URL customizada

## Configuração de Deploy

### Staging
```bash
npm run build:staging
# Deploy para servidor de homologação
```

### Production
```bash
npm run build:prod
# Deploy para servidor de produção
```

## Variáveis importantes

Certifique-se de atualizar as URLs nos arquivos de environment antes do deploy:

1. **environment.staging.ts**: Altere `baseUrl` para a URL real do servidor de staging
2. **environment.prod.ts**: Altere `baseUrl` para a URL real da API de produção

## Troubleshooting

### Problema: API não encontrada
- Verifique se a URL no environment está correta
- Confirme se o servidor da API está rodando
- Teste a URL manualmente no browser/Postman

### Problema: CORS
- Configure CORS no servidor da API
- Adicione domínios permitidos no backend

### Problema: Environment não está sendo aplicado
- Verifique se está usando o comando correto
- Confirme se o `angular.json` tem as configurações corretas
- Limpe cache com `ng build --delete-output-path`
