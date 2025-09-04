"use client";

import { useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'


export default function Login() {
    const pathname = usePathname();
    const [show, setShow] = useState(false)

    return (
        <div className="h-screen overflow-hidden grid grid-cols-2">
            <div className='sticky top-0 h-screen'>
                <img className='h-screen object-cover' src="/icons/studyImg.avif" alt="Image" />
                <h2 className='font-extrabold text-6xl text-red-500 absolute bottom-6 left-12'>Fluent</h2>
                <p className='font-bold text-4xl text-red-500 absolute top-8 left-24'>Fun and Enjoyable with Fluent</p>
            </div>

            <div className='flex flex-col flex-1 overflow-auto '>
                <div className='w-4/5 mx-auto mt-8 '>
                    <div className='flex gap-6 mb-7'>

                        <Link
                            href="/signup"
                            className={`text-2xl font-bold ${pathname === "/signup"
                                ? "underline underline-offset-8 text-black"
                                : "text-gray-500"
                                }`
                            }
                        >
                            Sign up
                        </Link>

                        <Link
                            href="/login"
                            className={`text-2xl font-bold ${pathname === "/login"
                                ? "underline underline-offset-8 text-black"
                                : "text-gray-500"
                                }`
                            }
                        >
                            Log in
                        </Link>
                        <Link
                            href="/"
                            className="fixed top-4 right-6 bg-white rounded-full p-1 shadow hover:shadow-md z-50"
                        >
                            <XMarkIcon className="h-7 text-gray-700" />
                        </Link>
                    </div>

                    <div className=''>
                        <button
                            type="button"
                            className="flex items-center justify-center border border-gray-700 w-full bg-white text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                        >
                            <img className='h-5' src="/icons/google-logo.png" alt="logo" />
                            <span className='text-gray-700 font-medium pl-2'>
                                Log in with Google
                            </span>
                        </button>
                    </div>

                    <div className="flex items-center w-full my-6 ">
                        <hr className="flex-grow border-gray-400" />
                        <span className="px-4 text-gray-500">or with email</span>
                        <hr className="flex-grow border-gray-400" />
                    </div>


                    <div className=''>
                        <form className=' grid text-black shadow-[0_15px_50px_-12px_rgba(0,0,0,0.45)] gap-6 py-8 px-7' action="">

                            <label htmlFor="">
                                <span className='text-gray-600 font-medium text-xl'>Email</span>
                                <input
                                    type="email"
                                    placeholder='Email or Username'
                                    className="bg-gray-100 px-3 py-2 block border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                            </label>


                            <label htmlFor="" className='relative'>
                                <span className='text-gray-600 font-medium text-xl'>Password</span>
                                <Link href="/forgot-password">
                                    <span className='text-sm text-blue-600 font-medium absolute bottom-11 right-0'>Forgot password</span>
                                </Link>
                                <input
                                    type={show ? 'text' : 'password'}
                                    placeholder='*******'
                                    className="bg-gray-100 px-3 py-2 block border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(s => !s)}
                                    className="absolute top-7 bottom-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                                >
                                    {show
                                        ? <EyeIcon className="h-5 w-5" />
                                        : <EyeSlashIcon className="h-5 w-5" />
                                    }
                                </button>
                            </label>


                            <div className='mt-3 text-center'>
                                <span className="text-gray-500 text-sm">
                                    By clicking Log in, you accept Fluent's{' '}
                                    <a href="/terms" className="text-blue-600 hover:underline">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </a>
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                            >
                                Log in
                            </button>

                            <Link
                                href="/signup"
                                className=" text-center border border-gray-700 w-full bg-white text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                            >
                                New to Fluent? Sign up
                            </Link>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
