import { Link } from "react-router-dom";
import LogoBlack from "../assets/LogoB.png";
const AppBar = ({authorName}:{authorName:string}) => {
    const firstLetter = authorName?.charAt(0).toUpperCase()
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center ">
                    <Link to="/" >
                    <img className="mt-2 object-contain h-7 width-24" src={LogoBlack} alt="" />
                    </Link>
                </div>

                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search"
                            className="block w-full pl-10 pr-3 py-2 bg-gray-50 border-0 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-700 focus:bg-white text-sm"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <Link to='/publish'>
                    <button className="flex items-center text-gray-600 hover:text-black text-sm">
                       <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg>

                       <p className="text-base">Write</p> 
                    </button>
                    </Link>
                    <button className="text-gray-600 hover:text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
</svg>

                    </button>
                    <div className="relative">
                        <button className="w-9 h-9 rounded-full overflow-hidden">
  <div className="relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-black text-white dark:bg-white dark:text-black rounded-full">
    <span className="text-lg font-medium">
      {firstLetter}
    </span>
  </div>
</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppBar;