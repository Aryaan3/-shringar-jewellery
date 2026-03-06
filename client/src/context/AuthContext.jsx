import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { USERS_URL } from '../constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(
        localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null
    );

    const login = async (email, password) => {
        const { data } = await axios.post(`${USERS_URL}/login`, { email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post(USERS_URL, { name, email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = async () => {
        await axios.post(`${USERS_URL}/logout`);
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    return (
        <AuthContext.Provider value={{ userInfo, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
