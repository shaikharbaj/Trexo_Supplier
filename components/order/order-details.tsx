"use client"
import { fetchOrderDetails } from '@/service/order.service';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import ErrorBlock from '../error-block';
import { useTranslations } from 'next-intl';

const OrderDetails = () => {
    const t = useTranslations("OrderPage");
    const [isPending, startTransition] = React.useTransition();
    const navigation = useRouter()
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order-number");
    const [orderDetails, setOrderDetails] = useState<any>({})
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        if (orderId) {
            fetchOrderData(orderId);
        }
    }, [orderId]);

    //Function to fetch order details
    const fetchOrderData = async (orderId: any) => {
        startTransition(async () => {
            try {
                const response = await fetchOrderDetails(orderId);
                if (response?.status !== true && response?.statusCode !== 200) {
                    toast.error(response?.message);
                    setIsError(true)
                    return
                }
                setOrderDetails(response?.data);
            } catch (error: any) {
                toast.error(error?.message);
            }
        })
    };

    const { order, user } = orderDetails;

    const calculateTotal = () => {
        const subtotal = order?.order_item?.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0);
        const shipping = 1000;
        const coupon = 2000;
        return subtotal + shipping - coupon;
    };

    const handleBack = () => {
        navigation.replace("/order");
    }

    if (isError) {
        return <ErrorBlock />
    }

    return (
        <>
            {!isPending ?
                <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-8 text-gray-500"># {order?.order_number}</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">Order Items</h2>
                                {order?.order_item?.map((item: any) => (
                                    <div key={item?.uuid} className="mb-6 p-6 border border-gray-200 rounded-lg shadow-sm">
                                        <h3 className="font-semibold text-gray-800 mb-2">{item?.product?.title}</h3>
                                        <table className="w-full text-sm text-gray-600">
                                            <tbody>
                                                <tr><td className="py-2 font-medium">Brand:</td><td>{item?.product.brand?.brand_name}</td></tr>
                                                <tr><td className="py-2 font-medium">Category:</td><td>{item.product?.category?.category_name}</td></tr>
                                                <tr><td className="py-2 font-medium">Quantity:</td><td>{item?.quantity}</td></tr>
                                                <tr><td className="py-2 font-medium">Price:</td><td>₹{item?.price.toLocaleString()}</td></tr>
                                                <tr><td className="py-2 font-medium">Status:</td><td>{item?.status}</td></tr>
                                                {item.tracking_id && (
                                                    <tr><td className="py-2 font-medium">Tracking ID:</td><td>{item?.tracking_id}</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </div>


                        </div>

                        <div>
                            <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-3">

                                <div className="mb-8 flex flex-wrap flex-col gap-3">
                                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Consumer Details</h2>
                                    <p className="text-gray-700">{`${user?.first_name} ${user?.middle_name || ''} ${user?.last_name}`}</p>
                                    <p className="text-gray-700">{user?.mobile_number}</p>
                                    <p className="text-gray-700">{user?.email}</p>
                                </div>
                            </div>
                            <div className="bg-blue-900 p-6 rounded-lg shadow-sm">

                                <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>

                                <table className="w-full text-white">
                                    <tbody>
                                        {order?.order_item?.map((item: any) => (
                                            <tr key={item?.uuid} className="border-b last:border-none">
                                                <td className="py-2">{item?.product.title} (x{item?.quantity})</td>
                                                <td className="text-right">₹{(item?.price * item?.quantity).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        <tr className="border-b last:border-none">
                                            <td className="py-2">Shipping:</td>
                                            <td className="text-right">₹1,000</td>
                                        </tr>
                                        <tr className="border-b last:border-none">
                                            <td className="py-2">Coupon:</td>
                                            <td className="text-right text-red-400">-₹2,000</td>
                                        </tr>
                                        <tr className="font-bold text-white-800">
                                            <td className="py-2">Grand Total:</td>
                                            <td className="text-right">₹{calculateTotal().toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6">
                                <p className="text-gray-700 mb-3"><strong>Order Status:</strong> {order?.status}</p>
                                <p className="text-gray-700"><strong>Order Date:</strong> {new Date(order?.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-between items-center">
                        <Button
                            type="button"
                            size="lg"
                            variant="outline"
                            color="secondary"
                            className="cursor-pointer"
                            onClick={handleBack}
                            disabled={isPending}
                        >
                            Back
                        </Button>

                        <div>
                            <Button
                                type="button"
                                size="lg"
                                variant="outline"
                                color="destructive"
                                className="cursor-pointer mr-3"
                                disabled={isPending}
                            >
                                Cancel Order
                            </Button>
                            <Button
                                type="button"
                                size="lg"
                                variant="outline"
                                color="success"
                                className="cursor-pointer"
                                disabled={isPending}
                            >
                                Process Order
                            </Button>

                        </div>
                    </div>
                </div> :
                <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-15 w-15 animate-spin text-center" />
                </div>
            }
        </>
    );
};

export default OrderDetails;