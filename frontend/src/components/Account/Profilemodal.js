import React from 'react'
import SmallButton from "../UI/FormControl/Button/SmallButton";

export default function Profilemodal({ open, children, onClose}) {
    if(!open) return null

  return (
    <div>
    <SmallButton
                onClick={onClose}
                label="Cancel"
                type="primary"
                size="xs"></SmallButton>
      {children}
    </div>
  )
}
