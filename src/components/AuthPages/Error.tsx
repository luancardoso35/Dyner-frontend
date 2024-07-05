import { ReactNode } from "react"

type ErrorProps = {
    children: React.ReactNode
}

export default function Error({ children } : ErrorProps) {
    return (
        <p className="text-rose-500 font-bold w-full text-center mt-3 lg:mt-8">
            {children}   
        </p>
    )
}