const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      <p className="mt-4 text-lg text-gray-300">Loading...</p>
    </div>
  )
}

export default Loader