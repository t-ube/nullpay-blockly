// components/EditableXamanUserData.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { IXamanUserData } from '@/interfaces/IXamanUserData';

export const EditableXamanUserData = ({ userData, setUserData, errors }: { userData: IXamanUserData[], setUserData: (data: IXamanUserData[]) => void, errors: { [key: string]: string } }) => {
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});

  const handleAdd = () => {
    setUserData([...userData, { id: uuidv4(), name: '', value: '', new: true, edit: true, delete: false }]);
  };

  const handleDelete = (id: string) => {
    const newData = userData.map(item => item.id === id ? { ...item, delete: true } : item);
    setUserData(newData);
  };

  const handleChange = (id: string, field: 'name' | 'value', inputValue: string) => {
    const newData = userData.map(item => item.id === id ? { ...item, [field]: inputValue, edit:true } : item);
    if (field === 'name') {
      const key = inputValue;
      const newErrors = { ...localErrors };
      if (!/^[a-z0-9]{3,}$/.test(key)) {
        newErrors[id] = 'Invalid name, only a-z0-9 (min three chars) allowed';
      } else {
        delete newErrors[id];
      }
      setLocalErrors(newErrors);
    }

    setUserData(newData);
  };
  
  return (
    <Box>
      {userData.filter(item => !item.delete).map((item, index) => (
        <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
            <TextField
              value={item.name}
              onChange={(e) => handleChange(item.id, 'name', e.target.value)}
              placeholder="Variable name"
              InputProps={{ readOnly: !item.new }}
              sx={{ marginRight: 1 }}
              variant="outlined"
              size="small"
              fullWidth
              error={!!localErrors[item.id] || !!errors[item.id]}
              autoComplete="off"
            />
            <TextField
              value={item.value}
              onChange={(e) => handleChange(item.id, 'value', e.target.value)}
              placeholder="Value"
              sx={{ marginRight: 1 }}
              variant="outlined"
              size="small"
              fullWidth
              autoComplete="off"
            />
            <Button onClick={() => handleDelete(item.id)} variant="outlined" color="error">x</Button>
          </Box>
          {(localErrors[item.id] || errors[item.id]) && (
            <Typography color="error" variant="body2" sx={{ alignSelf: 'flex-start', marginLeft: 1, height: '20px' }}>
              {errors[item.id] ? errors[item.id] : localErrors[item.id]}
            </Typography>
          )}
        </Box>
      ))}
      <Button
        onClick={handleAdd}
        variant="outlined"
        sx={{
          marginRight: 1,
          color: '#2240F6',
          borderColor: '#2240F6',
          '&:hover': {
            borderColor: '#1e3ae6',
          },
        }}
      >
        {'+ Add variable'}
      </Button>
    </Box>
  );
};
