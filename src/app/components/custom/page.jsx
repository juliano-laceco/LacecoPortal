import React from 'react'
import Button from '../buttons/Button'
import { Google } from '@mui/icons-material'

function page() {
  return (
    <>
      <div className="flex flex-col gap-3" >
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
          <div className="flex gap-5">
            <Button name="small" variant="primary" size="small" Icon={Google} />
            <Button name="medium" variant="primary" size="medium" Icon={Google} />
            <Button name="large" variant="primary" size="large" Icon={Google} />
          </div>
        </div>
      </div >
    </>
  )
}

export default page
