import React, { useEffect, useState } from 'react'
import {DataGrid} from "@mui/x-data-grid"
import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import {Link} from "react-router-dom"
import { deleteProduct, fetchAllProducts } from '../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const ProductsList = () => {
  
    const [products, setProducts] = useState([]);
    const dispatch= useDispatch();
    
    useEffect(()=>{
        const getProducts=async()=>{
            const data=await fetchAllProducts();
            if(!data.error){
                setProducts(data);
            }else if(data.error.response.status===401){
                dispatch(logout());
            }
        }
        getProducts();
    },[])
    
    const handleDelete=async(id)=>{
        const res=await deleteProduct(id);
        if(!res.error)
            setProducts(prev=>prev.filter(item=>item._id!==id))
    }

    const columns = [
        { field: '_id', headerName: 'ID', width: 210 },
        { 
            field: 'product', 
            headerName: 'Product', 
    
            width: 320,
            renderCell:(params)=>{
                return (
                    <div className="productListItem">
                        <img src={params.row.img} alt="" className="productListImg" />
                        {params.row.title}
                    </div>
                )
            }
        },
        { 
            field: 'stock', headerName: 'Stock', width: 70 },
        {
          field: 'price',
          headerName: 'Price',
          width: 70,
        },
        {
            field:"action",
            headerName:"Actions",
            renderCell:(params)=>{
                return(
                    <div className='productList-actions'>
                        <Link to={"/products/"+params.row._id}>
                            <div className='productListEdit-container'>
                                <EditOutlined fontSize='medium' className='productListEdit'/>
                            </div>
                        </Link>
    
                        <div className='productListDelete-container'>
                            <DeleteOutlined className='productListDelete' onClick={()=>handleDelete(params.row._id)} />
                        </div>
                    </div>
                )
            }
        }
      ];


  return (
    <div className='productsList'>
        <DataGrid
            rows={products}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            getRowId={(row)=>row._id}
        />
    </div>
  )
}

export default ProductsList