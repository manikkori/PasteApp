import { Calendar, Copy, Eye, PencilLine, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    // toast.success("");
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-y-6">
        {/* Search */}
        <div className="w-full flex gap-3 px-4 py-2 rounded-xl border border-gray-300 shadow-sm bg-white">
          <input
            type="search"
            placeholder="Search paste..."
            className="focus:outline-none w-full bg-transparent text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* All Pastes */}
        <div className="flex flex-col">
          <h2 className="px-2 text-2xl font-bold border-b border-gray-200 pb-3">
            My Pastes
          </h2>

          <div className="w-full pt-4 flex flex-col gap-y-5">
            {filteredPastes.length > 0 ? (
              filteredPastes.map((paste) => (
                <div
                  key={paste?._id}
                  className="border border-gray-200 w-full flex flex-col sm:flex-row justify-between gap-4 p-5 rounded-xl bg-white shadow-md hover:shadow-lg transition"
                >
                  {/* Title + Content */}
                  <div className="sm:w-1/2 flex flex-col gap-2">
                    <p className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {paste?.title}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {paste?.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-start sm:items-end justify-between gap-3">
                    <div className="flex gap-2 flex-wrap">
                      {/* Edit */}
                      <a
                        href={`/?pasteId=${paste?._id}`}
                        className="p-2 rounded-lg bg-gray-50 border border-gray-300 hover:border-blue-500 group"
                      >
                        <PencilLine
                          className="text-gray-600 group-hover:text-blue-500"
                          size={20}
                        />
                      </a>

                      {/* Delete */}
                      <button
                        className="p-2 rounded-lg bg-gray-50 border border-gray-300 hover:border-red-500 group"
                        onClick={() => handleDelete(paste?._id)}
                      >
                        <Trash2
                          className="text-gray-600 group-hover:text-red-500"
                          size={20}
                        />
                      </button>

                      {/* View */}
                      <a
                        href={`/pastes/${paste?._id}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-gray-50 border border-gray-300 hover:border-orange-500 group"
                      >
                        <Eye
                          className="text-gray-600 group-hover:text-orange-500"
                          size={20}
                        />
                      </a>

                      {/* Copy */}
                      <button
                        className="p-2 rounded-lg bg-gray-50 border border-gray-300 hover:border-green-500 group"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-gray-600 group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={18} />
                      {FormatDate(paste?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-lg text-center text-gray-500">
                No Pastes Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
