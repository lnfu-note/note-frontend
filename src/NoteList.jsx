import { useEffect, useState } from "react"
import { useAuth } from "./AuthContext";
import { Link, useParams } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_HOST + '/api/v1/'

const NoteList = () => {
    const { token, isAuthenticated } = useAuth()
    const { tagId } = useParams()
    const [tag, setTag] = useState("")
    const [notes, setNotes] = useState([])
    useEffect(() => {
        if (tagId) {// 獲取 tag name
            fetch(url + 'tags/' + tagId, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }).then(response => response.json()).then(res => {
                setTag(res.data.name)
            })
        }

        fetch(tagId ? url + 'tags/' + tagId + '/notes' : url + 'notes', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
        }).then(response => response.json()).then(res => {
            setNotes(res.data)
        })
    }, [])

    const getFormattedDate = (dbDate) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dbDate)
        return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
    }

    return <>
        <ul className="text-xl">
            <h1 className="mb-5 text-4xl text-rose-500">{tagId ? "#" + tag : "所有筆記"}</h1>

            {isAuthenticated() && <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th>標題</th>
                        <th>建立時間</th>
                        <th>上次修改</th>
                    </tr>
                </thead>
                <tbody>

                    {notes.map((e) => {
                        const creationDate = new Date(e.created_at)
                        const lastModifiedDate = new Date(e.last_modified_at)
                        return <tr className="px-8 py-4 border" key={e.id}>
                            <td><a href={"/notes/" + e.id}>{e.title}</a></td>
                            <td><a href={"/notes/"}>{getFormattedDate(e.created_at)}</a></td>
                            <td><a href={"/notes/"}>{getFormattedDate(e.last_modified_at)}</a></td>
                        </tr>
                    })}


                </tbody>
            </table>
            }
        </ul>

        {!isAuthenticated() && <div>請先<Link to='/account/login' className="underline hover:text-green-500">登入</Link></div>}
    </>
}

export default NoteList