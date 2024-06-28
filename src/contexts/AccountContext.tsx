"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import xaman from '@/utils/Xaman';

type xamanApplication = {
  uuidv4: string;
  name: string;
};

type JwtData = {
  pong: boolean;
  client_id: string;
  state: string;
  scope: string;
  aud: string;
  sub: string;
  email: string;
  app_uuidv4: string;
  app_name: string;
  payload_uuidv4: string;
  usertoken_uuidv4: string;
  network_type: string;
  network_endpoint: string;
  network_id: string;
  iat: number;
  exp: number;
  iss: string;
};

export type xamanSignInApiResponse = {
  application: xamanApplication;
  jwtData: JwtData;
};

const AccountContext = createContext<{
  loggedIn: boolean;
  userAccount: string;
  userName: string;
  userPicture: string;
  signIn: ()=> void;
  logout: ()=> void;
}>({
  loggedIn: false,
  userAccount: '',
  userName: '',
  userPicture: '',
  signIn: () => {},
  logout: () => {},
});

export const useAccount = () => useContext(AccountContext);

export const AccountProvider  = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) =>
{
  const [loggedIn, setloggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userPicture, setUserPicture] = useState('');

  const loadInfo = async () => {
    xaman.on("success", async () => {
      const account = await xaman.user.account;
      if (typeof account === "string") {
        setUserAccount(account);
      }
      const name = await xaman.user.name;
      if (typeof name === "string") {
        setUserName(name);
      }
      const picture = await xaman.user.picture;
      if (typeof picture === "string") {
        setUserPicture(picture);
      }
      const rate = await xaman.helpers?.getRates('JPY');
      setloggedIn(true);
    });
  };

  const signIn = async () => {
    try {
      xaman.authorize();
      xaman.on("ready", async () => {
        const pong = await xaman.ping();
        if (xaman.payload !== undefined && pong !== undefined) {
          if ('jwtData' in pong) {
            const response: xamanSignInApiResponse = pong as xamanSignInApiResponse;
            if (typeof xaman.user.account === "string") {
              setUserAccount(xaman.user.account);
            }
            const payload = await xaman.payload.create({
              custom_meta: {
                instruction: "Sign request from " + response.application.name,
              },
              txjson: {
                TransactionType: "SignIn",
              }
            });
          } else {
            console.error('jwtData is missing in the response');
          }
        }
      });
    } catch(err) {
      console.error("err:", err);
    }
  };

  const logout = async () => {
    await xaman.logout();
    setloggedIn(false);
    setUserAccount('');
  };

  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <AccountContext.Provider value={{ loggedIn, userAccount, userName, userPicture, signIn, logout }}>
      {children}
    </AccountContext.Provider>
  );
};
