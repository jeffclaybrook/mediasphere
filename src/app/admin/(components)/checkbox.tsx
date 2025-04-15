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
  <label htmlFor={id} className="text-slate-700 cursor-pointer">
   <input
    id={id}
    type="checkbox"
    checked={checked}
    onChange={handleToggle}
    className="sr-only"
   />
   {checked ? (
    <CheckboxChecked />
   ) : (
    <CheckboxUnchecked />
   )}
  </label>
 )
}

export default Checkbox