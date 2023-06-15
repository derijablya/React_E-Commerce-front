import React from 'react';
import TelegramLoginButton from 'react-telegram-login';

const MyComponent = () => {
    const handleTelegramResponse = (response) => {
        console.log(response);
        // Handle the response from Telegram login
    };

    return (
        <div>
            <TelegramLoginButton
                dataOnauth={handleTelegramResponse}
                botName="ecommerce_testbot"
                buttonSize="large"
                dataAuthUrl="http://localhost:8080/tg_auth"
            />
        </div>
    );
};

export default MyComponent;