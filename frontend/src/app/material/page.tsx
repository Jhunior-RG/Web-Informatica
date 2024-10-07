import Image, {  type StaticImageData } from "next/image"; 
import { ArrowForward, Search } from "@mui/icons-material";
import Link from "next/link";
import introduccionImg from "../../public/introduccion.png";
import algebraImg from "../../public/algebra.png";
import calculoImg from "../../public/calculo.png";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center py-6 space-y-10 px-4 lg:px-8 bg-gray-900">
      {/* Título */}
      <h1 className="font-extrabold text-4xl text-white tracking-tight mb-4 text-center">Materiales de Estudio</h1>

      {/* Barra de búsqueda */}
      <div className="flex justify-center items-center w-full max-w-xl rounded-full border-2 border-indigo-800 bg-gray-800 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
        <input
          type="search"
          placeholder="Busca apuntes, programación, ejercicios..."
          className="w-full px-5 py-3 bg-transparent text-gray-200 placeholder-gray-400 text-sm focus:outline-none"
        />
        <button className="bg-indigo-800 p-3 items-center justify-center">
          <Search className="text-white" />
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-full transition-colors hover:bg-indigo-700 shadow-lg">
          Programación
        </button>
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-full transition-colors hover:bg-indigo-700 shadow-lg">
          Matemáticas
        </button>
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-full transition-colors hover:bg-indigo-700 shadow-lg">
          Redes
        </button>
        <button className="px-5 py-2 bg-gray-800 text-gray-300 border border-indigo-600 rounded-full transition-all hover:bg-indigo-600 hover:text-white shadow-lg">
          Popular
        </button>
      </div>

      {/* Materiales */}
      <h2 className="font-bold text-3xl text-gray-200 text-center">Nuestros Cursos</h2>
      <p className="text-gray-400 text-center mb-8">Selecciona un curso para acceder a los materiales relacionados</p>

      {/* Grid de materiales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <Material
          title="Introducción a la Programación"
          description="Accede al material necesario para aprender a programar desde cero."
          srcImage={introduccionImg}
          link="/material/introduccion"
          isPopular={true}
        />
        <Material
          title="Álgebra I"
          description="Encuentra material para resolver ejercicios de álgebra de manera efectiva."
          srcImage={algebraImg}
          link="/material/algebra"
          isPopular={false}
        />
        <Material
          title="Cálculo I"
          description="Recursos esenciales para aprender y practicar ejercicios de cálculo."
          srcImage={calculoImg}
          link="/material/calculo"
          isPopular={false}
        />
      </div>
    </div>
  );
};

interface MaterialProps {
  title: string;
  description: string;
  srcImage: StaticImageData | string; 
  link: string;
  isPopular: boolean;
}

const Material: React.FC<MaterialProps> = ({ title, description, srcImage, link, isPopular }) => {
  return (
    <div className="flex bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
      {/* Imagen del curso */}
      <div className="relative w-1/3 h-full">
        <Image
          alt={title}
          src={srcImage}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Contenido del curso */}
      <div className="p-4 w-2/3 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <p className="font-bold text-xl text-white">{title}</p>
            {isPopular && (
              <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>

        {/* Botón de acceso */}
        <Link href={link} className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:bg-indigo-500 w-fit">
          <span>Abrir</span>
          <ArrowForward fontSize="small" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
