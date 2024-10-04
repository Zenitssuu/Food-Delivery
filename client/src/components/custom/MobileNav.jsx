import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '../ui/sheet.jsx'
import { Menu } from 'lucide-react'
import { Separator } from '@radix-ui/react-separator'
import { Button } from '../ui/button.jsx'

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className='text-orange-500'/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    <span>
                        Welcome is Easy Eats
                    </span>
                </SheetTitle>
                <Separator/>
                <SheetDescription className="flex">
                    <Button className="flex font-bold bg-orange-500">Log in</Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav
