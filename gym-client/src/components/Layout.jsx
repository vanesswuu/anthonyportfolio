import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';

const Layout = () => {

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-gray-300">
            <Navbar />

            <main className="px-0">
                {/* the outlet is where dashboard or plans will be injected */}
                <Outlet />
            </main>

        </div>

    )
}

export default Layout;