import { useNavigate } from 'react-router-dom';
import tazaCafeSF404 from '../assets/taza_cafe_sf_404.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">Página No Encontrada</h1>
      <div className="relative flex items-center justify-center mb-4">
        <span className="text-[8rem] md:text-[12rem] font-extrabold text-yellow-700/80 dark:text-yellow-400/80 select-none">4</span>
        <img
          src={tazaCafeSF404}
          alt="Taza de café"
          className="w-56 h-56 md:w-80 md:h-80 object-contain mx-2 drop-shadow-lg"
          style={{ zIndex: 1 }}
        />
        <span className="text-[8rem] md:text-[12rem] font-extrabold text-yellow-700/80 dark:text-yellow-400/80 select-none">4</span>
      </div>
      <p className="text-lg md:text-xl text-yellow-800 dark:text-yellow-300 mb-8 text-center max-w-xl">
        Ooops! Parece que el aroma de esta taza de café te distrajo del camino...
      </p>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-md justify-center">
        <button
          onClick={() => navigate('/')}
          className="bg-yellow-700 dark:bg-yellow-500 text-white font-bold py-2 px-6 rounded shadow hover:bg-yellow-800 dark:hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition"
        >
          Inicio
        </button>
        <button
          onClick={() => navigate(-1)}
          className="bg-white dark:bg-gray-800 border border-yellow-700 dark:border-yellow-500 text-yellow-700 dark:text-yellow-300 font-semibold py-2 px-6 rounded shadow hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition"
        >
          Volver
        </button>
        <button
          onClick={() => navigate('/products')}
          className="bg-white dark:bg-gray-800 border border-yellow-700 dark:border-yellow-500 text-yellow-700 dark:text-yellow-300 font-semibold py-2 px-6 rounded shadow hover:bg-yellow-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition"
        >
          Menú
        </button>
      </div>
    </div>
  );
};

export default NotFound; 