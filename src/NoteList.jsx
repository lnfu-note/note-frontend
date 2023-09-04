import { useEffect, useState } from "react"
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_BACKEND_HOST + '/api/v1/notes'

const NoteList = () => {
    const { token, isAuthenticated } = useAuth();
    const [notes, setNotes] = useState([])
    useEffect(() => {
        if (isAuthenticated()) {
            fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            }).then(response => response.json()).then(data => {
                setNotes(data)
            })
        }
    }, [])

    return <>
        <ul className="text-xl">

            {isAuthenticated() && <table className="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th>標題</th>
                        <th>建立時間</th>
                        <th>上次修改</th>
                    </tr>
                </thead>
                <tbody>

                    {notes.map((e) => (
                        <tr className="px-8 py-4 border" key={e.id}>
                            <td><a href={"/notes/" + e.id}>{e.title}</a></td>
                            <td><a href={"/notes/"}>{(e.created_at)}</a></td>
                            <td><a href={"/notes/"}>{e.last_modified_at}</a></td>
                        </tr>
                    ))}


                </tbody>
            </table>
            }
        </ul>

        {!isAuthenticated() && <div>請先<Link to='/account/login' className="underline hover:text-green-500">登入</Link></div>}
    </>
}

export default NoteList