const Input = ({ label, ...props }) => (
  <label className='field'>
    {label && <span className='field__label'>{label}</span>}
    <input {...props} />
  </label>
);

export default Input;

