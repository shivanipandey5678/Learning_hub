import { assets } from "../../src/assets/assets";

const SearchBar = () => {
  return (
    <div className='flex flex-wrap items-center gap-2 border border-gray-400 lg:w-1/3 w-full mx-auto my-10 p-2 md:w-1/2'>
      <div className='flex items-center gap-2 flex-grow'>
        <img src={assets.search_icon} alt="search_icon" className='sm:block hidden' />
        <input
          type="text"
          placeholder='Search for courses'
          className='border-none outline-none pl-1 flex-grow min-w-0'
        />
      </div>

      <button className='text-white bg-blue-600 px-6 py-2 cursor-pointer rounded text-sm sm:text-base whitespace-nowrap'>
        Search
      </button>
    </div>
  )
}
export default SearchBar;
