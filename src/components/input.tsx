interface PropsInput {
  name: string;
  label: string;
}

const Footer = ({ name, label }: PropsInput) => {
  return (
    <div className="input-wrapper">
      <label htmlFor={name}>{label}</label>
      <input id={name} type="text" />
    </div>
  );
};

export default Footer;
