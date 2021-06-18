export interface IconButtonProps {
  iconName: string;
  onClick: () => any;
  extraClasses?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  extraClasses,
  onClick,
}) => {
  return (
    <button
      className={`button is-primary is-light is-small ${
        extraClasses ? extraClasses : ""
      }`}
      onClick={onClick}
    >
      <span className="icon">
        <i className={`fas ${iconName}`} />
      </span>
    </button>
  );
};

export default IconButton;
