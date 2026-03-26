import React from 'react'
import Link from 'next/link'
const header = () => {
    return (
        <header>

            <nav>
                <Link href="/" className='flex items-center gap-2'>
                    <img className='rounded-full w-16 h-16' src="/logo.png" alt="logo" />
                    <p>DEVTECH</p>
                </Link>
                <ul>

                    <li><a href="/">Home</a></li>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Create Event</a></li>

                </ul>
            </nav>
        </header>
    )
}

export default header