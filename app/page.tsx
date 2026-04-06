
export default function Home() {
  return (
    <div className="notranslate flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 dark:bg-background sm:items-start">
        <h1 className="text-6xl font-bold text-center text-gray-500">
          Welcome to APOD
        </h1>
        <div className="flex flex-col w-full items-center justify-center">
          <img
            src="/globe.svg"
            alt="Astronomy Picture of the Day"
            width={96}
            height={64}
            className="mt-8 rounded-lg shadow-lg"
          />
          <a href="/dashboard" className="mt-8 px-6 py-3 bg-blue-700 text-gray-300 rounded-lg hover:bg-blue-600 transition">
            Go
          </a>
        </div>
        <p className="mt-3 text-2xl text-center text-gray-500 ">
          Explore the Astronomy Picture of the Day (APOD) and discover the wonders of the universe.
        </p>
      </main>
    </div>
  );
}
