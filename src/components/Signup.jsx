
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);

            await createUserWithEmailAndPassword(auth, email, password);

            alert('Account created successfully!');
            navigate('/login');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fffaf0] flex items-center justify-center px-5 py-16">

            <div className="w-full max-w-md">

                {/* Page Heading */}
                <div className="text-center mb-8">
                    <p className="text-sm tracking-[0.3em] uppercase text-[#a65e7d] mb-4">
                        A new beginning
                    </p>

                    <h1 className="text-5xl font-serif font-bold text-[#51434a]">
                        Join the <span className="italic text-[#c77f99]">club!</span>
                    </h1>

                    <p className="text-[#897780] mt-4 leading-7">
                        Create your little space on the internet.
                    </p>

                    <p className="text-2xl text-[#c77f99] mt-4">
                        ✧ ♡ ✧
                    </p>
                </div>

                {/* Signup Card */}
                <div className="bg-white border border-[#e8d8cc] rounded-2xl p-7 md:p-9 shadow-lg">

                    <div className="flex justify-between items-center mb-7">
                        <div>
                            <p className="text-xs tracking-widest uppercase text-[#a65e7d] mb-2">
                                Become a member
                            </p>

                            <h2 className="text-2xl font-serif font-bold text-[#51434a]">
                                Create account ✿
                            </h2>
                        </div>

                        <div className="w-12 h-12 rounded-full bg-[#f5dce5] flex items-center justify-center text-2xl">
                            🎀
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 bg-[#fffaf0] border border-[#e8d8cc] rounded-xl text-[#51434a] placeholder-[#b69aa4] focus:outline-none focus:ring-2 focus:ring-[#c77f99]"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-[#74656b] mb-2">
                                Confirm password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password again"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="button-style w-full disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating account...' : 'Create my account ✧'}
                        </button>

                    </form>

                    {/* Login Link */}
                    <div className="border-t border-dashed border-[#e8d8cc] mt-7 pt-6 text-center">
                        <p className="text-sm text-[#897780]">
                            Already have an account?
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="mt-2 text-[#a65e7d] font-semibold hover:text-[#c77f99] underline underline-offset-4"
                        >
                            Login here ♡
                        </button>
                    </div>
                </div>

                {/* Bottom Note */}
                <p className="text-center text-sm text-[#b69aa4] mt-7 font-serif italic">
                    Glad you're here. Make yourself at home!
                </p>

            </div>
        </div>
    );
}

export default Signup;
