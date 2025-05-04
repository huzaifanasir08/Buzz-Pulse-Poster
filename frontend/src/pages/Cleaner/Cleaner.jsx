import React from 'react'
import { useSection } from '../../Context';


export default function Cleaner() {
    const { setSection } = useSection();
      setSection('Cleaner')
  return (
    <div>Cleaner</div>
  )
}
