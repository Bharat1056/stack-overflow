import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { UseFormReturn } from "react-hook-form"

type Props = {
    label: string;
    placeholder: string;
    type: string;
    form: UseFormReturn;
}

const Field = ({label, placeholder, type, form}: Props) => {
  return (
    <FormField
    control={form.control}
    name="password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input placeholder={placeholder} {...field} type={type}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default Field