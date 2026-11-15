
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from './common/Footer';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const API = 'http://localhost:5001/api/blogs';
const ADMIN_EMAIL = 'vidula.saravanan@gmail.com';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const isAdmin = user?.email === ADMIN_EMAIL;

    const fetchBlogs = async () => {
        try {
            const res = await axios.get(API);
            setBlogs(res.data);
            setError('');
        } catch (error) {
            setError('Unable to fetch blogs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        fetchBlogs();

        return () => unsubscribe();
    }, []);

    const getAuthHeaders = async () => {
        if (!auth.currentUser) {
            throw new Error('Please log in first.');
        }

        const token = await auth.currentUser.getIdToken();

        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const handleNewBlogSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const config = await getAuthHeaders();

            const today = new Date();
            const date = today.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            await axios.post(API, {
                newTitle,
                newContent,
                date,
                likes: 0
            }, config);

            setNewTitle('');
            setNewContent('');
            await fetchBlogs();

        } catch (error) {
            setError(error.response?.data?.message || error.message || 'Could not create blog.');
        }
    };

    const handleLike = async (blogId) => {
        try {
            await axios.patch(`${API}/like/${blogId}`);
            await fetchBlogs();
        } catch (error) {
            setError('Could not like this blog.');
        }
    };

    const handleEdit = async (blog) => {
        const updatedTitle = window.prompt('Enter new blog title:', blog.newTitle);

        if (updatedTitle === null) return;

        const updatedContent = window.prompt('Enter new blog content:', blog.newContent);

        if (updatedContent === null) return;

        try {
            const config = await getAuthHeaders();

            await axios.put(`${API}/${blog._id}`, {
                newTitle: updatedTitle,
                newContent: updatedContent
            }, config);

            await fetchBlogs();

        } catch (error) {
            setError(error.response?.data?.message || 'Could not edit blog.');
        }
    };

    const handleDelete = async (blogId) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            const config = await getAuthHeaders();

            await axios.delete(`${API}/${blogId}`, config);
            await fetchBlogs();

        } catch (error) {
            setError(error.response?.data?.message || 'Could not delete blog.');
        }
    };

    return (
        <div className="min-h-screen bg-[#fffaf0] text-[#51434a]">

            {/* Page Heading */}
            <section className="px-6 pt-16 pb-10 text-center">
                <p className="text-sm tracking-[0.3em] uppercase text-[#a65e7d] mb-4">
                    A little corner of the internet
                </p>

                <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#51434a] mb-5">
                    The <span className="italic text-[#c77f99]">Journal</span> ✿
                </h1>

                <p className="max-w-xl mx-auto text-[#897780] leading-7">
                    Thoughts, stories, ideas and little things worth remembering.
                    Take a moment, get comfortable and have a read.
                </p>

                <div className="flex justify-center items-center gap-3 mt-7 text-sm text-[#a65e7d]">
                    <span>✧</span>
                    <span>PERSONAL NOTES & STORIES</span>
                    <span>✧</span>
                </div>
            </section>

            {/* Decorative Divider */}
            <div className="max-w-5xl mx-auto px-6 mb-12">
                <div className="border-t border-dashed border-[#d8b1bd]"></div>
            </div>

            {/* Admin Create Blog Section */}
            {isAdmin && (
                <section className="max-w-4xl mx-auto px-6 mb-14">
                    <div className="bg-[#f5dce5] border border-[#d8b1bd] rounded-2xl p-6 md:p-8 shadow-sm">

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <p className="text-xs tracking-widest uppercase text-[#a65e7d] mb-2">
                                    Your writing desk
                                </p>

                                <h2 className="text-2xl font-serif font-bold text-[#51434a]">
                                    Create a new entry ✎
                                </h2>
                            </div>

                            <span className="text-3xl">🌷</span>
                        </div>

                        <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">

                            <input
                                type="text"
                                placeholder="Give your story a title..."
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                className="w-full p-4 bg-[#fffaf0] border border-[#d8b1bd] rounded-xl text-[#51434a] placeholder-[#b69aa4] focus:outline-none focus:ring-2 focus:ring-[#c77f99]"
                                required
                            />

                            <textarea
                                placeholder="Start writing your thoughts here..."
                                value={newContent}
                                onChange={(e) => setNewContent(e.target.value)}
                                className="w-full p-4 bg-[#fffaf0] border border-[#d8b1bd] rounded-xl text-[#51434a] placeholder-[#b69aa4] focus:outline-none focus:ring-2 focus:ring-[#c77f99] resize-y"
                                rows="5"
                                required
                            />

                            <button
                                type="submit"
                                className="button-style self-start"
                            >
                                Publish entry ✧
                            </button>
                        </form>
                    </div>
                </section>
            )}

            {/* Error Message */}
            {error && (
                <div className="max-w-4xl mx-auto px-6 mb-8">
                    <p className="bg-[#f5dce5] border border-[#d8b1bd] text-[#a65e7d] rounded-xl p-4 text-center">
                        {error}
                    </p>
                </div>
            )}

            {/* Blog List */}
            <section className="max-w-6xl mx-auto px-6 pb-20">

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-serif font-bold text-[#51434a]">
                        Recent entries
                    </h2>

                    <span className="text-sm text-[#a65e7d]">
                        ✿ {blogs.length} {blogs.length === 1 ? 'story' : 'stories'}
                    </span>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-[#a65e7d] font-serif text-xl">
                            Opening the journal... ✧
                        </p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20 bg-[#f8eee8] border border-dashed border-[#d8b1bd] rounded-2xl">
                        <p className="text-4xl mb-4">📖</p>
                        <h3 className="text-xl font-serif font-bold mb-2">
                            Nothing here just yet!
                        </h3>
                        <p className="text-[#897780]">
                            New stories will find their way here soon.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-7">

                        {blogs.map((blog, index) => (
                            <article
                                key={blog._id}
                                className="group bg-white border border-[#e8d8cc] rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >

                                <div className="flex justify-between items-center mb-5">
                                    <span className="text-xs tracking-widest uppercase text-[#a65e7d] bg-[#f5dce5] px-3 py-2 rounded-full">
                                        Entry No. {String(index + 1).padStart(2, '0')}
                                    </span>

                                    <span className="text-xl text-[#c77f99]">
                                        ✧
                                    </span>
                                </div>

                                <h3 className="font-serif font-bold text-2xl text-[#51434a] mb-3 group-hover:text-[#a65e7d] transition-colors">
                                    {blog.newTitle}
                                </h3>

                                <p className="text-xs tracking-wide text-[#b69aa4] mb-5">
                                    ♡ {blog.date}
                                </p>

                                <div className="border-t border-dashed border-[#e8d8cc] mb-5"></div>

                                <p className="text-[#74656b] leading-8 whitespace-pre-wrap break-words">
                                    {blog.newContent}
                                </p>

                                <div className="flex flex-wrap justify-between items-center gap-4 mt-8 pt-5 border-t border-[#f0e5df]">

                                    <button
                                        type="button"
                                        onClick={() => handleLike(blog._id)}
                                        className="text-[#a65e7d] hover:text-[#c77f99] transition-colors font-medium"
                                    >
                                        ♡ Like · {blog.likes || 0}
                                    </button>

                                    {isAdmin && (
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(blog)}
                                                className="px-4 py-2 rounded-full text-sm bg-[#e4eadc] text-[#53684d] hover:bg-[#d3dfca] transition-colors"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleDelete(blog._id)}
                                                className="px-4 py-2 rounded-full text-sm bg-[#f5dce5] text-[#a65e7d] hover:bg-[#ecc7d6] transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}

                    </div>
                )}
            </section>

            {/* Closing Note */}
            <div className="text-center pb-16 px-6">
                <p className="font-serif italic text-xl text-[#a65e7d]">
                    "Every little thought deserves a place to live."
                </p>
                <p className="text-[#b69aa4] mt-3">♡</p>
            </div>

            <Footer />
        </div>
    );
}

export default Blogs;
