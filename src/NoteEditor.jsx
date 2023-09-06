import { useState } from "react";
import { useAuth } from "./AuthContext";
import TagForm from "./TagForm";

const url = import.meta.env.VITE_BACKEND_HOST + '/api/v1/notes'

const NoteEditor = () => {
    const { token, login, logout, isAuthenticated } = useAuth();

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [hint, setHint] = useState({ result: 'Fail', message: ' ' })


    // tag
    const [selectedTags, setSelectedTags] = useState(new Set())
    const handleTagClick = (tagId) => {
        if (selectedTags.has(tagId)) {
            setSelectedTags(prev => new Set([...prev].filter(x => x !== tagId)))
        }
        else {
            setSelectedTags(prev => new Set([...prev, tagId]))
        }
    };

    // tag

    const submit = async (e) => {
        e.preventDefault()

        const response1 = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        const result1 = await response1.json()
        if (result1.result === 'Success') {
            const noteId = result1.data.id

            const results2 = await Promise.all(
                Array.from(selectedTags).map(async (tagId) => {
                    const response2 = await fetch(
                        url + '/' + noteId + '/tags/' + tagId, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": token
                        },
                    })
                    return response2.json()
                })
            )

            if (results2.every((result2) => (result2.result === "Success"))) {
                setTitle("")
                setBody("")
                console.log("水啦")
            }
        }
        setHint(result1);

    }

    if (!isAuthenticated()) {
        return <>請先登入</>
    }
    else {
        return <>
            <div className="my-8">
                <TagForm selectedTags={selectedTags} handleTagClick={handleTagClick} />

                <form onSubmit={submit}>
                    <input type="text" className="text-4xl bg-gray-50 border rounded-xl w-full px-6 py-4 mt-6 mb-8 focus:outline-none focus:ring focus:border-blue-500" placeholder="標題" onChange={(e) => setTitle(e.target.value)} />
                    <textarea className="text-2xl bg-gray-50 border w-full rounded-xl px-6 py-4 mb-6 focus:outline-none focus:ring focus:border-blue-500" rows={12} placeholder="內容" onChange={(e) => setBody(e.target.value)}></textarea>
                    <button type="submit" className="text-3xl px-8 py-4 bg-blue-700 hover:bg-blue-500 transition text-white rounded-xl">儲存</button>
                    <span className={"ml-10 text-3xl " + (hint.result === 'Fail' ? 'text-red-500' : 'text-blue-500')}>{hint.message}</span>
                </form>
            </div>
        </>
    }

}

export default NoteEditor

