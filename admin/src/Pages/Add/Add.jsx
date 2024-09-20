import React, { useEffect, useState } from 'react'
import './Add.css'
import axios from "axios"
import { assets } from '../../assets/admin_assets/assets'
import { toast } from 'react-toastify'
import { food_list } from '../../../../frontend/src/assets/frontend_assets/assets'

const Add = ({url}) => {
  const [image, setImage] = useState(false)

  const [data, setData] = useState({
    name: "",
    description: '',
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({ ...data, [name]: value }))
  }



  const onSubmithandler = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", Number(data.price))
    formData.append("category", data.category)
    formData.append("image", image)
    const response = await axios.post(`${url}/api/food/add`, formData)
    if (response.data.success) {
      setData({
        name: "",
        description: '',
        price: "",
        category: "Salad",

      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  }


  //   useEffect(()=>{
  // console.log(data);

  //   },[data])
  return (
    <div className='add'>

      <form className='flex-col' onSubmit={onSubmithandler}>

        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type hee' className="" />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} type="text" name='description' rows='6' placeholder='Write content hee' />
        </div>

        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" id="">
              <option value="salad">Salad</option>
              <option value="Rollos">Rollos</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$2' />
          </div>

        </div>
        <button className="add-btn" type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Add
