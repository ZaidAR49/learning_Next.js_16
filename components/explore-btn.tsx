"use client";
import { FaArrowRight } from "react-icons/fa";
const ExploreBtn = () => {
    return (
        <button type="button" id="explorbtn" className="border-dark-200 bg-dark-100  w-fit cursor-pointer  rounded-full border px-8 py-3.5 max-sm:w-full text-center flex">
            <a href="#events">Explore Events</a>
            <FaArrowRight className="mt-1 ml-2" />
        </button>
    )
}

export default ExploreBtn;