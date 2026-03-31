import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  children,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`}
      style={{
        '--star-color': color,
        '--speed': speed,
        ...rest.style
      }}
      {...rest}
    >
      <div className="star-border-glow" />
      <div className="inner-content">{children}</div>
    </Component>
  );
};

export default StarBorder;
