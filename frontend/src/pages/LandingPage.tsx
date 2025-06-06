import LogoBlack from '../assets/LogoB.png'

import { Link } from 'react-router-dom';
const LandingPage = () => {
    return (
        <>
            <div className="bg-black text-white h-screen overflow-hidden flex flex-col">
            
                <div className="px-4 py-4">
                    <img
                        className="w-28 h-16"
                        src={LogoBlack}
                        alt="Logo"
                    />
                </div>

                <section className="flex-grow flex items-center bg-black">
                    <div className="px-4 mx-auto max-w-7xl w-full sm:px-6 lg:px-8">
                        <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2">
                            <div>
                                <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">A social media for learners</p>
                                <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl xl:text-6xl">Where Curiosity Meets Community.</h1>
                                <p className="mt-4 text-sm sm:text-lg text-gray-300">Learn. Share. Grow — Together.</p>

                                <Link
                                    to="/signup"
                                    className="inline-flex items-center px-5 pl-8 py-3 mt-6 font-semibold text-black bg-white rounded-full hover:bg-gray-200 transition"
                                >
                                    Join
                                    <svg
                                        className="w-5 h-5 ml-4 -mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M13 9l3 3m0 0l-3 3m3-3H8"
                                        />
                                    </svg>
                                </Link>

                                <p className="mt-4 text-gray-400 text-sm">
                                    Already joined us? <Link to='/signin' className="text-white underline hover:text-gray-300">Log in</Link>
                                </p>
                            </div>

                            <div className="hidden lg:block">
                                <img
                                    className="w-full grayscale object-contain max-h-[70vh]"
                                    src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/1/hero-img.png"
                                    alt="Hero"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default LandingPage;
