"use server"

import Dropdown from "./Dropdown"
import { getDisciplines } from "@/utilities/db-utils"

async function DropdownLoader(props) {

    const options = await getDisciplines()

    return (
        <Dropdown {...props} options={options} />
    )
}

export default DropdownLoader
