// components/UserDataList.tsx
import React from 'react';
import { List, ListItem, ListItemText, Button, Box } from '@mui/material';

export const UserDataList = ({ userData, onEdit }: { userData: { key: string, data: string }[], onEdit: () => void }) => {
  return (
    <Box>
      <List>
        {userData.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.key} secondary={item.data} />
          </ListItem>
        ))}
      </List>
      <Button onClick={onEdit} variant="contained">{'Edit'}</Button>
    </Box>
  );
};
