import { Link } from "react-router-dom";
import { Container } from "../index";
import { Logo } from "../index";

export const Footer = () => {
    return (
        <footer className="h-[100px] border-t border-black bg-gray-500" >
            <Container>
                <div className="flex h-full">
                    <div className="w-1/3 ">
                        <Logo width="w-15"> 
                        </Logo>
                    </div>
                    <div className="flex flex-wrap  w-2/3 " >
                        <div className="w-full h-1/2 flex justify-evenly ">
                            <div className=" text-black-500 text-xs flex items-center ">COMPANY</div>
                            <div className=" text-black-500 text-xs flex items-center">SUPPORT</div>
                            <div className=" text-black-500 text-xs flex items-center">LEGALS</div>
                        </div>
                        <div className="w-full h-1/4 flex justify-evenly ">
                            <div className="text-black-500 text-xs flex items-center pl-15">Features</div>
                            <div className="text-black-500 text-xs flex items-center pl-18">Account</div>
                            <div className="text-black-500 text-xs flex items-center ml-10">Terms & Conditions</div>
                        </div>
                        <div className="w-full h-1/4 flex justify-evenly ">
                            <div className="text-black-500 text-xs flex items-center ml-15">Pricing</div>
                            <div className="text-black-500 text-xs flex items-center pl-15">Help</div>
                            <div className="text-black-500 text-xs flex items-center ml-15">Privacy Policy</div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>

    )
}

