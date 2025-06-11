
import Quote from '../components/Quote';
import { Auth } from '../components/Auth';

export const Signin = () => {
    return (
       <div className="min-h-screen flex flex-col md:flex-row text-white bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900">
        {/* Left Side - Signup Form */}
            <div className="md:w-1/2 w-full flex items-center justify-center p-8">
                <Auth type="Signin"/>
            </div>

            {/* Right Side - Quote */}
            <div className="md:w-1/2 w-full bg-gradient-to-bl from-blue-900 via-violet-800 to-green-900 flex items-center justify-center p-8  invisible md:visible">
                <Quote />
            </div>
        </div>
    )
}