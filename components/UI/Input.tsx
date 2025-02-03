const Input: React.FC<{
  label: string;
  className: string;
  placeHolder: string;
}> = (props) => {
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor="">{props.label}</label>
        <input
          type="text"
          placeholder={props.placeHolder}
          className={`placeholder:items-center font-raleway text-[0.9rem] border rounded-sm py-1 border-dark-50 focus:outline-none  ${props.className}`}
        />
      </div>
    </>
  );
};

export default Input;
