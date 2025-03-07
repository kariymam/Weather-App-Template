import "./Card.css";

export default function Card({ children, background }) {
  const [backgroundColor, textColor] = background;
  return (
    <div
      className={
        "card-border card-shadow h-full rounded-2xl overflow-hidden " +
        backgroundColor +
        " " +
        textColor
      }
    >
      {children}
    </div>
  );
}
