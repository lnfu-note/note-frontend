import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./AuthContext";

export default function Header() {
    const [dropdown, setDropdown] = useState(false);
    const { logout, isAuthenticated } = useAuth();


    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/account')
    }
    const handleLogout = () => {
        logout();
    }


    return (
        <>
            <nav className="bg-gray-100 shadow fixed inset-x-0">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7">

                            <div>
                                <a href="/" className="flex items-center py-4 px-2">
                                    <span className="font-semibold text-2xl">記事本</span>
                                </a>
                            </div>

                            <div className="hidden md:flex items-center space-x-1">
                                <a href="/pins" className="py-4 px-2 text-gray-600 hover:text-blue-600 transition duration-300">Pins</a>
                                <a href="/notes" className="py-4 px-2 text-gray-600 hover:text-blue-600 transition duration-300">Notes</a>
                                <a href="/tags" className="py-4 px-2 text-gray-600 hover:text-blue-600 transition duration-300">Tags</a>
                            </div>


                        </div>
                        <div className="flex space-x-7">
                            <div className="hidden md:flex items-center space-x-3">
                                <a href="/edit" className="py-2 px-4 font-medium text-gray-100 rounded bg-gray-600 hover:bg-gray-400">＋ 新增筆記</a>
                            </div>
                            <div className="hidden md:flex items-center relative px-10">
                                <button>
                                    <img src="https://fakeimg.pl/400x400" alt="" className="h-10 w-10 rounded-full " onClick={() => setDropdown(!dropdown)} />
                                </button>
                                {dropdown &&
                                    (<div className="absolute inset-x-0 top-[110%] w-full shadow text-sm flex flex-col space-y-2 px-2 py-2 bg-gray-100">
                                        <button className="py-2  px-4 text-left w-full rounded hover:bg-gray-200 ">個人檔案</button>
                                        <button className="py-2  px-4 text-left w-full rounded hover:bg-gray-200 ">設定</button>
                                        <button onClick={isAuthenticated() ? handleLogout : handleLogin} className="py-2 px-4 text-left w-full rounded hover:bg-gray-200 ">{isAuthenticated() ? "登出" : "登入/註冊"}</button>
                                    </div>)
                                }
                            </div>


                        </div>


                    </div>
                </div>
            </nav>
        </>
    )
}