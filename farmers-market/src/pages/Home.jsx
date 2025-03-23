import GoogleMap from "../components/GoogleMap";

const Home = () => {
  return (
    <div>
      <div className="w-full h-[300px] relative">
        <img
          src="vegetable_banner.jpg"
          alt="Beautiful landscape"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-center mt-8">
        <h1 className="text-xl font-bold mx-auto">
          Sulphur Springs Farmers Market
        </h1>
        <p className="text-white">Find fresh produce, local goods, and much more!</p>
        <GoogleMap />
      </div>
      
    </div>
  );
};

export default Home;
