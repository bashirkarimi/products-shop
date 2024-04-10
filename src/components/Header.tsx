import { Link } from 'react-router-dom';
import Logo from '../assets/svgs/logo.svg?react';

const Header = () => {
  return (
    <div className="py-6 text-3xl text-slate-700">
      <span className="w-10 h-10 inline-block mr-4">
        <Logo />
      </span>
      <Link to="/">Products </Link>
    </div>
  );
};

export default Header;
