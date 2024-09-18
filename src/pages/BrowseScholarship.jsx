import React from 'react'

import CardBrowseScholarship from '../features/browesscolarship/CardBrowseScholarship'
import HeroBrowseScholarship from "../features/browesscolarship/HeroBrowseScholarship";

function BrowseScholarship() {
  return (<>
     <div className='bg-gray-50'>

    <HeroBrowseScholarship/>
    <CardBrowseScholarship/>
     </div>
           </>
    
  )
}

export default BrowseScholarship

