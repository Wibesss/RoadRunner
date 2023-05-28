import React from 'react'

const DispecerPrihvaceneTureFavorizacijeListItem = ({item}) => {
  return (
    <tr className="bg-white border-b">
         <td className="p-4 whitespace-nowrap">
            {item.email}
          </td>
          <td className=" p-4 whitespace-nowrap">
            {item.korisnickoIme}
          </td>
    </tr>
  )
}

export default DispecerPrihvaceneTureFavorizacijeListItem
