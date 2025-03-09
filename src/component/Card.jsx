import "./Card.css";

export default function Card({ children, background }) {
  const [backgroundColor, textColor] = background;
  return (
    <div
      className={
        `card-border card-shadow rounded-xl overflow-hidden min-w-3xs ${backgroundColor} ${textColor}`}>
      {children}
    </div>
  );
}
