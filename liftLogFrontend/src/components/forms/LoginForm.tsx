import React from "react";

function LoginForm() {

    return (
        <div className="flex flex-col justify-center items-center md:max-w-lg md:mx-auto mt-12">
            <p className="text-lg font-bold p-4">Account Login</p>

            <form className="flex flex-col w-11/12">
                <div>
                    <label className="absolute bg-white ml-4 text-md" htmlFor="email">Email Address</label>
                    <input className="mt-3 p-3 w-full border-solid border-4 border-light-grey-500" type="text" />
                </div>
                
                <div className="mt-8">
                    <label className="absolute bg-white ml-4 text-md" htmlFor="email">Password</label>
                    <input className="mt-3 p-3 w-full border-solid border-4 border-light-grey-500" type="text" />
                </div>
                
                <button className="mt-10 h-12 rounded-md bg-[#00df9a]">Log In</button>
            </form>

            <small className="text-center m-5">Not a member? <a className="text-blue-700" href="/account/create">Sign up</a> here!</small>
        </div>
    );
}

export default LoginForm;