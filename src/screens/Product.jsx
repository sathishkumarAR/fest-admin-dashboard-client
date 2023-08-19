import { AccountBalanceWalletOutlined, LocalMallOutlined, ThumbUpAltOutlined } from '@mui/icons-material'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Chart from '../components/Chart'
import { productData } from '../dummyData'
import { fetchProduct, updateProduct, uploadProductImage } from '../redux/apiCalls'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const toPascalCase=(text)=>(
    text.toLowerCase()
    .trim()
    .split(' ')
    .map(word => word[0]
    .toUpperCase()
    .concat(word.slice(1)))
    .join('')
)
const Product = () => {
    const [product,setProduct]= useState({})
    const [productStatus, setProductStatus] = useState("active");
    const {productId}= useParams();
    const [image, setImage] = useState();
    const [error, setError] = useState({});

    useEffect(()=>{
        const getProduct=async()=>{
            const data=await fetchProduct(productId);
            if(!data.error){
                data.categories=await data.categories.map(text=>toPascalCase(text));
                data.colors= await data.colors.map(text=>toPascalCase(text));
                setImage(data.img);
                setProduct(data);
            }
        }
        getProduct();
    },[productId])

    const handleStatusChange=(newStatus)=>{
        setProductStatus(newStatus)
    }
    const handleColors =(e)=>{
        const value= e.target.value;
        const selectedColors= typeof value==='string'? value.split(","):value;
        setProduct(prev=>({...prev,colors:selectedColors}));
    }
    const handleSizes =(e)=>{
        const value= e.target.value;
        const selectedSizes= typeof value==='string'? value.split(","):value;

        setProduct(prev=>({...prev,sizes:selectedSizes}));
    }

    const handleCategories =(e)=>{
        const value= e.target.value;
        const selectedCategories= typeof value==='string'? value.split(","):value;

        setProduct(prev=>({...prev,categories:selectedCategories}));
    }

    const handleChange_numWithDecimal=(e)=>{
        const re=/^[0-9]+\.?[0-9]*$/;
        const value= e.target.value;
        
        if(value==='' || re.test(value)){
            if(e.target.id==="selling-price")
                setProduct(prev=>({...prev,sellingPrice:value}))
            else if(e.target.id==='mrp')
                setProduct(prev=>({...prev,MRP:value}))
        }
    }

    const handleTextFieldChange=(e)=>{
        
        if(e.target.id==='product-desc-update')
            setProduct(prev=>({...prev,desc:e.target.value}))

        if(e.target.id==='product-subtitle-update')
            setProduct(prev=>({...prev,subtitle:e.target.value}))
    }

    const handleChange_num=(e)=>{
        const re= /^[0-9]+$/;
        console.log(e.target.value);
        if(e.target.value==='' || (re.test(e.target.value)) ){
            // console.log("stock");
            if(e.target.id==='stock')
                setProduct(prev=>({...prev,stock:e.target.value}))
        }

    }

    const handleImage=(e)=>{
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onloadend = function() {
                setImage(reader.result)
            }
            reader.readAsDataURL(file);
    }
    
    const uploadImage=async(img)=>{

        const res= await uploadProductImage(img);
        if(!res.error)
            return res
    }


    const handleUpdate=async()=>{
        const imgURL= await uploadImage(image);

        if(!imgURL){
            return setError(prev=>({...prev,img:"Invalid Image"}))
        }
        else{
            setError(prev=>({...prev,img:null}))
        }

        const res= await updateProduct(productId, product);

        if(res.error){
            console.log(res.error)
        }
        else{
            console.log(res)
        }


    }

    const colors = [
    'Black',
    'White',
    'Green',
    'Grey',
    'Blue',
    'Yellow',
    'Red',
    'Violet',
    'Orange',
    'Pink',
    ];

    const categories=[
        "Electronics",
        "Men",
        "Women",
        "Casuals",
        "Bags",
        "Groceries",
        "Shirts",
        "Pants",
        "Tshirts",
        "Jackets",
        "Caps",
        "Boys",
        "Girls",
        "Formals"
    ]
    const sizes= [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL"
    ]


  return (
    <>
    {
        product.title &&

        <div className='productScreen-container'>
        <div className="productTitleContainer">
            <h3 className="productScreenTitle">
                {product.title}
            </h3>
            <Link to="/addproduct">
                <button className="productNewBtn">
                    Add New Product
                </button>
            </Link>
        </div>

        <div className="productTopContainer">
            <div className="productTopLeftContainer">
                <Chart 
                    title="Sales Performance (last 3 months)"
                    data={productData}
                    Xaxis_dataKey="name"
                    Line_datakey="Sales"
                    className="product-chartContainer"
                />
            </div>
            <div className="productTopRightContainer">
                <span className="productMetricsHeading">Metrics</span>
                <div className="productMetrics">
                    <div className="productMetricsItem">
                        <div className="productMetricsItem-icon">
                            <LocalMallOutlined />
                        </div>
                        <div className="productMetricsItem-info">
                            <span className="productMetricsItem-title">
                                235
                            </span>
                            <span className="productMetricsItem-subtitle">
                                items sold
                            </span>

                        </div>
                    </div>
                    <div className="productMetricsItem">
                        <div className="productMetricsItem-icon  bgcIndigo">
                            <AccountBalanceWalletOutlined />
                        </div>
                        <div className="productMetricsItem-info">
                            <span className="productMetricsItem-title">
                            45,875
                            </span>
                            <span className="productMetricsItem-subtitle">
                            sales revenue (₹)
                            </span>

                        </div>
                    </div>
                    <div className="productMetricsItem">
                        <div className="productMetricsItem-icon bgcGreen">
                            <ThumbUpAltOutlined />
                        </div>
                        <div className="productMetricsItem-info">
                            <span className="productMetricsItem-title">
                                4.4
                            </span>
                            <span className="productMetricsItem-subtitle">
                                overall rating
                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="productBottomContainer">
            
            <h3 className="productBottomHeading">Update Product</h3>
            
            <div className="productUpdateContainer">
                <div className="productBottomLeft">
                    <TextField 
                        className='userInputField'
                        id="outlined-basic" 
                        label="Product Name" 
                        variant="filled"
                        defaultValue={product.title}
                        size="small"
                        color='primary'
                        disabled
                    />
                    
                    <TextField 
                        className='userInputField'
                        id="outlined-basic" 
                        label="Product ID" 
                        variant="filled"
                        defaultValue={product._id}
                        // value={product._id}
                        size="small"
                        color='primary'
                        disabled
                    />
                    
                    <TextField 
                        className='userInputField'
                        id="product-subtitle-update" 
                        label="Product Subtitle" 
                        variant="filled"
                        defaultValue={product?.subtitle}
                        onChange={handleTextFieldChange}
                        size="small"
                        color='primary'
                    />

                    <FormControl 
                        className='userInputField' 
                        variant="filled" 
                        size="small"
                        style={{width:"35.5%"}}
                    >

                        <InputLabel id="categories-label">Categories *</InputLabel>
                        <Select
                            labelId="categories-label"
                            id="categories"
                            multiple
                            value={product?.categories}
                            onChange={handleCategories}
                            renderValue={(selected)=>selected.join(", ")}
                            MenuProps={MenuProps}
                        >   
                            {
                                categories.map((item)=>(
                                    <MenuItem key={item} value={item}>
                                        <Checkbox checked={product?.categories.indexOf(item)>-1} />
                                        <ListItemText primary={item} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <TextField 
                        className='userInputField'
                        id="selling-price" 
                        label="Selling Price (₹)" 
                        variant="filled"
                        // defaultValue={product?.sellingPrice}
                        value={product?.sellingPrice}
                        onChange={handleChange_numWithDecimal}
                        size="small"
                        color='primary'
                    />
                    
                    <TextField 
                        className='userInputField'
                        id="mrp" 
                        label="MRP (₹)" 
                        variant="filled"
                        // defaultValue={product?.MRP}
                        value={product?.MRP}
                        onChange={handleChange_numWithDecimal}
                        size="small"
                        color='primary'
                    />

                    <FormControl 
                        className='userInputField' 
                        variant="filled" 
                        size="small"
                        style={{width:"35.5%"}}
                    >

                        <InputLabel id="colors-label">Colors</InputLabel>
                        <Select
                            labelId="colors-label"
                            id="colors"
                            multiple
                            value={product?.colors}
                            onChange={handleColors}
                            renderValue={(selected)=>selected.join(", ")}
                            MenuProps={MenuProps}
                        >   
                            {
                                colors.map((item)=>(
                                    <MenuItem key={item} value={item}>
                                        <Checkbox checked={product?.colors.indexOf(item)>-1} />
                                        <ListItemText primary={item} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <FormControl 
                        className='userInputField' 
                        variant="filled" 
                        size="small"
                        style={{width:"35.5%"}}
                    >

                        <InputLabel id="sizes-label">Sizes</InputLabel>
                        <Select
                            labelId="sizes-label"
                            id="sizes"
                            multiple
                            value={product?.sizes}
                            onChange={handleSizes}
                            renderValue={(selected)=>selected.join(", ")}
                            MenuProps={MenuProps}
                        >   
                            {
                                sizes.map((item)=>(
                                    <MenuItem key={item} value={item}>
                                        <Checkbox checked={product?.sizes.indexOf(item)>-1} />
                                        <ListItemText primary={item} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>


                    <FormControl 
                        className='userInputField' 
                        variant="filled" 
                        size="small"
                        style={{width:"35.5%"}}
                    >

                        <InputLabel id="productStatus-label">Product Status</InputLabel>
                        <Select
                            labelId="productStatus-label"
                            id="product-status"
                            value={productStatus}
                            onChange={(e)=>handleStatusChange(e.target.value)}
                        >
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField 
                        className='userInputField'
                        id="stock" 
                        variant="filled"
                        value={product?.stock}
                        onChange={handleChange_num}
                        label="Stock *"
                        size="small"
                        color='primary'
                    />
                    <TextField 
                        className='product-desc-update userInputField'
                        id="product-desc-update" 
                        label="Product Description *" 
                        variant="filled"
                        defaultValue={product?.desc} 
                        value={product?.desc}
                        onChange={handleTextFieldChange}
                        size="small"
                        multiline
                        rows={4}
                    />
                    
                </div>
                <div className="productBottomRight">
                    <label htmlFor="fileUpload" className="productUpdateImgContainer">
                        <img 
                            src={image} 
                            alt="" 
                            className="productUpdateImg" 
                        />
                        <input type="file" id="fileUpload" className="productUpdateImgInput" onChange={handleImage}/>
                    </label>
                </div>
            </div>

            <div className="productBottomButtonsContainer">
                <button className="productUpdateBtn" onClick={handleUpdate}>
                    Update
                </button>
                <button className="productDeleteBtn">
                    Delete
                </button>
            </div>
        </div>
    </div>
    }
    </>
    
  )
}

export default Product