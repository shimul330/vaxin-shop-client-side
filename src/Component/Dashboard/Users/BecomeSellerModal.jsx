import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';



const BecomeSellerModal = ({ isOpen, setIsOpen, userEmail }) => {

    const [agreed, setAgreed] = useState(false);
    const axiosSecure = useAxiosSecure();

    const sendSellerRequestMutation = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.patch(`/users/seller-request/${userEmail}`)
            return res.data

        },
        onSuccess: (data) => {
            console.log(data)
            toast.success("Seller request sent successfully!");
            close();
        },
        onError: (error) => {
            toast.error("Something went wrong. Try again.");
        }
    });

    function close() {
        setIsOpen(false)
    }

    const handleSendRequest = () => {
        if (!agreed) {
            toast.warn("You must agree to the Terms & Conditions.");
            return;
        }
        sendSellerRequestMutation.mutate();
    }

    return (
        <>


            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/50 p-6 shadow-2xl backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 text-center font-medium text-black">
                                Send Request Seller
                            </DialogTitle>

                            <div className="mb-10 flex items-center gap-2 mt-3 ">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="checkbox checkbox-success mt-1"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-800">
                                    I agree to the <span className="underline text-blue-600 cursor-pointer">Terms and Conditions</span>.
                                </label>
                            </div>

                            <div className='flex items-center justify-between'>
                                <button
                                    className='btn btn-success'
                                    onClick={handleSendRequest}
                                >
                                    {sendSellerRequestMutation.isLoading ? 'Sending...' : 'Send'}
                                </button>
                                <button onClick={close} className='btn btn-error'>Cancel</button>
                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default BecomeSellerModal