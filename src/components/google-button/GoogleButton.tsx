import { Button } from '@mui/material';
import styles from './GoogleButton.module.scss';

interface Props {
    onClick: () => void
    fullWidth?: boolean
}

const GoogleButton = (props: Props) => {
    const { onClick, fullWidth } = props;
    return (
        <Button className={styles["google-btn"]} onClick={onClick} style={{ width: fullWidth ? '100%' : 'unset' }}>
            <span className={styles["google-icon-wrapper"]}>
                <img className={styles["google-icon"]} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            </span>
            <span className={styles["btn-text"]}><b>Sign in with google</b></span>
        </Button>
    )
}

export default GoogleButton