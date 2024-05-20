"use client"

import Button from './Button'
import Input from './Input'
import { toast } from 'react-toastify'

function CustomControlsPage() {

  const notify = () => toast("Hello coders it was easy!");

  return (
    <>
      <div className="flex flex-col gap-3">

        <div>
          <p>PRIMARY</p>
          <div className="flex gap-5">
            <Button name="small" variant="primary" size="small" onClick={notify} />
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
            <Button name="small" variant="primary" size="small" />
            <Button name="medium" variant="primary" size="medium" />
            <Button name="large" variant="primary" size="large" />
          </div>
        </div>

        <div>
          <p>INPUT TEXT</p>
          <div className="flex flex-col gap-5">
            <Input type="text" label="Regular" placeholder="Placeholder value" />
            <Input type="text" label="Disabled" placeholder="Placeholder value" disabled />
            <Input type="number" min="1" max="10" label="Number" placeholder="Placeholder value" />
            <Input type="number" min="1" max="10" label="With Icon" placeholder="Placeholder value" />
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


      </div >
    </>
  )
}

export default CustomControlsPage
