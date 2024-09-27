import Image from "next/image";
import { ArrowForward, Search } from "@mui/icons-material";
import Link from "next/link";
import introduccionImg from "../../public/introduccion.png";
import algebraImg from "../../public/algebra.png";
import calculoImg from "../../public/calculo.png";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center py-8 space-y-3 px-3">
      <h1 className="font-bold text-3xl text-gray-800">Materiales de Estudio</h1>

      <div className="flex justify-center gap-2 rounded-full w-full border-4 border-indigo-800 bg-white ">
        <input
          type="search"
          placeholder="Apuntes, programación, ejercicios"
          className="w-full outline-none bg-transparent text-gray-600 text-sm text-center"
        />
        <button className="bg-indigo-800 rounded-r-xl m-0 p-1">
          <Search className="text-white" />
        </button>
      </div>

      <div className="space-y-3 w-full ">
        <Material
          title="Introducción a la Programación"
          description="Accede al material necesario para aprender a programar desde cero."
          srcImage={introduccionImg}
          link="/material/introduccion"
        />
        <Material
          title="Álgebra I"
          description="Encuentra material para resolver ejercicios de álgebra de manera efectiva."
          srcImage={algebraImg}
          link="/material/algebra"
        />
        <Material
          title="Cálculo I"
          description="Recursos esenciales para aprender y practicar ejercicios de cálculo."
          srcImage={calculoImg}
          link="/material/calculo"
        />
      </div>
    </div>
  );
};

const Material = ({ title, description, srcImage, link }) => {
  return (
    <div className="bg-white rounded-xl shadow-md flex p-1 gap-4 items-center hover:shadow-lg transition-shadow duration-300">
      <Image
        alt={title}
        src={srcImage}
        className="rounded-xl object-cover aspect-square w-1/3"
      />
      <div className="flex-1 flex flex-col justify-around">
        <p className="font-bold text-xl text-gray-900 mb-2">{title}</p>
        <p className="text-gray-600 font-medium text-sm mb-4">{description}</p>

        <Link
          href={link}
          className="flex items-center space-x-2 bg-indigo-800 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:bg-blue-600 w-fit"
        >
          <span>Abrir</span>
          <ArrowForward fontSize="small" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
