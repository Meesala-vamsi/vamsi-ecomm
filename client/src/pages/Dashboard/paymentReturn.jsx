import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { capturePayment } from '@/store/orderSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const PaymentReturnPage = () => {

  const dispatch = useDispatch()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
  useEffect(()=>{
    if(payerId && paymentId){
      dispatch(capturePayment({ payerId, paymentId, orderId })).then(
        (response) => {
          if(response?.payload?.status==="success"){
            sessionStorage.removeItem("currentOrderId");
            window.location.href="/dashboard/payment-success";
          }
        }
      );
    }
  },[paymentId,payerId,orderId])
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Payment Processing.... Please wait a moment.
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default PaymentReturnPage