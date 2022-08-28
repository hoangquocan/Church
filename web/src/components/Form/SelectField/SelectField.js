import { Select } from '@mantine/core'

import './SelectField.scss'

const SelectField = ({ data, value, onChange }) => {
  return (
   <div className='form-select'>
      <Select
        searchable
        value={value}
        onChange={onChange}
        nothingFound="No options! Please check again"
        maxDropdownHeight={260}
        data={data}
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        styles={(theme) => ({
          item: {
            // applies styles to selected item
            '&[data-selected]': {
              '&, &:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.teal[9]
                    : theme.colors.teal[1],
                color:
                  theme.colorScheme === 'dark'
                    ? theme.white
                    : theme.colors.teal[9],
              },
            },

            // applies styles to hovered item (with mouse or keyboard)
            '&[data-hovered]': {},
          },
        })}
      />
   </div>
  )
}

export default SelectField
