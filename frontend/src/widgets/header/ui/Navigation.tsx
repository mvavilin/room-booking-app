import { Link } from 'react-router-dom';

interface Properties {
  onNavigate?: () => void;
}

export function Navigation({ onNavigate }: Properties): React.JSX.Element {
  return (
    <nav className="flex md:flex-row md:items-center md:gap-6 flex-col items-center gap-2">
      <Link className="text-sm hover:underline" to="/" onClick={onNavigate}>
        Главная
      </Link>

      <Link className="text-sm hover:underline" to="/booking" onClick={onNavigate}>
        Бронирования
      </Link>
    </nav>
  );
}
