'use client'
import { useRouter } from "next/navigation"
import { FaTrash } from "react-icons/fa"

export default function DeleteButton({ id }: any) {
    const router = useRouter()

    async function handleClick() {
        try {
            await fetch(`/api/Reviews/${id}`, {
                method: 'DELETE'
            })
            router.refresh()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <button className="bg-red-600 text-white p-2 rounded-md" onClick={handleClick}>
            <FaTrash />
        </button>
    )
}