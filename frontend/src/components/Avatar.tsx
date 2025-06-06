const Avatar = ({name}: {name: string})=> {
    const firstLetter = name?.charAt(0).toUpperCase()
    return (
        <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-500">
            <span className="text-xs text-black dark:text-gray-100">{firstLetter}</span>
        </div>
    )
}
export default Avatar;