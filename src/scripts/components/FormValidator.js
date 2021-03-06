export default class FormValidator {
    constructor(settingsValidator, formElement) {
        this._inputSelector = settingsValidator.inputSelector;
        this._submitButtonSelector = settingsValidator.submitButtonSelector;
        this._inactiveButtonClass = settingsValidator.inactiveButtonClass;
        this._inputErrorClass = settingsValidator.inputErrorClass;
        this._errorClass = settingsValidator.errorClass;
        this._formElement = formElement;
    };

    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid);
    };

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    _setEventListeners() {
        this._inputList = this._formElement.querySelectorAll(this._inputSelector);
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    _hideValidationMessage() {
        this._inputList = Array.from(
            this._formElement.querySelectorAll(this._inputSelector)
        );
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    resetWholeForm() {
        this._hideValidationMessage();
        this._toggleButtonState();
        this._formElement.reset();
    };

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };
}