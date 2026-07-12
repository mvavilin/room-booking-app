import { Link } from 'react-router-dom';

interface NavigationProperties {
  onNavigate?: () => void;
}

export function Navigation({ onNavigate }: NavigationProperties): React.JSX.Element {
  return (
    <nav className="flex flex-col items-center gap-2 md:flex-row md:gap-6">
      <Link to="/" className="text-sm hover:underline" onClick={onNavigate}>
        Главная
      </Link>

      <Link to="/booking" className="text-sm hover:underline" onClick={onNavigate}>
        Бронирования
      </Link>
    </nav>
  );
}
