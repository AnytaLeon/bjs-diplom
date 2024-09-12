'use strict';
// Выход из личного кабинета
const logoutButton = new LogoutButton();

function logOutAction() {
    ApiConnector.logout(response => {
        if(response.success) {
            document.location.reload();
        }
})
};

logoutButton.action = logOutAction;

//Получение информации о пользователе
ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data) 
    }
});

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data)
        }
    })
};

getRates();

setInterval(getRates, 1000 * 60);

//Операции с деньгами
//пополнение баланса
const moneyManager = new MoneyManager();

function addMoney(data) {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response, 'Пополнение выполнено!') 
        } else {
            moneyManager.setMessage(response, response.error) 
        }

    })
};
moneyManager.addMoneyCallback = addMoney;

//конвертирование валюты
function convertMoney(data) {
    ApiConnector.convertMoney(data,response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response, 'Конвертирование выполнено!') 
        } else {
            moneyManager.setMessage(response, response.error) 
        }
    })
};

moneyManager.conversionMoneyCallback = convertMoney;

//перевод валюты
function transferMoney(data){
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен!') 
        }  else {
            moneyManager.setMessage(false, response.error) 
        }
    })
};

moneyManager.sendMoneyCallback = transferMoney;

//Работа с избранным
const favoritesWidget = new FavoritesWidget();

//Заполняем начальный список избранного
function getFavorites() {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
};

getFavorites();

//добавление пользователя в список избранных
function addUserToFavorites(data) {
    ApiConnector.addUserToFavorites(data,(response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен в список избранных!');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
};

favoritesWidget.addUserCallback = addUserToFavorites;

//удаление пользователя из списка избранных
function removeUserFromFavorites(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удален из списка избранных!');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
};

favoritesWidget.removeUserCallback = removeUserFromFavorites;


