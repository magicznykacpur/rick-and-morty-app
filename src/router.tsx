import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import Characters from './components/characters/characters';
import QueryProvider from './providers/query-provider';

const rootRoute = createRootRoute({
  component: () => (
    <QueryProvider>
      <div className="flex flex-col justify-start items-center">
        <span className="text-2xl font-semibold py-8">
          Rick and Morty Characters
        </span>
      </div>
      <Outlet />
    </QueryProvider>
  ),
});

const home = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div className="flex flex-col justify-start items-center">
      <Characters />
    </div>
  ),
});

const routeTree = rootRoute.addChildren([home]);

const router = createRouter({ routeTree });

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
