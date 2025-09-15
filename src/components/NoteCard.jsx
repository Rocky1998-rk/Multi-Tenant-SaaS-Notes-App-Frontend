
const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className="border rounded p-4 bg-white shadow">
      <h2 className="text-lg font-semibold">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
      <div className="flex gap-3 mt-4">
        
        <button onClick={() => onEdit(note)}className="bg-yellow-500 text-white px-3 py-1 rounded cursor-pointer">Edit</button>

        <button onClick={() => onDelete(note._id)} className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
