import { useContext, useEffect } from 'react'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../components/context/StoreContext';

const Verify = () => {
  
    const [searchParams] = useSearchParams();
    const success = searchParams.get("success")
    const orderId = searchParams.get("orderId")
    console.log(success,orderId);
    const navigate = useNavigate();
    const {url} = useContext(StoreContext);


    // should be made using webhooks
    const verifyPayment = async ()=>{
        try {
            
            const response  = await axios.post(url+"/api/order/verify",{success,orderId});
            if(response.data.success)
                {
                    navigate('/myorders')
                }
                else{
                    navigate('/')
                }
            }
            catch(error)
            {
                console.log(error);
                navigate('/');
            } 
    }
    useEffect(() => {
        verifyPayment();
    }, []);
    
    return (
    <>  
        <div className='verify'>
            <div className='spinner'>
            </div>
        </div>
    </>
  )
}

export default Verify