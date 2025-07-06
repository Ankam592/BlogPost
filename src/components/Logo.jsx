import image from '../assets/logo.jpg'
export const Logo= ({ width = "w-16" })=>
{

   return (
    
      <img src={image} alt="" className={width} />
    
   )
}


