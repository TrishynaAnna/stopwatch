import styles from '../stopwatch/stopwatch.module.css'

const Stopwatch = (props) => {
    const {hours, minutes, seconds} = props;
    let h = format(hours);
    let m = format(minutes);
    let s = format(seconds);
    return (<h3 className={styles.timeDisplay}>{h} : {m} : {s}</h3>)
};

function format(num) {
    return num <= 9 ? "0" + num : num;
}

export default Stopwatch;
