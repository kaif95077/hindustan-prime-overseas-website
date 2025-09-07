"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Leaf, Coffee, Drum, Star, Phone, Mail, ChevronRight, CheckCircle, Zap, Handshake, Globe, Package, Award, X } from 'lucide-react';
import { Metadata } from 'next';

/* Note: In a real Next.js app, this metadata would be in a layout.js or page.js file, 
but it's included here for completeness as per the provided code.
*/
export const metadata: Metadata = {
  title: 'Hindustan Prime Overseas | Global Trade Partner',
  description: 'Your trusted partner in global trade. Specializing in spices, herbs, food products, and industrial packaging. Consistent. Committed. Connected.',
};

// 3D Globe Animation Component
const GlobeCanvas = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        const textureLoader = new THREE.TextureLoader();

        // Earth
        const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
        const earthTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/land_ocean_ice_cloud_2048.jpg');
        const earthMaterial = new THREE.MeshStandardMaterial({
            map: earthTexture,
            metalness: 0.2,
            roughness: 0.7,
        });
        const earth = new THREE.Mesh(earthGeometry, earthMaterial);
        scene.add(earth);
        
        // Clouds
        const cloudGeometry = new THREE.SphereGeometry(2.05, 64, 64);
        const cloudTexture = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/cloud.png');
        const cloudMaterial = new THREE.MeshPhongMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: 0.3,
        });
        const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
        scene.add(clouds);

        // Stars
        const starsGeometry = new THREE.BufferGeometry();
        const starVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            if (Math.sqrt(x * x + y * y + z * z) > 150) {
                 starVertices.push(x, y, z);
            }
        }
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);
        
        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        const onMouseMove = (event) => {
            mouseX = (event.clientX - window.innerWidth / 2) / 1000;
            mouseY = (event.clientY - window.innerHeight / 2) / 1000;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            earth.rotation.y += 0.0005;
            clouds.rotation.y += 0.0006;
            stars.rotation.y += 0.0001;
            
            // Add mouse-based rotation
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        // Handle Resize
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (currentMount && renderer.domElement) {
                 currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} className="absolute top-0 left-0 w-full h-full" />;
};

// WhatsApp Icon SVG Component
const WhatsAppIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    role="presentation"
    focusable="false"
    style={{ display: 'block', fill: 'currentColor' }}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.521.074-.792.372-.271.296-1.043 1.016-1.043 2.479 0 1.462 1.067 2.869 1.213 3.067.148.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// Email Popup Component
const EmailPopup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full relative transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors">
                    <X size={24} />
                </button>
                <div className="text-center">
                    <Mail size={48} className="mx-auto text-blue-600 mb-4" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Contact Us</h3>
                    <p className="text-slate-600 mb-6">You can reach us at the email address below.</p>
                    <div className="bg-slate-100 p-4 rounded-md">
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@hindustanprimeoverseas.com" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-700 break-all hover:underline">
                            info@hindustanprimeoverseas.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};


