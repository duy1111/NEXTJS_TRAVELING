'use client'
import useCountries from '@/app/hooks/useCountryModal'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export type CountrySelectValue  = {
    flag:string,
    label:string,
    latlng: number[],
    region: string,
    value: string
}
interface CountrySelectProps {
    value?: CountrySelectValue 
    onChange: (value: CountrySelectValue) => void
}
const CountrySelect:React.FC<CountrySelectProps> = ({value, onChange}) => {
    
    const {getAll} = useCountries();
    console.log('check all get',getAll())
    const [dataCountry, setDataCountry] = useState<any>()
    useEffect(() => {
        setDataCountry(getAll())
    },[getAll])
  return (
    <div>
        <Select
            placeholder="Anywhere"
            isClearable
            options={dataCountry ? dataCountry : ''}
            value={value}
            onChange={(value) =>  onChange(value as CountrySelectValue )}
            formatOptionLabel={(option: any) => (
                <div className='flex flex-row items-center gap-3' >
                    <div>{option.flag}</div>
                    <div>{option.label}, <span className='text-neutral-500 ml-1' >{option.region}</span></div>
                </div>
            )}
            classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'

            }}

            theme={(theme) => ({
                ...theme,
                borderRadius:6,
                colors:{
                    ...theme.colors,
                    primary:'black',
                    primary25:'#ffe4e6'
                }
            })}
        />
    </div>
  )
}

export default CountrySelect