
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../config/firebase';

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);

            await signInWithEmailAndPassword(auth, email, password);

            alert('Login successful!');
            navigate('/home');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Please enter your email address first.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent! Check your inbox.');
            setError('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#fffaf0] flex items-center justify-center px-5 py-16">

            <div className="w-full max-w-md">

                {/* Decorative Heading */}
                <div className="text-center mb-8">
                    <p className="text-sm tracking-[0.3em] uppercase text-[#a65e7d] mb-4">
                        Welcome back
                    </p>

                    <h1 className="text-5xl font-serif font-bold text-[#51434a]">
                        Hello <span className="italic text-[#c77f99]">again!</span>
                    </h1>

                    <p className="text-[#897780] mt-4 leading-7">
                        Your little corner of the internet is waiting for you.
                    </p>

                    <p className="text-2xl text-[#c77f99] mt-4">✧ ♡ ✧</p>
                </div>

                {/* Login Card */}
                <div className="bg-white border border-[#e8d8cc] rounded-2xl p-7 md:p-9 shadow-lg">

                    <div className="flex justify-between items-center mb-7">
                        <div>
                            <p className="text-xs tracking-widest uppercase text-[#a65e7d] mb-2">
                                Member access
                            </p>

                            <h2 className="text-2xl font-serif font-bold text-[#51434a]">
                                Sign in ✿
                            </h2>
                        </div>

                        <div className="w-12 h-12 rounded-full bg-[#f5dce5] flex items-center justify-center text-2xl">
                            🌷
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-[#74656b] mb-2">
                                Email address
                            </label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full p-3 bg-[#fffaf0] border border-[#e8d8cc] rounded-xl text-[#51434a] placeholder-[#b69aa4] focus:outline-none focus:ring-2 focus:ring-[#c77f99]"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-[#74656b] mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-[#fffaf0] border border-[#e8d8cc] rounded-xl text-[#51434a] placeholder-[#b69aa4] focus:outline-none focus:ring-2 focus:ring-[#c77f99]"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-[#a65e7d] bg-[#f5dce5] border border-[#d8b1bd] p-3 rounded-lg">
                                {error}
                            </p>
                        )}

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-sm text-[#a65e7d] hover:text-[#c77f99] underline underline-offset-4"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="button-style w-full disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Logging in...' : 'Login to your account ✧'}
                        </button>
                    </form>

                    {/* Signup */}
                    <div className="border-t border-dashed border-[#e8d8cc] mt-7 pt-6 text-center">
                        <p className="text-sm text-[#897780]">
                            New around here?
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate('/signup')}
                            className="mt-2 text-[#a65e7d] font-semibold hover:text-[#c77f99] underline underline-offset-4"
                        >
                            Create an account ♡
                        </button>
                    </div>
                </div>

                {/* Bottom Note */}
                <p className="text-center text-sm text-[#b69aa4] mt-7 font-serif italic">
                    A little space to read, write and create.
                </p>

            </div>
        </div>
    );
}

export default Login;
