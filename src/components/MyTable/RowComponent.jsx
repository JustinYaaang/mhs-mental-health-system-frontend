import React from 'react'

export function RowComponent (props) {
  const { data, onClick } = props

  function handleClick () {
    onClick(data)
  }

  return (
    <tr onClick={handleClick}>
      <td data-title='Song'>"dadas"</td>
      <td data-title='Movie'>"dadas"</td>
      <td data-title='Year'>"dadas"</td>
    </tr>
  )
}
