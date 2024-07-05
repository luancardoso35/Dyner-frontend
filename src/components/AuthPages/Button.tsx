type ButtonProps = {
    children: React.ReactNode,
    errors: boolean
}

export default function Button({ children, errors } : ButtonProps) {
    return (
        <button className={`${errors ? 'mt-4' : 'mt-8 lg:mt-16'} text-gray-200 font-bold before:ease block m-auto bg-[#fe3165] hover:bg-[#fe235a] transition duration-500 border-[#b4b4b4] rounded-lg border-2 xs:text-xl xxs:text-base p-4 xs:p-2 xxs:p-1 w-full`}>
            {children}
        </button>
    )
}