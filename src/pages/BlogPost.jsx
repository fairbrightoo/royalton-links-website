import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug, getRecentPosts, urlFor } from '../lib/sanity';
import { FiArrowLeft } from 'react-icons/fi';
import { PortableText } from '@portabletext/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Custom Portable Text components for styling Sanity rich text
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).url()}
          className="w-full rounded-2xl my-8 object-cover max-h-[60vh]"
        />
      )
    }
  },
  block: {
    h1: ({children}) => <h1 className="text-4xl md:text-5xl font-heading text-white mt-12 mb-6">{children}</h1>,
    h2: ({children}) => <h2 className="text-3xl md:text-4xl font-heading text-brand-gold mt-10 mb-5">{children}</h2>,
    h3: ({children}) => <h3 className="text-2xl md:text-3xl font-heading text-white mt-8 mb-4">{children}</h3>,
    normal: ({children}) => <p className="text-lg md:text-xl text-white/80 font-body leading-relaxed mb-6">{children}</p>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-brand-gold pl-6 py-2 my-8 text-2xl font-heading text-white italic bg-white/5 rounded-r-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({children}) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-white/80">{children}</ul>,
    number: ({children}) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-white/80">{children}</ol>,
  },
}

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when loading new post
        setLoading(true);
        Promise.all([
            getPostBySlug(slug),
            getRecentPosts(slug, 3)
        ]).then(([postData, recentData]) => {
            setPost(postData);
            setRecentPosts(recentData);
            setLoading(false);
        });
    }, [slug]);

    useGSAP(() => {
        if (!loading && post) {
            const tl = gsap.timeline();
            tl.fromTo('.post-header', 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
            tl.fromTo('.post-content', 
                { y: 30, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-brand-dark flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="w-full min-h-screen bg-brand-dark flex flex-col justify-center items-center text-white">
                <h1 className="text-4xl font-heading mb-4">Post not found</h1>
                <Link to="/blog" className="text-brand-gold flex items-center gap-2 hover:underline">
                    <FiArrowLeft /> Back to Journal
                </Link>
            </div>
        );
    }

    return (
        <article className="relative w-full min-h-screen bg-brand-dark pt-32 pb-20 z-10">
            {/* Cinematic Background Blur */}
            <div className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden">
                {post.mainImage && (
                    <img 
                        src={urlFor(post.mainImage).url()} 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-20 blur-3xl transform scale-110"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-dark"></div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-16">
                <div className="lg:w-2/3">
                    <Link to="/blog" className="inline-flex items-center gap-2 text-brand-gold font-bold text-xs tracking-widest uppercase hover:-translate-x-2 transition-transform duration-300 mb-12">
                        <FiArrowLeft /> Back to Journal
                    </Link>

                    <header className="post-header mb-16">
                    <p className="text-brand-gold font-body text-sm tracking-widest uppercase mb-6">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading text-white leading-tight mb-8">
                        {post.title}
                    </h1>
                    
                    <div className="w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                        {post.mainImage && (
                            <img 
                                src={urlFor(post.mainImage).url()} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </header>

                <div className="post-content font-body">
                    {/* Render portable text (rich text from Sanity) */}
                    <PortableText 
                        value={post.body} 
                        components={ptComponents} 
                    />
                </div>
                </div>

                {/* Sidebar */}
                <aside className="lg:w-1/3 mt-16 lg:mt-0">
                    <div className="sticky top-32">
                        <h3 className="text-2xl font-heading text-white uppercase mb-8 border-b border-white/10 pb-4">
                            Latest <span className="text-brand-gold">News</span>
                        </h3>
                        
                        <div className="flex flex-col gap-6">
                            {recentPosts.map((recent) => (
                                <Link 
                                    to={`/blog/${recent.slug.current}`} 
                                    key={recent._id}
                                    className="group flex items-start gap-4 hover:bg-white/5 p-3 -mx-3 rounded-xl transition-colors duration-300"
                                >
                                    <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-white/10">
                                        <img 
                                            src={recent.mainImage ? urlFor(recent.mainImage).url() : ''} 
                                            alt={recent.title} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="flex flex-col py-1">
                                        <p className="text-brand-gold font-body text-[10px] tracking-widest uppercase mb-2">
                                            {new Date(recent.publishedAt).toLocaleDateString('en-US', {
                                                month: 'short', day: 'numeric', year: 'numeric'
                                            })}
                                        </p>
                                        <h4 className="text-white font-heading text-sm leading-tight group-hover:text-brand-gold transition-colors duration-300 line-clamp-3">
                                            {recent.title}
                                        </h4>
                                    </div>
                                </Link>
                            ))}
                            {recentPosts.length === 0 && (
                                <p className="text-white/50 text-sm font-body italic">No recent articles available.</p>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    );
};

export default BlogPost;
