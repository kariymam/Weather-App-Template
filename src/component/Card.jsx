import "./Card.css";

export default function Card({ children, background }) {
  const [backgroundColor, textColor] = background;
  return (
    <div
      className={
        "card-border card-shadow h-full w-80 rounded-xl overflow-hidden " +
        backgroundColor +
        " " +
        textColor
      }
    >
      {children}
    </div>
  );
}
