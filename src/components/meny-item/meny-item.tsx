import React from 'react'
import { Edit, Trash2, Share2 } from 'react-feather';
import styles from "./meny-item.module.css";

const MenyItem = () => {
  return (
    <section className={styles.list}>
      <ul >
        <li className={styles.item} >Поделиться в социальных сетях<Share2 size={20} /></li>
        <li className={styles.item} >Редактировать страницу<Edit size={20} /></li>
        <li className={styles.item} >Удалить страницу<Trash2 size={20} /></li>
      </ul>
    </section>
  )
}

export default MenyItem;
