import { FormField, FormItem } from '@/components/ui/form';
import React from 'react'
import { ComboBox } from '../../ComboxBox';
import { cities } from '@/constants';
import { MdLocationPin } from 'react-icons/md';

export default function SelectDestination({form}:any) {
  return (
    <FormField
      control={form.control}
      name="source"
      render={({ field }) => (
        <FormItem className="w-full">
          <ComboBox
            options={cities}
            name="Destination"
            icon={<MdLocationPin />}
            className="w-[400px]"
          />
        </FormItem>
      )}
    />
  );
}
