import Image from "next/image"

function EmployeeNameCard({ name, position, profile_url }) {
    return (
        <div className="py-4 px-6 w-fit flex items-center gap-2 bg-white rounded-xl space-y-2">
            <div className="relative w-10 h-10 overflow-hidden bg-red-100 rounded-full mob:w-8 mob:h-8">
                {!profile_url ? <svg className="absolute w-12 h-12 text-red-400 -left-1 mob:h-10 mob:w-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg> : <Image src={profile_url} height="48" width="48" alt="profile-icon" />}
            </div>
            <div className="text-center space-y-2 sm:text-left w-fit">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold mob:text-base">{name}</p>
                    <p className="text-slate-500 font-medium">{position}</p>
                </div>
            </div>
        </div>
    )
}

export default EmployeeNameCard
