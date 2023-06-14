import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const LinkComponent = ({title, href, type}) => {
    return (
        <div className={styles[`${type}-list-item`]}>
            <Link className={styles[`${type}-link`]} to={href}>
                {title}
            </Link>
        </div>
    )
}

export default LinkComponent