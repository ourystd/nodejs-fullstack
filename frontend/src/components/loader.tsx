type TLoaderProps = {
  color?: string;
};

const Loader = ({ color = "text-indigo-500" }: TLoaderProps) => {
  return (
    <div className={`flex ${color}`}>
      <div className="h-2.5 w-2.5 bg-current rounded-full mr-1 animate-bounce"></div>
      <div className="h-2.5 w-2.5 bg-current rounded-full mr-1 animate-bounce200"></div>
      <div className="h-2.5 w-2.5 bg-current rounded-full animate-bounce400"></div>
    </div>
  );
};

export default Loader;
