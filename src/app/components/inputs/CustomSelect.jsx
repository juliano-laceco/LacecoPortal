import React from 'react'
import Select from 'react-select'

function CustomSelect({ label, options, onChange, defaultValue, responsiveLabel, error ,className }) {
  const labelStyle = responsiveLabel ? 'hidden md:block' : '';
  return (
    <div className={className}>
      <label className={'pr-3 md:my-1 block' + labelStyle}>{label}</label>
      <Select options={options} defaultValue={defaultValue} onChange={onChange}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: '9px',
            border: 'litegray',
            padding: '0.3ex'
          }),
        }} />
      <div className='text-[var(--error-color)] text-[1.5ex]  ml-1 '>{error}</div>

    </div>
  )
}

export default CustomSelect