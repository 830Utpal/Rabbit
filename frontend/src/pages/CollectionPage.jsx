import React, { useEffect, useRef, useState } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=11" }]
                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=12" }]
                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=13" }]
                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=14" }]
                },
                {
                    _id: 5,
                    name: "Product 5",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=7" }]
                },
                {
                    _id: 6,
                    name: "Product 6",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=8" }]
                },
                {
                    _id: 7,
                    name: "Product 7",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=9" }]
                },
                {
                    _id: 8,
                    name: "Product 8",
                    price: 100,
                    images: [{ url: "https://picsum.photos/500/500?random=10" }]
                }
            ];
            setProducts(fetchedProducts);
        }, 1000);
    }, []);

    return (
        <div className='flex flex-col lg:flex-row'>
            {/**mobile filter button */}
            <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className="mr-2" />Filters
            </button>
            {/**filter sidebar */}
            <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <FilterSidebar />
            </div>
        </div>
    );
};

export default CollectionPage;
