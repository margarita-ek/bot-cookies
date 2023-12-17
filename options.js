module.exports = {
    signs: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Получить знак Вселенной", callback_data: "/signs"}],
            ]
        })
    }
};