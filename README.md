# Snapbot - Sistema de Gestão de Dispositivos

Este é um sistema de gestão de dispositivos desenvolvido em Angular que permite aos usuários gerenciar dispositivos com funcionalidades de autenticação, listagem, criação, edição e controle de status de uso.

## 🚀 Funcionalidades

### Autenticação
- **Login**: Sistema de autenticação com email e senha
- **Registro**: Criação de novos usuários
- **Proteção de rotas**: Guard de autenticação protegendo rotas privadas
- **Logout**: Funcionalidade completa de logout

### Gestão de Dispositivos
- **Listagem com paginação**: Visualização de dispositivos com paginação configurável
- **Filtros combináveis**: 
  - Filtro por localização
  - Filtro por status (em uso/disponível)
  - Filtro por período de compra (data inicial e final)
- **Persistência de filtros**: Filtros salvos no localStorage
- **Marcar como em uso**: Botão para alternar o status do dispositivo
- **CRUD completo**: Criar, visualizar, editar e excluir dispositivos

### UX/UI
- **Material Design**: Interface moderna usando Angular Material
- **Estados de loading**: Indicadores visuais durante operações
- **Notificações**: Mensagens de sucesso e erro usando snackbar
- **Responsivo**: Interface adaptável para diferentes tamanhos de tela

## 🛠️ Tecnologias Utilizadas

- **Angular 19**: Framework principal
- **Angular Material**: Componentes de UI
- **TypeScript**: Linguagem de programação
- **RxJS**: Programação reativa
- **Angular Forms**: Formulários reativos com validação
- **Angular Router**: Roteamento e navegação
- **HttpClient**: Comunicação com API
- **Jasmine/Karma**: Testes unitários

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Angular CLI (`npm install -g @angular/cli`)

## 🚀 Como executar o projeto

### 1. Clonar e instalar dependências
```bash
git clone <url-do-repositorio>
cd device-front
npm install
```

### 2. Configurar API
Certifique-se de que a API Laravel esteja rodando em `http://127.0.0.1:8000/`

### 3. Executar em desenvolvimento
```bash
npm start
# ou
ng serve
```

O aplicativo estará disponível em `http://localhost:4200/`

### 4. Executar testes
```bash
npm test
# ou
ng test
```

### 5. Build para produção
```bash
npm run build
# ou
ng build
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── components/           # Componentes da aplicação
│   │   ├── auth/            # Componentes de autenticação
│   │   │   ├── login/       # Página de login
│   │   │   └── register/    # Página de registro
│   │   ├── devices/         # Componentes de dispositivos
│   │   │   ├── device-list/ # Listagem de dispositivos
│   │   │   └── device-form/ # Formulário de dispositivos
│   │   └── layout/          # Componentes de layout
│   │       └── main-layout/ # Layout principal
│   ├── services/            # Serviços
│   │   ├── auth.service.ts     # Serviço de autenticação
│   │   ├── device.service.ts   # Serviço de dispositivos
│   │   └── notification.service.ts # Serviço de notificações
│   ├── models/              # Interfaces e tipos
│   │   ├── user.model.ts       # Modelos de usuário
│   │   └── device.model.ts     # Modelos de dispositivo
│   ├── guards/              # Guards de rota
│   │   └── auth.guard.ts       # Guard de autenticação
│   ├── interceptors/        # Interceptors HTTP
│   │   └── auth.interceptor.ts # Interceptor de autenticação
│   └── app.routes.ts        # Configuração de rotas
├── styles.scss              # Estilos globais
└── index.html              # Página principal
```

## 🔧 Funcionalidades Implementadas

### ✅ Requisitos Atendidos

#### Componentes
- [x] **DeviceListComponent**: Listagem com paginação, filtros e botão "Marcar como em uso"
- [x] **DeviceFormComponent**: Formulário reativo para criação e edição

#### Requisitos Técnicos
- [x] **Angular Material**: Layout e componentes implementados
- [x] **DeviceService**: Serviço para consumir a API
- [x] **Reactive Forms**: Com validação completa
- [x] **Estados de loading**: Implementados em todos os componentes
- [x] **Notificações**: Mensagens de sucesso e erro
- [x] **Filtros combináveis**: Localização, status e período da compra
- [x] **localStorage**: Persistência dos filtros
- [x] **Guard de autenticação**: Proteção de rotas
- [x] **Testes unitários**: Para componentes e serviços

## 🔄 Integração com API

### Endpoints utilizados:

#### Autenticação
- `POST /api/register` - Registro de usuário
- `POST /api/login` - Login do usuário

#### Dispositivos
- `GET /api/devices` - Listagem com filtros e paginação
- `GET /api/devices/{id}` - Buscar dispositivo específico
- `POST /api/devices` - Criar novo dispositivo
- `PUT /api/devices/{id}` - Atualizar dispositivo
- `DELETE /api/devices/{id}` - Excluir dispositivo
- `PATCH /api/devices/{id}/use` - Alternar status de uso

## 🧪 Testes

O projeto inclui testes unitários para:
- Serviços (AuthService, DeviceService)
- Componentes principais (LoginComponent)
- Guards e interceptors

Execute os testes com:
```bash
npm test
```

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🎨 Tema e Estilização

- Utiliza o tema Azure/Blue do Angular Material
- Estilos customizados para notificações
- Gradientes e animações suaves
- Ícones do Material Icons

## 🔒 Segurança

- Tokens JWT armazenados no localStorage
- Interceptor automático para adicionar token nas requisições
- Guard de autenticação protegendo rotas privadas
- Validações no frontend e backend

## 📝 Melhorias Futuras

- Implementar refresh token
- Adicionar mais filtros avançados
- Implementar exportação de dados
- Adicionar gráficos e dashboards
- Implementar notificações push

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
