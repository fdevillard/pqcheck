import React from "react"
import { useSearchParams } from "react-router-dom"

export const Generate: React.FC<{}> = () => {
    const [params] = useSearchParams()
    const clean = params.get("info") || "no info"
    return <p>Hello, params: {clean}</p>
}