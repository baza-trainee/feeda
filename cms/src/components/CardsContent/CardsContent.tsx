'use client';

import { Card } from './Card/Card';
import { List, ListItem } from './CardsCondent.styles';

export function CardsContent() {
  const data = [];
  while (data.length < 10) {
    data.push(
      <ListItem key={data.length + 1}>
        <Card />
      </ListItem>
    );
  }
  return <List>{data}</List>;
}
