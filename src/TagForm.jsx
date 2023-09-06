import { faL } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useAuth } from "./AuthContext";

const url = import.meta.env.VITE_BACKEND_HOST + '/api/v1/tags'

const TagForm = (props) => {
    const { token, isAuthenticated } = useAuth();
    const [modal, setModal] = useState(false)
    const [newTagModal, setNewTagModal] = useState(false)
    const [newTag, setNewTag] = useState("")




    const toggleModal = () => {
        setModal(!modal)
    }






    const [tags, setTags] = useState([]) // [{id, name}]

    useEffect(() => {

        async function fetchData() {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
            })

            const res = await response.json()
            if (res.result === "Success") {
                setTags(res.data)
            }
        }
        fetchData()


    }, [tags])





    const addTag = async (event) => {
        event.preventDefault()

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                name: newTag,
            })
        })
        const res = await response.json()
        if (res.result === "Fail") {
            console.log(res)
        }
        setNewTag("")
    }

    return <>
        <button className="text-sm bg-gray-500 hover:bg-gray-400 transition text-white px-4 py-2 rounded-xl" type="button" onClick={toggleModal}>＋ 標籤</button>
        {modal &&

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div onClick={toggleModal} className=" absolute w-full h-full bg-gray-900 opacity-50"></div>

                <div className=" relative bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <button
                        className="text-3xl text-gray-500 px-2 py-1 right-0 absolute"
                        onClick={toggleModal}
                    >
                        &#10005;
                    </button>



                    <div className=" py-4 text-left px-6">
                        {/* Modal 內容 */}
                        <div className="mb-4">
                            <h1 className="py-2">加入標籤...</h1>
                            {tags.map((e) => (
                                <button
                                    key={e.id}
                                    onClick={() => props.handleTagClick(e.id)}
                                    className={
                                        "my-1 mr-1 px-3 py-1 rounded-full text-white " +
                                        (props.selectedTags.has(e.id)
                                            ? 'bg-stone-600'
                                            : 'bg-stone-300')
                                    }
                                >
                                    {e.name}
                                </button>
                            ))}
                        </div>


                    </div>
                    {!newTagModal && <button type="button" className="w-full  py-2 text-center  hover:bg-gray-300" onClick={() => { setNewTagModal(!newTagModal) }}>＋ 新增標籤</button>}
                    {newTagModal && <form className="px-6 py-4" onSubmit={addTag}>
                        <input className="w-10/12 focus:outline-none" type="text" value={newTag} placeholder="標籤名稱" onChange={(e) => { setNewTag(e.target.value) }} />
                        <button type="submit" className="w-2/12 text-blue-600 hover:bg-blue-100 rounded px-4 py-2">新增</button>
                    </form>}

                </div>
            </div >


        }
    </>
}

export default TagForm