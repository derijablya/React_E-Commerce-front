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
                dataAuthUrl="f849-31-155-17-143.ngrok-free.app/product"
            />
        </div>
    );
};

export default MyComponent;