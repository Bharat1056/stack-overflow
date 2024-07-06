
const ErrorPage =  ({ status = "", errorMessage = "", errorDetails = "" }: { status: string, errorMessage: string, errorDetails: string }) => {


  return (
    <div className="h-screen flex justify-center items-center">
      <div className="py-10">
        <div className="text-center">
          <p className="text-base font-semibold text-black dark:text-white">{status}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl dark:text-white ">
            {errorMessage}
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-white">
            {errorDetails}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
