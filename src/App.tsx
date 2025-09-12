import QueryProvider from './providers/query-provider';

function App() {
  return (
    <QueryProvider>
      <div className="w-screen h-screen bg-black flex flex-col justify-start items-center text-white">
        <span className="text-2xl font-semibold py-8">Rick and Morty API</span>
      </div>
    </QueryProvider>
  );
}

export default App;
