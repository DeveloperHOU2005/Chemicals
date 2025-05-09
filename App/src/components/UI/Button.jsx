export default function Button({ children, onClick }) {
  return (
    <button
      className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-6 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  )
}