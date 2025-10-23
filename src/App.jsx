import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Browse from "./components/Browse";
import Watchlist from "./components/Watchlist";
import AppLayout from "./components/AppLayout.jsx";
import Error from "./components/Error.jsx";
import { useEffect, useState } from "react";
import { options } from "./constants/options.js";

// Error pages as separate components to avoid recreation
const DNSErrorPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-center px-4">
    <div className="bg-red-500/10 border border-red-500 rounded-2xl p-8 max-w-2xl">
      <div className="text-6xl mb-4">🌐</div>
      <h1 className="text-3xl font-bold text-red-500 mb-4">
        Connection Failed
      </h1>
      <p className="text-gray-300 text-lg mb-6">
        Unable to reach TMDB API. TMDB doesn't work well in India due to DNS restrictions.
      </p>
      <div className="bg-gray-800 rounded-lg p-4 text-left">
        <p className="text-white font-semibold mb-2">
          💡 Try these solutions:
        </p>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• <strong>Change your DNS to Google DNS</strong> (8.8.8.8 / 8.8.4.4)</li>
          <li>• <strong>Or use Cloudflare DNS</strong> (1.1.1.1 / 1.0.0.1)</li>
          <li>• Check your internet connection</li>
          <li>• Try using a different network</li>
        </ul>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
      >
        Retry Connection
      </button>
    </div>
  </div>
);

const APIErrorPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-center px-4">
    <div className="bg-yellow-500/10 border border-yellow-500 rounded-2xl p-8 max-w-2xl">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-3xl font-bold text-yellow-500 mb-4">
        API Error
      </h1>
      <p className="text-gray-300 text-lg mb-6">
        TMDB API returned an error. This might be due to an invalid API key or service issues.
      </p>
      <div className="bg-gray-800 rounded-lg p-4 text-left">
        <p className="text-white font-semibold mb-2">
          🔧 Possible causes:
        </p>
        <ul className="text-gray-300 text-sm space-y-2">
          <li>• Invalid or expired TMDB API key</li>
          <li>• TMDB service is temporarily down</li>
          <li>• Rate limit exceeded</li>
          <li>• API key permissions issue</li>
        </ul>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
      >
        Retry Connection
      </button>
    </div>
  </div>
);

function App() {
  const [status, setStatus] = useState(null);
  const [router, setRouter] = useState(null);

  useEffect(() => {
    const checkTMDB = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/configuration",
          options
        );

        if (res.ok) {
          setStatus("ok");
        } else {
          setStatus("api");
        }
      } catch (err) {
        console.error("TMDB handshake failed:", err);
        setStatus("dns");
      }
    };

    checkTMDB();
  }, []);

  // Create router only once when status is determined
  useEffect(() => {
    if (status === null) return;

    const appRouter = createBrowserRouter([
      status === "ok"
        ? {
            path: "/",
            element: <AppLayout />,
            errorElement: <Error />,
            children: [
              { 
                path: "/", 
                element: <Login /> 
              },
              { 
                path: "/browse", 
                element: <Browse /> 
              },
              { 
                path: "/watchlist", 
                element: <Watchlist /> 
              },
              { 
                path: "/error", 
                element: <Error /> 
              },
              { 
                path: "*", 
                element: <Error /> 
              },
            ],
          }
        : status === "dns"
        ? {
            path: "*",
            element: <DNSErrorPage />,
          }
        : {
            path: "*",
            element: <APIErrorPage />,
          },
    ]);

    setRouter(appRouter);
  }, [status]);

  // Show loading screen only initially
  if (status === null || router === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-cyan-500 mx-auto mb-4"></div>
          <h1 className="text-white text-xl font-semibold">
            Checking TMDB API...
          </h1>
          <p className="text-gray-400 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <Provider store={appStore}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;