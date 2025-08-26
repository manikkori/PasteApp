import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full h-full py-10 max-w-5xl mx-auto px-4">
      <div className="flex flex-col gap-y-6">
        {/* Input + Buttons */}
        <div className="w-full flex gap-3 justify-between items-center">
          <input
            type="text"
            placeholder="Enter a Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`flex-1 text-black border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm`}
          />
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:opacity-90 transition"
            onClick={createPaste}
          >
            {pasteId ? "Update" : "Create"}
          </button>
          {pasteId && (
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-xl shadow-md transition"
              onClick={resetPaste}
              title="New Paste"
            >
              <PlusCircle size={22} />
            </button>
          )}
        </div>

        {/* Editor Box */}
        <div className="w-full rounded-xl border border-gray-300 bg-white shadow-lg overflow-hidden">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50">
            {/* Traffic Lights */}
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>

            {/* Copy Button */}
            <button
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", { position: "top-right" });
              }}
            >
              <Copy size={18} />
              <span className="hidden sm:inline text-sm font-medium">Copy</span>
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here..."
            className="w-full p-4 resize-none focus:outline-none text-gray-800"
            style={{ caretColor: "#2563eb" }}
            rows={18}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
