import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routes from '~react-pages'; // importado automaticamente pelo vite-plugin-pages

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
