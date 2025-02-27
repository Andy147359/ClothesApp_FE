
function Tag({ tag, options = [], setCategory }) {
    return (
        <div className='w-full p-[22px]'>
            <div className=""><h1 className='font-bold uppercase'>#{tag}</h1></div>
            <div className="flex flex-wrap">
                {options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => setCategory(option)}
                        className='px-4 py-2 text-black border border-gray-500 bg-orange-500 mx-2 my-2 rounded'
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Tag;
