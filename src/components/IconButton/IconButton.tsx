export interface IconButtonProps {
  iconName: string;
  styleClasses: string;
  onClick?: () => any;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  styleClasses,
  onClick,
}) => {
  return (
    <button className={`button ${styleClasses}`} onClick={onClick}>
      <span className="icon">
        <i className={`${iconName}`} />
      </span>
    </button>
  );
};

export default IconButton;
