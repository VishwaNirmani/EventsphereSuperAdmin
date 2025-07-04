import CountUp from "react-countup";
import { motion } from "framer-motion";

const OverviewStat = ({id, title, value }) => {
  
  return (
    <div>
        <motion.div key={id} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 200 }}>
        <div className='rounded-xl shadow-md border border-gray-200 p-5 bg-white flex flex-col justify-between h-full hover:cursor-pointer  '>
          
      <h4 className="text-lg text-gray-500">{title}</h4>
      <p className="text-3xl font-bold text-custom-purple">{value}</p>   
        </div>
      </motion.div>
      

    </div>
  )
}
export default OverviewStat;