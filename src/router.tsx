import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { Slide, ToastContainer } from 'react-toastify';
import Character from './components/character';
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
      <div className="flex flex-col justify-start items-center">
        <Outlet />
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition={Slide}
        toastClassName="flex! justify-center! w-[370px]! h-[80px]! text-sm"
      />
    </QueryProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Characters />,
});

const characterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/character/$id',
  component: () => <Character />,
});

const routeTree = rootRoute.addChildren([homeRoute, characterRoute]);

const router = createRouter({ routeTree });

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
