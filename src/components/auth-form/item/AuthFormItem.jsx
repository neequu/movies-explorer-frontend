function AuthFormItem({ onChange, errorMsg, value, label, ...inputProps }) {
  const handleChange = (e) => onChange(e);

  return (
    <div className='auth-form__item'>
      <label className='auth-form__label'>{label}</label>
      <input
        className='auth-form__input'
        {...inputProps}
        onChange={handleChange}
        value={value}
      />
      <span className='auth-form__error'>{errorMsg}</span>
    </div>
  );
}

export default AuthFormItem;
