import { test } from "@/utilities/db/prisma-utils"

async function HRPage() {

  const count = await test()

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-section-title">This is the HR Page</h1>
      {count}
    </div>

  )
}


export default HRPage
