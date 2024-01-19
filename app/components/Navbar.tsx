import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/app/components/ModeToggle"

const Navbar = () => {
  return (
    <nav 
      className="w-full flex items-center justify-between max-w-7xl mx-auto p-5
      dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-600 
      bg-orange-800
      rounded-sm text-gray-100
      "
      >
      <Link href={"/"}>
         <div className="flex items-center justify-center">

          <Image src={"/logo4-1.png"} width={150} height={100} alt="logo" />
          <span className="text-gray-300 text-2xl text-bold">
            Blog - Demo nextjs 14 && Sanity
          </span>

         </div>
      
      </Link>
      
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <div className="text-xs">toggle mode</div>
      </div>
    </nav>
  )
}

export default Navbar