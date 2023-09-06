import { useState } from 'react'
import { Link } from 'react-router-dom'

const url = import.meta.env.VITE_BACKEND_HOST + '/api/v1/users'

const Register = (props) => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [hint, setHint] = useState({ result: 'Fail', message: ' ' })

    const submit = async (event) => {
        event.preventDefault()

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        })

        const result = await response.json()

        setHint(result);
        if (result.result === 'Success') {
            setName("")
            setPassword("")
        }

    }

    return <>

        <div className='mx-auto my-40 w-full max-w-2xl text-2xl'>
            <form onSubmit={submit} className='bg-gray-100 shadow-md rounded px-28 pt-20 pb-16'>
                <div className='mb-4'>
                    <input className=' shadow border rounded w-full py-2 px-3' type='input' id='name' value={name} placeholder='帳號' onChange={(event) => { setName(event.target.value) }} />
                </div>

                <div className='mb-6'>
                    <input className=' shadow border rounded w-full py-2 px-3' type='password' id='password' value={password} placeholder='密碼' onChange={(event) => { setPassword(event.target.value) }} />
                </div>

                <div className='mb-3 flex'>
                    <button className='bg-blue-600 text-white w-full py-2' type='submit'>註冊</button>
                </div>

                <div className={'mb-1  text-center whitespace-pre ' + (hint.result === 'Fail' ? 'text-red-500' : 'text-blue-500')}>{hint.message}</div>

                <div className='flex'>
                    <div className='text-gray-400 mx-auto text-lg'>
                        回<Link to='/account/login' className="underline hover:text-green-500">登入</Link>頁面
                    </div>

                </div>

            </form>
        </div>

    </>
}

export default Register