import axios from "axios"
import { loginFailure, loginStart, loginSuccess } from "./userSlice"

const getToken=()=>{
    if(localStorage.getItem("persist:root")){
        const token= JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token
        return token;
    }
}

export const login=async(dispatch,user)=>{

    dispatch(loginStart())

    try {
        const res = await axios.post("/api/auth/login", user)
        dispatch(loginSuccess(res.data))

    } catch (error) {
        dispatch(loginFailure())
    }
}

export const fetchUsers=async()=>{
    const token = getToken();
    try {
        const res = await axios.get("/api/users?new=true&count=5",{
            headers:{
                "Authorization":"Bearer "+token
            }
        })
        return res.data

    } catch (error) {
        return {error};
    }
}

export const fetchUser=async(userId)=>{
    const token= getToken();
    try {
        const res= await axios.get("/api/users/find/"+userId,{
            headers:{
                "Authorization":"Bearer "+token
            }
        });
        return res.data;
    } catch (error) {
        return {error};
    }

}
export const updateUser=async(userId,user)=>{
    const token= getToken();
    try {
        const res= await axios.put("/api/users/"+userId,user,{
            headers:{
                "Authorization":"Bearer "+token
            }
        });
        return res.data;
    } catch (error) {
        return {error}
    }
}

export const fetchOrders=async()=>{
    const token = getToken();

    try {
        const res= await axios.get("/api/orders?new=true&count=5&include=amount,status,createdAt,user",{
            headers:{"Authorization":"Bearer "+token}
        })

        return res.data;
    } catch (error) {
        return {error};
    }
}

export const fetchUserStats=async()=>{
    
    try {
        const res= await axios.get("/api/users/stats",{
            headers:{"Authorization":"Bearer "+getToken()}
        })
        return res.data
    } catch (error) {
        return {error}
    }
}

export const fetchMonthlyOrderRevenue=async()=>{
    try {
        const res= await axios.get("/api/orders/stats/monthlyrevenue",{
            headers:{"Authorization":"Bearer "+getToken()}
        })

        return res.data.data;

    } catch (error) {
        return {error}
    }
}

export const fetchAllProducts=async()=>{
    try {
        console.log("test")
        const res= await axios.get("/api/products",{
            headers:{"Authorization":"Bearer "+getToken()}
        })
        return res.data
    } catch (error) {
        return {error}
    }
}

export const fetchProduct=async(id)=>{
    try {
        const res= await axios.get("/api/products/find/"+id);
        return res.data
    } catch (error) {
        return {error}
    }
}
export const addProduct=async(product)=>{
    try {
        const res = await axios.post("/api/products",product, {
            headers:{"Authorization":"Bearer "+getToken()}
        })

        return res.data

    } catch (error) {
        return {error};
    }
}
export const updateProduct=async(id,product)=>{
    try {
        const res = await axios.put("/api/products/"+id,product, {
            headers:{"Authorization":"Bearer "+getToken()}
        })

        return res.data

    } catch (error) {
        return {error};
    }
}

export const deleteProduct=async(id)=>{
    try {
        const res=await axios.delete("/api/products/"+id,{
            headers:{"Authorization":"Bearer "+getToken()}
        })
        return res.data
    } catch (error) {
        return {error}
    }
}

export const uploadProductImage=async(image)=>{
    try {
        const res= await axios.post("/api/products/image",{image},{
            headers:{"Authorization":"Bearer "+getToken()}
        })

        return res.data;

    } catch (error) {
        return {error}
    }
}
