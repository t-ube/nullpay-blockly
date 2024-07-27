// components/XamanVariablesModal.tsx
import React, { useState, useEffect } from 'react';
import { Divider, Modal, Button, Box, Typography, Backdrop, Fade, CircularProgress } from '@mui/material';
import { UserDataList } from '@/components/UserDataList';
import { EditableXamanUserData } from '@/components/EditableXamanUserData';
import xamanPkce from '@/utils/XamanPkce';
import { removeDoubleQuotes } from '@/utils/TextFormatter';
import { IXamanUserData } from '@/interfaces/IXamanUserData';
import { v4 as uuidv4 } from 'uuid';
import { useMobile } from '@/contexts/MobileContext';

export const XamanVariablesModal = ({ visible, onClose }: { visible: boolean, onClose: () => void }) => {
  const [userData, setUserData] = useState<IXamanUserData[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const { isMobile, isPortrait, isLoaded } = useMobile();

  useEffect(() => {
    if (visible) {
      const fetchData = async () => {
        setLoading(true);
        try {
          const state = await xamanPkce.state();
          if (state?.me) {
            const { sdk } = state;
            const names = await sdk.jwtUserdata.list();
            const data = await Promise.all(names.map(async (name: string) => {
              const rawData = await sdk.jwtUserdata.get(name);
              let parsedData = rawData;
              if (typeof rawData === 'string') {
                const parseData = JSON.parse(rawData);
                parsedData = Array.isArray(parseData) && parseData.length > 0 ? parseData[0] : null;
              }
              return { id: uuidv4(), name, value: removeDoubleQuotes(JSON.stringify(parsedData)), new: false, edit: false, delete: false };
            }));
            setUserData(data);
          } else {
            throw new Error('Not logged in');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [visible]);

  const handleSave = async () => {
    const existingKeys = new Set<string>();
    const newErrors: { [key: string]: string } = {};
    userData.forEach(item => {
      if (!item.delete) {
        if (!/^[a-z0-9]{3,}$/.test(item.name)) {
          newErrors[item.id] = 'Invalid name, only a-z0-9 (min three chars) allowed';
        } else if (existingKeys.has(item.name)) {
          newErrors[item.id] = 'Variable name is duplicated';
        } else {
          existingKeys.add(item.name);
        }
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const state = await xamanPkce.state();
        if (state?.me) {
          const { sdk } = state;
          for (const item of userData) {
            if (item.delete) {
              console.log(`delete: ${item.name}`);
              await sdk.jwtUserdata.delete(item.name);
            } else if (item.new || item.edit) {
              console.log(`set: ${item.name}`);
              await sdk.jwtUserdata.set(item.name, [item.value]);
            }
          }
          setUserData([]);
          onClose();
        } else {
          throw new Error('Not logged in');
        }
      } catch (error) {
        console.error('Failed to save user data:', error);
      }
    }
  };

  const handleCancel = () => {
    setUserData([]);
    onClose();
  };

  const handleClose = () => {
    setUserData([]);
    onClose();
  };

  return (
    <Modal
      open={visible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={visible}>
        <Box sx={{ 
          position: 'absolute',
          top: isMobile && isPortrait ? '10%' : '50%',
          left: isMobile && isPortrait ? 'none' : '50%',
          transform: isMobile && isPortrait ? 'none' : 'translate(-50%, -50%)',
          width: 800,
          maxWidth: '100vw',
          height: isMobile && isPortrait ? '70vh' : 'auto',
          maxHeight: isMobile && isPortrait ? '100vh' : '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: isMobile ? 1 : 4,
          pt: isMobile ? 1 : 2,
          pb: 0,
          overflowY: 'auto',
          borderRadius: isMobile && isPortrait ? 0 : 2,
        }}>
          <Typography variant="h6" component="div" paddingBottom={1}>
            {'Xaman settings'}
          </Typography>
          <Typography variant="subtitle1" component="div">
            {'Variables'}
          </Typography>
          <Typography variant="subtitle1" component="div" color="textSecondary" fontSize={14}>
            {'Save values to Xaman user data. The saved values can be retrieved using blocks.'}
          </Typography>
          <Divider />
          {loading ? (
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              minHeight: '60px'
            }}>
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading...</Typography>
            </Box>
          ) : (
            <>
              <Box sx={{p:1, pt:2}}>
                <EditableXamanUserData userData={userData} setUserData={setUserData} errors={errors}/>
              </Box>
              <Box sx={{ 
                marginTop: 2, 
                position: 'sticky', 
                bottom: 0, 
                bgcolor: 'background.paper', 
                padding: 2,
                borderTop: '1px solid #e0e0e0', 
                display: 'flex', 
                justifyContent: 'flex-end'
              }}>
                <Button 
                  onClick={handleCancel}
                  variant="contained"
                  sx={{
                    marginRight: 2,
                    color: 'white',
                    backgroundColor: '#9ca3af',
                    '&:hover': {
                      backgroundColor: '#6b7280',
                    },
                  }}
                >
                  {'Cancel'}
                </Button>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  sx={{
                    backgroundColor: '#2240F6',
                    '&:hover': {
                      backgroundColor: '#1e3ae6',
                    },
                  }}
                >
                  {'Save'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};
