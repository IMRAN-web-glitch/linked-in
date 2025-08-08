import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
const Navbar = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-white/90 border-b border-blue-100 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-blue-700 font-extrabold text-2xl tracking-tight">
            <span className="text-blue-500">Mini</span>LinkedIn
          </Link>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link href="/" className="text-blue-700 hover:text-blue-500 font-medium transition">Home</Link>
            </li>
            <li>
              <Link href="/feed" className="text-blue-700 hover:text-blue-500 font-medium transition">Feed</Link>
            </li>
            {session && <li>
              <Link href={`profile/${session?.user?.name}`} className="text-blue-700 hover:text-blue-500 font-medium transition">Profile</Link>
            </li>}
            <li>{session ?
              <Link href={`profile/${session.user.name}`} as={`/profile/${session.user.name}`} className="text-blue-700 hover:text-blue-500 font-medium transition">
                {session.user.name}
              </Link>
              :
              // If not authenticated, show login link
              <Link href="/login" className="text-blue-700 hover:text-blue-500 font-medium transition">Login</Link>
            }
            </li>
            <li>{session ?
              <button onClick={() => signOut()} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">
                Logout
              </button>
              :
              // If not authenticated, show register link}
              <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition">Register</Link>
            }</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;