// Main Page Component for Next.js
export default function Page() {
    const [isEmailModalOpen, setEmailModalOpen] = useState(false);

    const handleSmoothScroll = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const products = [
        {
            icon: <Leaf className="w-12 h-12 text-yellow-400" />,
            title: "Spices & Herbs",
            description: "Chilli, Turmeric, Cumin, Coriander, Fenugreek, Mustard Seeds, Garlic, Onion, and blended spice mixes.",
            image: "https://images.unsplash.com/photo-1598512752271-33f913a5af13?q=80&w=2940&auto-format&fit=crop"
        },
        {
            icon: <Coffee className="w-12 h-12 text-yellow-400" />,
            title: "Food & Beverages",
            description: "Premium Tea, Coffee Beans, Pulses (Lentils, Beans), Sugar & Coconut Products.",
            image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2942&auto-format&fit=crop"
        },
        {
            icon: <Drum className="w-12 h-12 text-yellow-400" />,
            title: "Industrial Packaging",
            description: "HDPE Blue Drums (200L, 220L, 260L) and custom packaging for industrial use.",
            image: "https://i0.wp.com/itppackaging.com/wp-content/uploads/2021/02/ITP-3.jpg?fit=400%2C400&ssl=1"
        }
    ];

    const whyChooseUs = [
        { icon: <Globe size={24} />, title: "Global Expertise", description: "Decades of experience in international trade." },
        { icon: <Zap size={24} />, title: "Reliable Delivery", description: "Strong logistics to meet tight deadlines." },
        { icon: <Award size={24} />, title: "Premium Quality", description: "Strict quality control at every stage." },
        { icon: <Package size={24} />, title: "Wide Portfolio", description: "Agro, food, and industrial products under one brand." },
        { icon: <Handshake size={24} />, title: "Long-Term Partnerships", description: "Trust as the foundation of every relationship." },
        { icon: <Leaf size={24} />, title: "Sustainability", description: "Ethical sourcing and eco-friendly practices." }
    ];

    const testimonials = [
        {
            quote: "Hindustan Prime Overseas's dedication is exceptional. They handled our complex spice shipment with professionalism, and we were impressed by their constant communication.",
            name: "Aarav Sharma",
            company: "Spice Exporters Inc.",
            rating: 5
        },
        {
            quote: "We trust them for all our agro-product exports. Their logistics network is top-notch, ensuring our goods always arrive on time and in perfect condition. Highly recommended!",
            name: "Priya Singh",
            company: "Global Grains Co.",
            rating: 5
        },
         {
            quote: "The team is responsive, knowledgeable, and a pleasure to work with. They've become an integral part of our supply chain, providing seamless import services.",
            name: "Rohan Mehta",
            company: "Mehta Imports",
            rating: 5
        }
    ];


    return (
        <div className="bg-white text-gray-800 font-sans">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-wider">HINDUSTAN PRIME</h1>
                    <nav className="hidden md:flex space-x-8 text-white">
                        <a href="#about" onClick={handleSmoothScroll} className="hover:text-yellow-400 transition-colors transform hover:-translate-y-0.5">About</a>
                        <a href="#products" onClick={handleSmoothScroll} className="hover:text-yellow-400 transition-colors transform hover:-translate-y-0.5">Products</a>
                        <a href="#why-us" onClick={handleSmoothScroll} className="hover:text-yellow-400 transition-colors transform hover:-translate-y-0.5">Why Us</a>
                    </nav>
                     <a href="#contact" onClick={handleSmoothScroll} className="hidden md:inline-block bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-2 px-5 rounded-md transition-all duration-300 transform hover:scale-105">
                        Contact Us
                    </a>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <section 
                    id="home" 
                    className="relative h-screen flex items-center justify-center bg-slate-900"
                >
                    <GlobeCanvas />
                    <div className="relative z-10 container mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4 max-w-2xl mx-auto">
                           HINDUSTAN PRIME OVERSEAS
                        </h2>
                        <p className="text-lg md:text-xl text-slate-300 max-w-xl mb-8 mx-auto">
                           Your Trusted Partner in Global Trade. Consistent. Committed. Connected.
                        </p>
                        <a href="#about" onClick={handleSmoothScroll} className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-md text-lg transition-transform transform hover:scale-105 inline-block">
                            Explore Services
                        </a>
                    </div>
                </section>

                {/* Welcome Section */}
                <section id="about" className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-blue-600 font-semibold mb-2">Welcome to Hindustan Prime Overseas</p>
                            <h3 className="text-4xl font-bold text-slate-900 mb-6">Your Trusted Global Partner</h3>
                            <p className="text-slate-600 mb-8">
                                We specialize in Manufacturing, Trading, Import, Export, and E-Marketing of a diverse range of products. With years of experience, we have built a reputation for integrity, quality, and consistency in international markets.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 text-slate-800">
                                <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"><CheckCircle className="w-5 h-5 mr-3 text-blue-600"/> Premium Quality</div>
                                <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"><CheckCircle className="w-5 h-5 mr-3 text-blue-600"/> Reliable Delivery</div>
                                <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"><CheckCircle className="w-5 h-5 mr-3 text-blue-600"/> Global Partnerships</div>
                                <div className="flex items-center p-2 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"><CheckCircle className="w-5 h-5 mr-3 text-blue-600"/> Trust & Transparency</div>
                            </div>
                        </div>
                        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-2xl group cursor-pointer">
                             <img src="https://i.ibb.co/N2TYk1Y6/white-plane-airplane-blue-background-flat-lay-copy-space.jpg" alt="Global logistics" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </section>
                
                {/* Products Section */}
                <section id="products" className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-bold text-slate-900 mb-4">Our Products</h3>
                            <p className="text-slate-600 max-w-2xl mx-auto">Connecting India’s finest products with markets worldwide.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((item) => (
                                <div key={item.title} className="group relative overflow-hidden rounded-lg shadow-lg">
                                    <img src={item.image} alt={item.title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        {item.icon}
                                        <h4 className="text-2xl font-bold mt-4">{item.title}</h4>
                                        <p className="text-slate-300">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                
                {/* Why Choose Us Section */}
                <section id="why-us" className="py-20 bg-slate-900 text-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-bold mb-4">Why Choose Us?</h3>
                            <p className="text-slate-300 max-w-3xl mx-auto">Our commitment to excellence is reflected in every aspect of our business, ensuring you receive unparalleled service and value.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {whyChooseUs.map((item) => (
                                <div key={item.title} className="bg-slate-800 p-8 rounded-lg text-center hover:bg-blue-600 hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="inline-block bg-slate-700 group-hover:bg-yellow-400 text-yellow-400 p-4 rounded-full mb-4 transition-colors duration-300">
                                       {item.icon}
                                    </div>
                                    <h4 className="font-bold text-xl mb-2">{item.title}</h4>
                                    <p className="text-slate-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                 {/* Testimonials Section */}
                <section id="testimonials" className="py-20 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-bold text-slate-900 mb-4">Our Client Testimonials</h3>
                            <p className="text-slate-600 max-w-2xl mx-auto">See what our partners are saying about our commitment to excellence and reliability.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((item) => (
                                <div key={item.name} className="bg-white border border-slate-200 p-8 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />)}
                                    </div>
                                    <p className="text-slate-600 mb-6 italic">"{item.quote}"</p>
                                    <div>
                                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                                        <p className="text-sm text-slate-500">{item.company}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 bg-green-600 text-white">
                    <div className="container mx-auto px-6 text-center">
                         <h3 className="text-4xl font-bold mb-4">Get In Touch</h3>
                        <p className="max-w-3xl mx-auto text-green-100 mb-10">We proudly serve clients across the Middle East, Asia-Pacific, and Africa, and are expanding into Europe & North America. Contact us for 24/7 dedicated support.</p>
                        <div className="flex justify-center">
                             <button onClick={() => setEmailModalOpen(true)} className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-8 rounded-md text-lg transition-transform transform hover:scale-105">
                                 Send Us An Email
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-300">
                <div className="container mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-4">HINDUSTAN PRIME</h3>
                        <p className="text-slate-400">Consistent. Committed. Connected.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white text-lg mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#about" onClick={handleSmoothScroll} className="hover:text-yellow-400 transition-colors">About</a></li>
                            <li><a href="#products" onClick={handleSmoothScroll} className="hover:text-yellow-400 transition-colors">Products</a></li>
                            <li><a href="#why-us" onClick={handleSmoothScroll} className="hover:text-yellow-400 transition-colors">Why Us</a></li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-slate-400">
                            <li className="flex items-start"><Mail className="w-5 h-5 mr-2 mt-1 shrink-0"/> info@hindustanprimeoverseas.com</li>
                            <li className="flex items-start"><Phone className="w-5 h-5 mr-2 mt-1 shrink-0"/> +91 9431007867</li>
                            <li className="flex items-start"><Phone className="w-5 h-5 mr-2 mt-1 shrink-0"/> +91 7283007086</li>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white text-lg mb-4">Website</h4>
                         <ul className="space-y-2">
                             <li><a href="http://www.hindustanprimeoverseas.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">www.hindustanprimeoverseas.com</a></li>
                        </ul>
                    </div>
                </div>
                 <div className="bg-black py-4">
                    <div className="container mx-auto px-6 text-center text-sm text-slate-500">
                        <p>&copy; {new Date().getFullYear()} Hindustan Prime Overseas. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>

             {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/917283007086"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-8 right-8 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Chat on WhatsApp"
            >
                <WhatsAppIcon className="w-8 h-8" />
            </a>

            <EmailPopup isOpen={isEmailModalOpen} onClose={() => setEmailModalOpen(false)} />
        </div>
    );
}
- host it on vercel
