import styles from '@/styles/components/cards/EventDescriptionCard.module.scss';

const EventDescriptionCard = ({
  iconComponent: Icon,
  title,
  text,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <Icon className={styles.icon} width={135} height={135} />
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        {text && <p className={styles.text}>{text}</p>}
        {children}
      </div>
    </div>
  );
};

export default EventDescriptionCard;
