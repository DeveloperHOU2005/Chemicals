import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

export default function CategoryItem({ category, onDelete }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-4 text-gray-700">{category.id}</td>
      <td className="py-3 px-4 text-gray-700 font-medium">{category.name}</td>
      <td className="py-3 px-4 text-gray-700">{category.productCount || 0}</td>
      <td className="py-3 px-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          category.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {category.active ? 'Hoạt động' : 'Vô hiệu'}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex justify-center space-x-2">
          <Link 
            to={`/admin/categories/edit/${category.id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
          </Link>
          <button 
            onClick={() => onDelete(category.id)} 
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}