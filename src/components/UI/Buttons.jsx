//props conterrà tutte le altre proprietà che verranno passate sul bottone ad esempio onCLick, type, ecc...
export default function Buttons({ children, textOnly, className, ...props }) {
  const cssClasses = textOnly ?`text-button ${className}` : `button ${className}`;
  return <button className={cssClasses} {...props}>{children}</button>;
}
