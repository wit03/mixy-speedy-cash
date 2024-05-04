import Image from 'next/image'; 

const ReceiverCard = () => {
    return (
        <Image className="border-8 shadow-md w-20 h-20 rounded-2xl border-white" src="/contact/mix.png" width={80} height={80} alt='profile'/>
    )
};

export default ReceiverCard;