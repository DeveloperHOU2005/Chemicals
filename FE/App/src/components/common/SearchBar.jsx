import { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function SearchBar({ placeholder = "Tìm kiếm hóa chất, công thức..." }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/find?content=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop search */}
      <form 
        onSubmit={handleSubmit}
        className="hidden md:flex w-full max-w-xl border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500"
      >
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2.5 pl-5 text-sm text-gray-700 bg-transparent border-0 focus:outline-none"
            placeholder={placeholder}
            id="desktopSearch"
            name="content"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-teal-600 rounded-r-lg hover:bg-teal-700 focus:outline-none"
        >
          <Search size={18} className="text-white" />
        </button>
      </form>

      {/* Mobile search */}
      <form
        onSubmit={handleSubmit}
        className="md:hidden flex w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-teal-500"
      >
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 pl-10 text-sm text-gray-700 bg-transparent border-0 focus:outline-none"
            placeholder="Tìm kiếm..."
            id="mobileSearch"
            name="content"
          />
        </div>
        <button
          type="submit"
          aria-label="Search"
          className="px-3 flex items-center justify-center text-white bg-teal-600 rounded-r-lg hover:bg-teal-700 focus:outline-none"
        >
          <Search size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}