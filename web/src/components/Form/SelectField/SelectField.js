import { Select } from '@mantine/core'

import './SelectField.scss'

const SelectField = ({ data, value, onChange, label, ...props }) => {
  return (
    <div className="form-select">
      <Select
        {...props}
        clearable
        searchable
        label={label}
        value={value}
        onChange={onChange}
        nothingFound="No options! Please check again"
        maxDropdownHeight={260}
        data={data}
        transition="pop-top-left"
        transitionDuration={500}
        transitionTimingFunction="ease"
        styles={(theme) => ({
          wrapper: {
            backgroundColor: 'white',
            borderRadius: 30,
            height: 40,
          },
          label: {
              fontSize: '1.1rem',
            },
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
          dropdown: {
            boxShadow:
              'rgba(0, 0, 0, 0.6) 0px 3px 6px, rgba(0, 0, 0, 0.6) 0px 3px 6px',
          },
        })}
      />
    </div>
  )
}

export default SelectField
