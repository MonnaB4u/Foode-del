import React from 'react'
import './ExploeMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

function ExploeMenu({category,setCategory}) {
    return (
        <div>
            <div className="explore-menu" id='explore-menu'>
                <h1>Explore our menu</h1>
                <p className='explore-menu-text'>Choose from a diverse menu featurin a delectable array of
                    dishes crafted with the finest ingredients and culinary experties, our mission is to
                    satisfy your craving and elevate your dining experience one delicious at a time.</p>
                <div className="explore-menu-list">
                    {
                        menu_list.map((item, index) => {
                            return (
                                <div onClick={()=>setCategory(prev=> prev===item.menu_name?"All":item.menu_name)} className="explore-menu-list-item" key={index} >
                                    <img  className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                                    <p>{item.menu_name}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <hr/>
            </div>
        </div>
    )
}

export default ExploeMenu
