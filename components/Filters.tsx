import { useEffect, useState } from 'react'
import { supabase } from 'lib/supabaseClient'
import { definitions } from 'lib/definitions'

const jobTypes = [
  { key: 'full_time', value: 'Full Time' },
  { key: 'part_time', value: 'Part Time' },
  { key: 'contract', value: 'Contract' },
]

export default function Filters() {
  const [countries, setCountries] = useState<definitions['countries'][]>([])

  useEffect(() => {
    loadPage()
  }, [])

  const loadPage = async () => {
    const { data }: { data: any } = await supabase
      .from<definitions['countries']>('countries')
      .select('id, name')
      .order('name')
    setCountries(data)
  }

  return (
    <div className="flex flex-col bg-white shadow overflow-hidden sm:rounded-md divide-y divide-gray-200">
      <div className="p-4">
        <h5 className="text-md font-bold pb-2">Type</h5>
        <fieldset className="space-y-2">
          {jobTypes.map(({ key, value }) => (
            <div key={key} className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id={key}
                  aria-describedby={value}
                  name={value}
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded cursor-pointer"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={key} className="font-medium text-gray-700 cursor-pointer">
                  {value}
                </label>
              </div>
            </div>
          ))}
        </fieldset>
      </div>

      <div className="p-4">
        <h5 className="text-md font-bold pb-2">Countries</h5>
        <fieldset>
          <select name="countries" multiple className="border rounded ">
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </fieldset>
      </div>
    </div>
  )
}
