import React from 'react'
export const options = (list) =>
  list.map((k) => {
    return {
      value: k._id,
      label: <span className="d-flex">{`${k.name} - ${k.parent_category.name}`}</span>,
    }
  })
export const find = (items, id) => items.find((k) => k._id === id)
