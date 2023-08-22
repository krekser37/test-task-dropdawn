import React from 'react';
import { Edit, Trash2, Share2 } from 'react-feather';
import styles from "./meny-item.module.css";
import { menyItem } from './constants';

type TMenyItem = {
  hidden: boolean;
}

const MenyItem = ({ hidden }: TMenyItem) => {

  const typeIcon = (type: string) => {
    switch (type) {
      case 'share':
        return <Share2 size={20} />;
      case 'edit':
        return <Edit size={20} />;
      case 'trash':
        return <Trash2 size={20} />;
    }
  }
  return (
    <>
      {hidden && <section className={styles.list}>
        <ul >
          {menyItem.map((item) => {
            return <li key={item.id} className={styles.item} >{item.title}{typeIcon(item.type)}</li>
          })}
        </ul>
      </section>}
    </>
  )
}

export default MenyItem;
