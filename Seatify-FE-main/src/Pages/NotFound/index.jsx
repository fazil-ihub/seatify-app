import yourGif from "./404-page.jpg";


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-gray-100">
      <h1 className="font-bold text-8xl">404</h1>
      <p className="mt-4 text-2xl">
        Whooops! We coulee&apos;t find the page you were looking for.
      </p>
      <div className="mt-8">
        <img src={yourGif} className="w-[700px] h-[300px]" />
      </div>
    </div>
  );
};

export default NotFound;
