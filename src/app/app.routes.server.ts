import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'app',
    renderMode: RenderMode.Server
  },
  {
    path: 'app/devices',
    renderMode: RenderMode.Server
  },
  {
    path: 'app/devices/new',
    renderMode: RenderMode.Server
  },
  {
    path: 'app/devices/edit/**',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
