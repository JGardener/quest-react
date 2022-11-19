import styles from "../AutoCompleteName/AutoCompleteName.module.css";
export const AutoCompleteName = (props) => (
  <p className={styles.text} onClick={() => props.query()}>
    {props.capitalise(props.name)}
  </p>
);
