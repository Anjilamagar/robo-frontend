import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button, Card } from 'flowbite-react'
import React from 'react'

const AddProduct = () => {
  return (
    <div className='pl-[350px]n py-10 pr-20 mx-auto px-4'>
        <Card className='w-full my-20'>
            <CardHeader>
                <CardTitle className='text-center'> Add Product</CardTitle>

            </CardHeader>
            
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="grid gap-2">
            <Label>Product Name</Label>
            <Input
              type="text"
              name="productName"
              placeholder="Ex-Iphone"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Price</Label>
            <Input
              type="number"
              name="productPrice"
              placeholder="..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Brand</Label>
              <Input
                type="text"
                name="brand"
                placeholder="Ex-apple"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Input
                type="text"
                name="category"
                placeholder="Ex-mobile"
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label>Description</Label>
            </div>
            <textarea />
          </div>
          <div className='text-center'>
            <button className='rounded-2xl'>ADD PRODUCT</button>
          </div>
        </div>
      </CardContent>

             

        </Card>
      
    </div>
  )
}

export default AddProduct
