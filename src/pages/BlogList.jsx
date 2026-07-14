import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../lib/sanity';
import { FiArrowUpRight } from 'react-icons/fi';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPosts().then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    useGSAP(() => {
        if (!loading && posts.length > 0) {
            gsap.fromTo('.blog-card',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
            );
        }
    }, [loading]);

    return (
        <section className="relative w-full min-h-screen bg-brand-dark pt-32 pb-20 px-4 md:px-8 lg:px-12 z-10 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-gold rounded-full blur-[150px]"></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="mb-16">
                    <p className="text-brand-gold font-body tracking-widest uppercase mb-2">Insights & News</p>
                    <h1 className="text-5xl md:text-7xl font-heading text-white uppercase">The <span className="text-brand-gold">Journal</span></h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-[40vh]">
                        <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link 
                                to={`/blog/${post.slug.current}`} 
                                key={post._id}
                                className="blog-card group flex flex-col bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-gold/50 transition-all duration-500"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={post.mainImage} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80"></div>
                                </div>
                                
                                <div className="p-6 md:p-8 flex flex-col flex-1">
                                    <p className="text-brand-gold font-body text-xs tracking-widest uppercase mb-4">
                                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                    <h2 className="text-2xl font-heading text-white leading-tight mb-4 group-hover:text-brand-gold transition-colors duration-300">
                                        {post.title}
                                    </h2>
                                    <p className="text-white/70 font-body text-sm leading-relaxed mb-8 flex-1">
                                        {post.excerpt}
                                    </p>
                                    
                                    <div className="mt-auto flex items-center gap-2 text-brand-gold font-bold text-xs tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-300">
                                        Read Article <FiArrowUpRight className="text-lg" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogList;
