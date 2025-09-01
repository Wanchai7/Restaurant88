import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Restaurants from "../components/Restaurants";
import Swal from "sweetalert2";
import RestaurantService from "../services/retaurant.service";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

  useEffect(() => {
    const getAllRestaurant = async () => {
      try {
        const response = await RestaurantService.getAllRestaurants();
        if (response.status === 200) {
          setRestaurants(response.data);
          setFilteredRestaurant(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    getAllRestaurant();
  }, []);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      setFilteredRestaurant(restaurants);
      return;
    }
    const result = restaurants.filter((restaurant) => {
      return (
        restaurant.name
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase()) ||
        restaurant.type
          .toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase())
      );
    });
    setFilteredRestaurant(result);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 py-12 shadow-sm">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-amber-700 drop-shadow-md">
              GrabRestaurant88
            </h1>
            <p className="py-5 text-gray-700 text-lg">
              อาหารและเครื่องดื่มสุดพิเศษ รสชาติที่คุณต้องลอง!
            </p>
            <button className="btn btn-primary rounded-full bg-amber-600 border-none hover:bg-amber-700 shadow-md">
              ดูเมนูทั้งหมด 🍽️
            </button>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex justify-center mt-8">
        <label className="input input-bordered input-lg flex items-center gap-3 w-full max-w-md shadow-md">
          <svg
            className="h-5 w-5 opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2"></circle>
            <path d="M21 21l-4.3-4.3" strokeWidth="2"></path>
          </svg>
          <input
            type="search"
            required
            placeholder="ค้นหาร้านอาหารหรือประเภท..."
            name="keyword"
            className="grow"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>
      </div>

      {/* Restaurants Result */}
      <div className="px-4 md:px-12 mt-8 mb-16">
        <Restaurants restaurants={filteredRestaurant} />
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-6 bg-amber-700 text-white shadow-lg mt-12">
        <p>© 2025 GrabRestaurant88 | อร่อยทุกคำที่คุณสั่ง</p>
      </footer>
    </div>
  );
};

export default Home;
