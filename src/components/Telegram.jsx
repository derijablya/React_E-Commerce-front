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
                dataAuthUrl="https://f689-31-155-31-33.ngrok-free.app/product"
            />
        </div>
    );
};

export default MyComponent;