import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between   items-center sm:justify-around">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide ">
          PasteBook
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-around max-w-md ">
          <Link
            to="/"
            className="relative group text-lg"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/pastes"
            className="relative group text-lg"
          >
            My Pasts
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? (
            <span className="text-2xl">✖</span>
          ) : (
            <span className="text-2xl">☰</span>
          )}
        </button>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="flex flex-col mt-4 space-y-3 md:hidden">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-200 text-lg"
          >
            Home
          </Link>
          <Link
            to="/pastes"
            onClick={() => setIsOpen(false)}
            className="hover:text-gray-200 text-lg"
          >
            My Pasts
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
