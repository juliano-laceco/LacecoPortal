import React from 'react'
import Button from './Button'
import { Google } from '@mui/icons-material'
import Input from './Input'
import DropdownLoader from './DropdownLoader'
import { getClients } from '@/utilities/db-utils'


async function CustomControlsPage() {

  const { data } = await getClients();

  return (
    <>
      <div className="flex flex-col gap-3">

        <div>
          <p>PRIMARY</p>
          <div className="flex gap-5">
            <Button name="small" variant="primary" size="small" />
            <Button name="medium" variant="primary" size="medium" />
            <Button name="large" variant="primary" size="large" />
          </div>
        </div>

        <div>
          <p>PRIMARY LOADNG</p>
          <div className="flex gap-5">
            <Button name="small" variant="primary" size="small" loading />
            <Button name="medium" variant="primary" size="medium" loading />
            <Button name="large" variant="primary" size="large" loading />
          </div>
        </div>

        <div>
          <p>SECONDARY </p>
          <div className="flex gap-5">
            <Button name="small" variant="secondary" size="small" />
            <Button name="medium" variant="secondary" size="medium" />
            <Button name="large" variant="secondary" size="large" />
          </div>
        </div>

        <div>
          <p>SECONDARY LOADING </p>
          <div className="flex gap-5">
            <Button name="small" variant="secondary" size="small" loading />
            <Button name="medium" variant="secondary" size="medium" loading />
            <Button name="large" variant="secondary" size="large" loading />
          </div>
        </div>

        <div>
          <p>PRIMARY ICON</p>
          <div className="flex flex-wrap gap-5">
            <Button name="small" variant="primary" size="small" Icon={Google} />
            <Button name="medium" variant="primary" size="medium" Icon={Google} />
            <Button name="large" variant="primary" size="large" Icon={Google} />
          </div>
        </div>

        <div>
          <p>INPUT TEXT</p>
          <div className="flex flex-col gap-5">
            <Input type="text" label="Regular" placeholder="Placeholder value" />
            <Input type="text" label="Disabled" placeholder="Placeholder value" disabled />
            <Input type="number" min="1" max="10" label="Number" placeholder="Placeholder value" />
            <Input type="number" min="1" max="10" label="With Icon" placeholder="Placeholder value" Icon={Google} />
          </div>
        </div>

        <div>
          <p>DATE PICKER</p>
          <div className="flex flex-col gap-5">
            <Input type="date" label="Pick a Date" />
            <Input type="date" label="Pick a Date" fit />
            <Input type="date" label="Pick a Date" fit disabled />
          </div>
        </div>

        <div>
          <p>SELECT</p>
          <div className="flex flex-col gap-5">
            <DropdownLoader options={data} isSearchable fetch />
            <DropdownLoader options={[{ value: "Juliano", label: "Juliano" }]} isSearchable fetch isDisabled />
          </div>
        </div>

      </div >
    </>
  )
}

export default CustomControlsPage
