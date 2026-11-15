
import React from 'react';
import { useNavigate } from 'react-router-dom';

import BlogProfileImage from "../assets/lucentcat.jpg";
import CSS from "../assets/css-3.png";
import HTML from "../assets/html.png";
import DB from "../assets/data-server.png";
import JS from "../assets/js.png";
import REACTICON from "../assets/physics.png";
import NODE from "../assets/node-js.png";

import P1 from "../assets/p1.jpg";
import P2 from "../assets/p2.png";
import P3 from "../assets/p3.png";
import BlogImage from "../assets/blogImage.png";

import Footer from './common/Footer';

function Home() {
    const navigate = useNavigate();

    const skills = [
        { name: "HTML", image: HTML },
        { name: "CSS", image: CSS },
        { name: "JavaScript", image: JS },
        { name: "React", image: REACTICON },
        { name: "Database", image: DB },
        { name: "Node.js", image: NODE }
    ];

    const projects = [
        { image: P1, name: "Project No. 01", description: "A little piece of my work" },
        { image: P2, name: "Project No. 02", description: "Something I created" },
        { image: P3, name: "Project No. 03", description: "Another creative experiment" }
    ];

    return (
        <div className="min-h-screen bg-[#f8eee8] text-[#51434a] font-serif">

            {/* Decorative top banner */}
            <header className="relative overflow-hidden border-b-4 border-double border-[#d9a9b6] bg-[#f2dce3]">
                <div className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: "radial-gradient(#d49aaa 1px, transparent 1px)",
                        backgroundSize: "14px 14px"
                    }}>
                </div>

                <div className="relative max-w-6xl mx-auto px-5 py-8 md:py-12 text-center">
                    <p className="text-sm tracking-[0.35em] uppercase text-[#a66d83]">
                        ✿ welcome to my little corner of the internet ✿
                    </p>

                    <h1 className="text-5xl md:text-7xl font-bold italic text-[#a65e7d] my-4 drop-shadow-sm">
                        My Personal Space
                    </h1>

                    <p className="text-sm md:text-base tracking-widest text-[#8c6975]">
                        A COLLECTION OF THOUGHTS, PROJECTS & LITTLE THINGS
                    </p>

                    <div className="mt-5 text-2xl text-[#c17c98]">
                        ✧ ⋆｡˚ ☁︎ ˚｡⋆ ✧
                    </div>
                </div>
            </header>

            {/* Main website layout */}
            <main className="max-w-6xl mx-auto px-4 md:px-7 py-8">

                {/* Navigation links */}
                <nav className="flex flex-wrap justify-center gap-3 md:gap-8 border-y border-dashed border-[#cda6b0] py-4 mb-8 text-sm md:text-base">
                    <a href="#home" className="hover:text-[#bd6e8c] transition">⌂ Home</a>
                    <a href="#about" className="hover:text-[#bd6e8c] transition">♡ About</a>
                    <a href="#skills" className="hover:text-[#bd6e8c] transition">✿ Skills</a>
                    <a href="#projects" className="hover:text-[#bd6e8c] transition">✧ Projects</a>
                    <button onClick={() => navigate("/blogs")} className="hover:text-[#bd6e8c] transition">
                        ✎ Journal
                    </button>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* Left sidebar */}
                    <aside className="md:col-span-3 space-y-5">

                        {/* Profile card */}
                        <div className="bg-[#f5dce5] border-2 border-[#d7aab8] rounded-xl p-4 shadow-[4px_4px_0px_#dfc1c7] text-center">
                            <div className="border border-dashed border-[#c58b9d] p-2">
                                <img
                                    src={BlogProfileImage}
                                    alt="My profile"
                                    className="w-full aspect-square object-cover rounded-md"
                                />
                            </div>

                            <h2 className="text-2xl font-bold text-[#a65e7d] mt-4 italic">
                                Hello, World!
                            </h2>

                            <p className="text-sm mt-2 leading-relaxed">
                                Welcome to my little space on the internet. Stay a while!
                            </p>

                            <div className="mt-4 bg-[#fff7f0] rounded-lg p-3 text-sm">
                                <p className="text-[#ad7086] font-bold">Currently feeling...</p>
                                <p className="mt-1">☁ Creating something lovely</p>
                            </div>
                        </div>

                        {/* Status widget */}
                        <div className="bg-[#fff8ed] border-2 border-[#d8c4a9] rounded-xl p-4 shadow-[4px_4px_0px_#e5d7c5]">
                            <h3 className="font-bold text-lg text-[#a66d83] border-b border-dashed border-[#d6b9ad] pb-2">
                                ✿ Little Updates
                            </h3>

                            <div className="space-y-3 text-sm mt-3">
                                <p>♡ Learning new things</p>
                                <p>♡ Building little projects</p>
                                <p>♡ Writing my thoughts</p>
                            </div>
                        </div>

                        {/* Quick stats */}
                        <div className="bg-[#e4eadc] border-2 border-[#b9c8ae] rounded-xl p-4 shadow-[4px_4px_0px_#cad5c1]">
                            <h3 className="font-bold text-lg text-[#6c8566] mb-3">
                                ✧ My Little Stats
                            </h3>

                            <div className="grid grid-cols-2 gap-2 text-center">
                                <div className="bg-[#f8f5e9] p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-[#a66d83]">6</p>
                                    <p className="text-xs">Projects</p>
                                </div>

                                <div className="bg-[#f8f5e9] p-3 rounded-lg">
                                    <p className="text-2xl font-bold text-[#a66d83]">6</p>
                                    <p className="text-xs">Months</p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="md:col-span-9 space-y-7">

                        {/* Welcome section */}
                        <section id="home" className="relative bg-[#fffaf0] border-2 border-[#ddc9b7] rounded-xl p-6 md:p-9 shadow-[5px_5px_0px_#e8d8cc] overflow-hidden">
                            <div className="absolute top-3 right-5 text-3xl text-[#d8a2b3]">✿</div>
                            <div className="absolute bottom-3 right-5 text-4xl text-[#d9c78f]">✧</div>

                            <p className="text-[#ad7188] tracking-widest text-sm uppercase">
                                ✿ A little introduction
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold italic text-[#a65e7d] mt-3 mb-4">
                                Hy! I Am
                            </h2>

                            <h3 className="text-3xl md:text-5xl font-bold text-[#6d8067] mb-5">
                                Lucent Cat
                            </h3>

                            <div className="border-l-4 border-[#d8a2b3] pl-4 max-w-2xl">
                                <p className="text-base md:text-lg leading-8">
                                    I can create stunning websites for your company.
                                    Do check my works. I won't disappoint you.
                                    Try me for 7 days before you decide anything.
                                </p>
                            </div>

                            <button
                                className="mt-7 bg-[#c77f99] hover:bg-[#a65e7d] text-white px-6 py-3 rounded-full shadow-[3px_3px_0px_#e3c0ca] transition"
                            >
                                Let's Connect ♡
                            </button>

                            <div className="mt-7 pt-4 border-t border-dashed border-[#d9bfc0] text-sm text-[#a87986]">
                                ✧ Thanks for visiting my little corner! ✧
                            </div>
                        </section>

                        {/* Skills section */}
                        <section id="skills" className="bg-[#f4e2e6] border-2 border-[#d8b1bd] rounded-xl p-5 md:p-7 shadow-[5px_5px_0px_#e4c9d0]">
                            <div className="flex justify-between items-center border-b border-dashed border-[#c99eaa] pb-3 mb-5">
                                <h2 className="text-2xl md:text-3xl font-bold italic text-[#a65e7d]">
                                    My Creative Toolbox
                                </h2>
                                <span className="text-2xl">🧸</span>
                            </div>

                            <p className="text-sm mb-5">
                                Some of the tools and technologies I love working with.
                            </p>

                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                                {skills.map((skill) => (
                                    <div key={skill.name} className="bg-[#fffaf2] border border-[#e1c7c5] rounded-xl p-3 text-center hover:-translate-y-1 transition shadow-sm">
                                        <img
                                            src={skill.image}
                                            alt={skill.name}
                                            className="w-10 h-10 object-contain mx-auto"
                                        />
                                        <p className="text-xs mt-2 font-bold">{skill.name}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* About / Services */}
                        <section id="about" className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div className="bg-[#e4eadc] border-2 border-[#b9c8ae] rounded-xl p-6 shadow-[4px_4px_0px_#cad5c1]">
                                <p className="text-3xl mb-3">🌷</p>
                                <h2 className="text-2xl font-bold italic text-[#71856b] mb-3">
                                    My Journey
                                </h2>
                                <p className="leading-7 text-sm">
                                    Every project is a new opportunity to learn, experiment
                                    and create something meaningful.
                                </p>
                            </div>

                            <div className="bg-[#fff3e5] border-2 border-[#ddc6a9] rounded-xl p-6 shadow-[4px_4px_0px_#e8d8c3]">
                                <p className="text-3xl mb-3">📜</p>
                                <h2 className="text-2xl font-bold italic text-[#a77b58] mb-3">
                                    My Resume
                                </h2>
                                <p className="leading-7 text-sm">
                                    Want to know more about my experience and work?
                                    My resume is here for your reference.
                                </p>
                                <button className="mt-4 bg-[#b58b69] hover:bg-[#96704f] text-white px-4 py-2 rounded-full text-sm transition">
                                    Download CV ↓
                                </button>
                            </div>

                        </section>

                        {/* Projects section */}
                        <section id="projects" className="bg-[#fffaf0] border-2 border-[#ddc9b7] rounded-xl p-5 md:p-7 shadow-[5px_5px_0px_#e8d8cc]">
                            <div className="flex justify-between items-center border-b border-dashed border-[#d9bfc0] pb-3 mb-5">
                                <div>
                                    <p className="text-sm text-[#ad7188]">A little gallery of</p>
                                    <h2 className="text-3xl font-bold italic text-[#a65e7d]">
                                        My Projects
                                    </h2>
                                </div>
                                <span className="text-3xl">🎀</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                {projects.map((project, index) => (
                                    <div key={project.name} className="bg-[#f5e4e5] p-3 rounded-xl border border-[#dfbdc5] shadow-sm hover:-translate-y-1 transition">
                                        <div className="bg-white p-2 rounded-lg">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-full h-40 object-cover rounded-md"
                                            />
                                        </div>

                                        <h3 className="font-bold text-[#a65e7d] mt-3">
                                            {project.name}
                                        </h3>

                                        <p className="text-xs mt-1">{project.description}</p>

                                        <p className="text-xs text-[#a87986] mt-3">
                                            ✧ 0{index + 1} ✧
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Blog section */}
                        <section className="bg-[#e4eadc] border-2 border-[#b9c8ae] rounded-xl p-5 md:p-7 shadow-[5px_5px_0px_#cad5c1]">
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-5 items-center">
                                <div className="sm:col-span-2">
                                    <div className="bg-[#fffaf0] p-2 rounded-xl border border-[#c9d0b9]">
                                        <img
                                            src={BlogImage}
                                            alt="Blog illustration"
                                            className="w-full rounded-lg object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <p className="text-[#71856b] text-sm tracking-widest">
                                        ✎ FROM MY JOURNAL
                                    </p>

                                    <h2 className="text-3xl md:text-4xl font-bold italic text-[#71856b] mt-3">
                                        I Like to Write
                                    </h2>

                                    <h3 className="text-2xl font-bold text-[#a65e7d] mt-2">
                                        Blogs about tech
                                    </h3>

                                    <p className="leading-7 text-sm mt-4">
                                        You can know better about me by reading my blogs here.
                                        I share my expertise, experiences and thoughts.
                                    </p>

                                    <button
                                        onClick={() => navigate("/blogs")}
                                        className="mt-5 bg-[#71856b] hover:bg-[#596e53] text-white px-6 py-3 rounded-full shadow-sm transition"
                                    >
                                        Read My Blogs ♡
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* Guestbook style ending */}
                        <section className="bg-[#f5dce5] border-2 border-dashed border-[#d3a1b1] rounded-xl p-6 text-center">
                            <p className="text-3xl">💌</p>
                            <h2 className="text-2xl font-bold italic text-[#a65e7d] mt-2">
                                You've reached the end!
                            </h2>
                            <p className="text-sm mt-2">
                                Thank you for exploring my little website.
                            </p>
                            <p className="text-[#a65e7d] mt-3 tracking-widest">
                                ✧ made with love & a little creativity ✧
                            </p>
                        </section>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
