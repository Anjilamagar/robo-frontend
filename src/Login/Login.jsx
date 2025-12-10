import React from 'react'

const Login = () => {
  return (
    <div>
          <div class="bg-white flex items-center justify-center h-screen">

    <div class="flex flex-col items-center space-y-4">

         <div>
        <img src="logo.png" alt="Logo" class="w-20  flex h-50 drop-shadow-[0_0_25px_#a855f7]"/>
        </div>

        <h1 class="text-4xl text-center font-bold mb-2 text-black drop-shadow-[0_0_20px_#a855f7]">
            Welcome Back
        </h1>

        
        <div class="bg-[#16213e] border border-[#6b21a8] rounded-2xl shadow-xl shadow-[#6b21a8]/40 w-96 p-8">

            <h1 class="text-2xl font-bold text-center text-purple-200 mb-2 drop-shadow-[0_0_10px_#a855f7]">
                Login
            </h1>

            <form class="space-y-5">

                <div>
                    <label for="email" class="block text-purple-200 font-medium mb-1">Email</label>
                    <input type="email" id="email" placeholder="you@example.com"
                        class="w-full px-4 py-2 border border-[#a855f7] bg-[#1a1a2e] text-white rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#a855f7]"/>
                </div>

                <div>
                    <label for="password" class="block text-purple-200 font-medium mb-1">Password</label>
                    <input type="password" id="password" placeholder="********"
                        class="w-full px-4 py-2 border border-[#a855f7] bg-[#1a1a2e] text-white rounded-lg 
                        focus:outline-none focus:ring-2 focus:ring-[#a855f7]"/>
                </div>

                <div class="flex items-center justify-between text-purple-200">
                    <label class="flex items-center space-x-2">
                        <input type="checkbox" class="w-4 h-4 text-[#a855f7] accent-[#a855f7]"/>
                        <span>Remember me</span>
                    </label>
                    <a href="#" class="hover:underline text-purple-200 text-sm">Forgot password?</a>
                </div>

                <button type="submit" 
                    class="w-full bg-[#a855f7] hover:bg-[#c084fc] text-white py-2 rounded-lg transition-all shadow-lg shadow-[#a855f7]/40">
                    Login
                </button>
            </form>

            <div class="flex items-center my-4">
                <hr class="flex-1 border-gray-700"></hr>
                <span class="mx-2 text-gray-300">or</span>
                <hr class="flex-1 border-gray-700"></hr>
            </div>

            <button 
                class="w-full border border-[#a855f7] text-white py-2 rounded-lg hover:bg-[#a855f7]/20 transition-all">
                Sign Up
            </button>
        </div>
    </div>


    </div>
    </div>
  )
}

export default Login
