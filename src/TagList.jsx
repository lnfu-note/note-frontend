import { useEffect, useState } from "react"
import { useAuth } from "./AuthContext"
import { Link } from 'react-router-dom'

const url = import.meta.env.VITE_BACKEND_HOST + '/api/v1/tags'

const TagList = () => {
    const { token, isAuthenticated } = useAuth();
    const [tags, setTags] = useState([])
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then(response => response.json()).then(res => {
            setTags(res.data)
        })
    }, [])


    return <>
        {isAuthenticated() && tags.map((e) => (<span className="text-xl px-3 py-2 mr-2 rounded-full bg-slate-100 hover:text-blue-500 hover:bg-slate-200" key={e.id}><Link to={'/tags/' + e.id}>#{e.name}</Link></span>))}
        {!isAuthenticated() && <div>請先<Link to='/account/login' className="underline hover:text-green-500">登入</Link></div>}
    </>
}

export default TagList