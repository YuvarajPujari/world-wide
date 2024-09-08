import styles from "./Button.module.css";
function Button({ children, type, OnClick }) {
  return (
    <button onClick={OnClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export default Button;
