import Image from 'next/image'; 

interface ReceiverCardProps {
    img: string;
}

const ReceiverCard = (props: ReceiverCardProps) => {
    return (
        <Image className="border-8 shadow-md w-20 h-20 rounded-2xl border-white" src={props.img} width={80} height={80} alt='profile'/>
    )
};

export default ReceiverCard;