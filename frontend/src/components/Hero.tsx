// Hero.js
import React from 'react';

const Hero = () => {
    return (
        <section className="relative py-20 bg-cover bg-center" style={{ backgroundImage: 'url("/path-to-your-image.jpg")' }}>
            <div className="container mx-auto text-center">
                <h2 className="text-5xl font-bold  mb-4">Bienvenido a Ingeniería Informática</h2>
                <p className="text-2xl  mb-6">Descubre, aprende y colabora con los mejores recursos para tu carrera.</p>
                <a href="#anuncios" className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 transition">
                    Ver Anuncios
                </a>
            </div>
        </section>
    );
};

export default Hero;
