import { useState, ChangeEvent } from 'react';
import SearchSvg from '../assets/svgs/search.svg?react';

interface searchProps {
  onSearchTerm: (serachTerm: string) => null;
}

const Search = ({ onSearchTerm }: searchProps) => {
  const [serachTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value;
    setSearchTerm(inputValue);
    !inputValue && onSearchTerm('');
  };

  return (
    <div className="border rounded border-slate-500 flex relative ml-auto">
      <input
        className="border-0 rounded w-full px-3 py-2 self-end text-slate-800 placeholder-slate-400 focus:border-red-900 focus:outline-none focus-visible:border-slate-800 "
        placeholder="Search on products"
        onChange={(event) => handleInputChange(event)}
      />
      <button
        className="w-12 bg-fuchsia-800 text-slate-100 flex items-center justify-center"
        onClick={() => onSearchTerm(serachTerm)}
      >
        <span className="w-6 h-6 inline-block">{<SearchSvg />}</span>
      </button>
    </div>
  );
};

export default Search;
