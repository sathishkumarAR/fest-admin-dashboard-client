import { Checkbox, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { useState } from 'react';
import { addProduct, uploadProductImage } from '../redux/apiCalls';


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

const AddProduct = () => {


    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [image, setImage] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [mrp, setMrp] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [productStatus, setProductStatus] = useState("active");
    const [stockQuantity, setStockQuantity] = useState("");
    const [description, setDescription] = useState("");
    
    const [error, setError] = useState({});
    

    const handleStatusChange=(newStatus)=>{
        setProductStatus(newStatus)
    }
    const handleColors =(e)=>{
        const value= e.target.value;

        setSelectedColors(
            typeof value==='string'? value.split(","):value
        )

    }
    const handleSizes =(e)=>{
        const value= e.target.value;

        setSelectedSizes(
            typeof value==='string'? value.split(","):value
        )

    }
    const handleCategories =(e)=>{
        const value= e.target.value;

        setSelectedCategories(
            typeof value==='string'? value.split(","):value
        )
    }

    const handleChange_numWithDecimal=(e)=>{
        const re=/^[0-9]+\.?[0-9]*$/;
        const value= e.target.value;

        if(value==='' || re.test(value)){
            if(e.target.id==="selling-price") 
                setSellingPrice(value)
            else if(e.target.id==='mrp')
                setMrp(value)

        }

    }

    const handleChange_num=(e)=>{
        const re= /^[0-9]+$/;

        if(e.target.value==='' || (re.test(e.target.value)) ){
            if(e.target.id==='stock')
                setStockQuantity(e.target.value)
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
    const handleAddProduct=async()=>{

        const imgURL= await uploadImage(image);

        if(!imgURL){
            return setError(prev=>({...prev,img:"Invalid Image"}))
        }
        else{
            setError(prev=>({...prev,img:null}))
        }
        const product={
                title,
                subtitle,
                img:imgURL,
                desc:description,
                categories:selectedCategories.map(item=>item.toLowerCase()),
                colors:selectedColors.length>0 ? selectedColors:undefined,
                sizes:selectedSizes.length>0 ? selectedSizes:undefined,
                MRP:mrp,
                sellingPrice,
                stock:stockQuantity,
                status:productStatus
            }
        
        const res= await addProduct(product);

        if(res.error){
            console.log("Error occured")
        }

    }

    const uploadImage=async(img)=>{

        const res= await uploadProductImage(img);
        if(!res.error)
            return res
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
    <div className='addProduct-container'>
        <h3 className="addProduct-title">
            New Product
        </h3>

        <div className="addProduct-contentContainer">

            <div className="addProduct-contentTopContainer">

                <div className="addProduct-imgContainer">

                    <label htmlFor="fileUpload">
                        <img 
                            src={image?image:"https://res.cloudinary.com/wings05/image/upload/v1625411692/44884218_345707102882519_2446069589734326272_n_u82kmh.jpg" }
                            alt="" 
                            className="addProductImg" 
                        />
                        <input type="file" id="fileUpload" className="addProductImgInput" onChange={handleImage}/>
                    </label>

                    <span className="addProductImg-sub">
                        Remove Picture
                    </span>

                </div>

                <div className="addProduct-fieldsContainer">
                <div className="addProductRight-box">
                        <span className="addProductRightHeading">
                            Product Information
                        </span>
                        <div className="addProductRightInputContainer">
                            <TextField 
                                className='addProductInputField'
                                id="product-title" 
                                label="Product Title *" 
                                variant="filled"
                                value={title}
                                size="small"
                                onChange={(e)=>setTitle(e.target.value)}
                                fullWidth
                            />
                            
                            <div className="addProductRightSplitInput">

                                <TextField 
                                    className='addProductInputField ml20px'
                                    id="mrp" 
                                    label="Product Subtitle *" 
                                    variant="filled"
                                    value={subtitle}
                                    onChange={(e)=>setSubtitle(e.target.value)}
                                    size="small"
                                    style={{width:"45%"}}
                                />
                                
                                <FormControl 
                                    className='userInputField' 
                                    variant="filled" 
                                    size="small"
                                    style={{width:"45%"}}
                                >

                                    <InputLabel id="categories-label">Categories *</InputLabel>
                                    <Select
                                        labelId="categories-label"
                                        id="categories"
                                        multiple
                                        value={selectedCategories}
                                        onChange={handleCategories}
                                        renderValue={(selected)=>selected.join(", ")}
                                        MenuProps={MenuProps}
                                    >   
                                        {
                                            categories.map((item)=>(
                                                <MenuItem key={item} value={item}>
                                                    <Checkbox checked={selectedCategories.indexOf(item)>-1} />
                                                    <ListItemText primary={item} />
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                            
                            </div>


                            <div className="addProductRightSplitInput">

                                <TextField 
                                    className='addProductInputField'
                                    id="selling-price" 
                                    label="Selling Price (₹) *" 
                                    variant="filled"
                                    value={sellingPrice}
                                    onChange={handleChange_numWithDecimal}
                                    size="small"
                                    color='primary'
                                    style={{width:"45%"}}
                                />
                                <TextField 
                                    className='addProductInputField ml20px'
                                    id="mrp" 
                                    label="MRP (₹) *" 
                                    variant="filled"
                                    value={mrp}
                                    onChange={handleChange_numWithDecimal}
                                    size="small"
                                    style={{width:"45%"}}
                                />

                            </div>


                            <div className="addProductRightSplitInput">

                                
                                <FormControl 
                                    className='userInputField' 
                                    variant="filled" 
                                    size="small"
                                    style={{width:"45%"}}
                                >

                                    <InputLabel id="colors-label">Colors</InputLabel>
                                    <Select
                                        labelId="colors-label"
                                        id="colors"
                                        multiple
                                        value={selectedColors}
                                        onChange={handleColors}
                                        renderValue={(selected)=>selected.join(", ")}
                                        MenuProps={MenuProps}
                                    >   
                                        {
                                            colors.map((item)=>(
                                                <MenuItem key={item} value={item}>
                                                    <Checkbox checked={selectedColors.indexOf(item)>-1} />
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
                                    style={{width:"45%"}}
                                >

                                    <InputLabel id="sizes-label">Sizes</InputLabel>
                                    <Select
                                        labelId="sizes-label"
                                        id="sizes"
                                        multiple
                                        value={selectedSizes}
                                        onChange={handleSizes}
                                        renderValue={(selected)=>selected.join(", ")}
                                        MenuProps={MenuProps}
                                    >   
                                        {
                                            sizes.map((item)=>(
                                                <MenuItem key={item} value={item}>
                                                    <Checkbox checked={selectedSizes.indexOf(item)>-1} />
                                                    <ListItemText primary={item} />
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>

                            
                            </div>
                            <div className="addProductRightSplitInput">

                                <FormControl 
                                    className='userInputField' 
                                    variant="filled" 
                                    size="small"
                                    style={{width:"45%"}}
                                >

                                    <InputLabel id="productStatus-label">Product Status *</InputLabel>
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
                                    className='addProductInputField ml20px'
                                    id="stock" 
                                    label="Stock *" 
                                    variant="filled"
                                    onChange={handleChange_num}
                                    value={stockQuantity}
                                    size="small"
                                    style={{width:"45%"}}
                                />

                            </div>

                            <TextField 
                                className='addProductInputField'
                                id="outlined-basic" 
                                label="Product Description *" 
                                variant="filled" 
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                size="small"
                                fullWidth
                                multiline
                                rows={4}
                            />
                            

                        </div>
                    </div>

                </div>

            </div>

            <div className="addProduct-contentBottomContainer">
                <button className="addProductBtn" onClick={handleAddProduct}>
                    Add Product
                </button>
            </div>


        </div>


    </div>
  )
}

export default AddProduct