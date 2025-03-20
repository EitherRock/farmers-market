const GoogleMap = () => {
    return (
      <div className="w-full flex justify-center my-8">
        <iframe 
          title="Sulphur Springs Farmers Market Location"
          className="w-full max-w-2xl h-[500px] border-0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3207.9774924210224!2d-94.45827940000001!3d36.48225970000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c9ab61c5b6a1e7%3A0xa1e7a108b3ae0f67!2sSulphur%20Springs%20City%20Park!5e0!3m2!1sen!2sus!4v1742488199250!5m2!1sen!2sus"
          style={{ border: "0" }} 
          allowFullScreen 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  };
  
  export default GoogleMap;
  