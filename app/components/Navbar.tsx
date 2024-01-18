import Link from "next/link"

const Navbar = () => {
  return (
    <nav 
      className="w-full flex items-center justify-between max-w-7xl mx-auto p-5
      bg-gradient-to-b from-gray-900 to-gray-600 
      "
      >
      <Link href={"/"}>LapinRagnar - Blog</Link>
      <div>user</div>
    </nav>
  )
}

export default Navbar