import { FC } from "react"
import { CheckboxChecked, CheckboxUnchecked } from "@/components/global/icons"

type CheckboxProps = {
 checked: boolean
 onChange: (checked: boolean) => void
 id?: string
}

const Checkbox: FC<CheckboxProps> = ({ checked, onChange, id }) => {
 const handleToggle = () => onChange(!checked)

 return (
  <label htmlFor={id}>
   <input
    id={id}
    type="checkbox"
    checked={checked}
    onChange={handleToggle}
    className="sr-only"
   />
   {checked ? (
    <CheckboxChecked className="text-slate-700" />
   ) : (
    <CheckboxUnchecked className="text-slate-700" />
   )}
  </label>
 )
}

export default Checkbox