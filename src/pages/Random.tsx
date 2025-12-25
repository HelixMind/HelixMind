import { myRandomTests } from '@/api/main'
import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

const Random = (props: Props) => {
  return (
    <div>
        Random
        <Button onClick={async (e) => {
            e.preventDefault();

            await myRandomTests();
        }}/>
    </div>
  )
}

export default Random