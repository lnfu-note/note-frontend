import { useEffect, useState } from "react"
import { Routes, Route, useParams } from 'react-router-dom';
import { useAuth } from "./AuthContext";


const Note = () => {
    const { noteId } = useParams()
    const { token } = useAuth()
    const [error, setError] = useState()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [creationDate, setCreationDate] = useState()
    const [lastModifiedDate, setLastModifiedDate] = useState()
    const [tags, setTags] = useState([])

    const url = import.meta.env.VITE_BACKEND_HOST + '/api/v1/notes/' + noteId

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then(response => response.json()).then(data => {

            if (data.result === 'Success') {
                setTitle(data.data.title)
                setBody(data.data.body)
                setTags(data.data.tags)

                const creationDateRaw = new Date(data.data.created_at)
                setCreationDate(creationDateRaw.getFullYear() + '.' + ('0' + creationDateRaw.getMonth()).slice(-2) + '.' + ('0' + creationDateRaw.getDay()).slice(-2))

                const lastModifiedDateRaw = new Date(data.data.last_modified_at)
                setLastModifiedDate(lastModifiedDateRaw.getFullYear() + '.' + ('0' + lastModifiedDateRaw.getMonth()).slice(-2) + '.' + ('0' + lastModifiedDateRaw.getDay()).slice(-2) + ' ' + ('0' + lastModifiedDateRaw.getHours()).slice(-2) + ':' + ('0' + lastModifiedDateRaw.getMinutes()).slice(-2))
            }
            else {
                setError(data.message)
            }
        })

    })

    return <>
        <div className="">{error}</div >

        {(!error) && <div className="px-5 py-5 min-h-100 ">
            <h1 className="text-center text-3xl py-1">{title}</h1>
            <div className="text-sm text-slate-700 text-center">{tags.map((e) => (<a key={e.id} href={"/tags/" + e.id} className="mr-2 hover:text-blue-600 hover:cursor-pointer">#{e.name}</a>))}</div>
            <div className="text-sm text-slate-700 text-center pb-2">{creationDate}</div>
            <hr className="border-1 border-dashed border-gray-500 " />
            <p className="text-xl px-5 py-8">{body}<span className="ml-2 text-sm text-gray-400">上次編輯 - {lastModifiedDate}</span></p>
        </div>
        }

    </>
}

export default Note