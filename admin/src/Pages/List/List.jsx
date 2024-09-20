
import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List=({url})=> {
  const [list, setList] = useState({})

  // const fetchList = async () => {
  //   const responce = await axios.get('http://localhost:4000/api/food/list');
  //   if (responce.data.success) {
  //     setList(responce.data.data)
  //   } else {
  //     toast.error("Error")
  //   }
  // }
 
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };
  useEffect(() => {
    fetchList()
  }, [])


  const removeFood = async (foodId) => {
    const responce = await axios.post(`${url}/api/food/remove`, { id: foodId })
    await fetchList()
    if (responce.data.success) {
      toast.success(responce.data.message)
    } else {
      toast.error("Error")
    }
  }

  return (
    <div className='list add flex-col'>
      <p>All food List</p>
      <div className="list-table-format title">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.length > 0 ? (
        <ul>
          {list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          ))}
        </ul>
      ) : (
        <p>Data is fetching ......</p>
      )}
    </div>
  )
}

export default List
