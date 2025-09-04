"use client";

import { useState } from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'


export default function Signup() {
    const pathname = usePathname();
    const [show, setShow] = useState(false)


    /*const navigate = useNavigate()
    const [error, setError] = useState('')
  
    const handleChange = e => {
      setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
      setError('')
    }
  
    const handleSubmit = e => {
      e.preventDefault()
      if (form.password !== form.confirm) {
        setError('Passwords do not match')
        return
      }
      // TODO: hook up your auth API here
      console.log('Signing up with', form)
      navigate('/') // redirect home on success
    }*/

    return (
        
        <div className='w-4/5 mx-auto mt-8 '>

            <div className='flex gap-6 mt-3 mb-7'>

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
                        Continue with Google
                    </span>
                </button>
            </div>

            <div className="flex items-center w-full my-6 ">
                <hr className="flex-grow border-gray-400" />
                <span className="px-4 text-gray-500">or with email</span>
                <hr className="flex-grow border-gray-400" />
            </div>


            <div className=''>
                <form className=' grid text-black shadow-[0_15px_50px_-12px_rgba(0,0,0,0.45)] gap-6 py-6 px-6' action="">

                    <label htmlFor="">
                        <span className='text-gray-600 font-medium text-xl'>Email</span>
                        <input
                            type="email"
                            placeholder='user@email.com'
                            className="bg-gray-100 px-3 py-2 block border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </label>

                    <label htmlFor="">
                        <span className='text-gray-600 font-medium text-xl'>Username</span>
                        <input
                            type="name"
                            placeholder='Andrew23'
                            className="bg-gray-100 px-3 py-2 block border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                    </label>

                    <label htmlFor="" className='relative'>
                        <span className='text-gray-600 font-medium text-xl'>Password</span>
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

                    <label htmlFor="" className='relative'>
                        <span className='text-gray-600 font-medium text-xl'>Confirm password</span>
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

                    <div className='mt-3'>
                        <label className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                name="promos"
                                onChange={() => { }}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">
                                I want to receive news, promotional emails, updates and tips on how to use Fluent
                            </span>
                        </label>

                        <label className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                name="terms"
                                onChange={() => { }}
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">
                                I accept Fluent's{' '}
                                <a href="/terms" className="text-blue-600 hover:underline">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="/privacy" className="text-blue-600 hover:underline">
                                    Privacy Policy
                                </a>
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                    >
                        Sign UP
                    </button>

                    <Link
                        href="/login"
                        className="text-center border border-gray-700 w-full bg-white text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                    >
                        Already have an account? Log in
                    </Link>

                </form>
            </div>
        </div>
    )
}
